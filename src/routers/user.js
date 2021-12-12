const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/account')

const router = new express.Router()
const upload = multer({
     limits : {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload image files'))
        }

        cb(undefined, true)
    }
}) 

router.post('/users', async (req, res)=> {

    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)  
    }
    
})

router.post('/login', async (req, res) => {
    console.log("Login user")
    try {
        const user = await User.findByUserCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.send({user , token})

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    console.log("logout user")
    try {

        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token != req.token
        })

        await req.user.save()

        res.send()

        
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    console.log("logout user")
    try {

        req.user.tokens = []

        await req.user.save()

        res.send()

        
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.get('/users/me', auth , async (req, res)=> {  
        res.status(200).send(req.user)
    
})

router.post('/users/me/avatar', auth, upload.single('avatar') , async (req, res)=> {  
   
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()

     req.user.avatar = buffer


    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400). send({error : error.message})
})


router.delete('/users/me/avatar', auth , async (req, res)=> {  
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400). send({error : error.message})
})

router.get('/users/:id/avatar', async (req, res)=> {  
    try {

        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
    res.status(200).send(req.user)

})
router.patch('/users/me', auth, async (req, res)=> {
  
    const updates = Object.keys(req.body)

    try {


        updates.forEach((update)=> {
             req.user[update] = req.body[update]
        })

        await req.user.save()

       res.status(200).send(req.user)

    } catch (e) {
        console.log(e)
        res.status(500).send(error)    
    }
    
})



router.delete('/users/me', auth, async (req, res)=> {
    const _id = req.params.id;

    try {
        sendCancellationEmail(user.email, user.name)
       await  req.user.remove()
       res.status(200).send(req.user)

    } catch (e) {
        res.status(500).send(e)    
    }
    
})

module.exports = router
