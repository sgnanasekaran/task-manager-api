const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { setRandomFallback } = require('bcryptjs')


const app = express()
const port = process.env.PORT

// app.use((req, res, next)=>{
//     res.status(503).send("The site is under maintenance")
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=> {
    console.log('App is running on port '+ port)

})

