
const {MongoClient, ObjectID} = require('mongodb')

const connecttionURL = process.env.MONGO_URL
const databaseName = 'task-manager'

MongoClient.connect(connecttionURL, {useNewUrlParser:true}, (error, client)=> {
    if (error) {
       return  console.log("Error" + error)
    }

    const db = client.db(databaseName)

    // db.collection('Users').insertOne({
    //     name : 'Suresh',
    //     age : 47
    // })

    // db.collection('Users').insertMany([{
    //     name : 'Valli',
    //     age : 45
    // },
    // {
    //     name : 'Priyanka',
    //     age : 15
    // }], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert the resocrds")
    //     }

    //     console.log(result.ops)

    // }
    // )
    
    // db.collection('tasks').insertMany([{
    //     description : 'Task 1',
    //     completed : true
    // },
    // {
    //     description : 'Task 2',
    //     completed : false
    // },
    // {
    //     description : 'Task 3',
    //     completed : true
    // }

    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert the resocrds")
    //     }

    //     console.log(result.ops)
        
    // }
    // )

    // db.collection('Users').findOne({name : 'Suresh'}, (error, user) => {

    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(user)

    // })

    // db.collection('Users').find({age : 15}).toArray((error, users) => {

    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(users)

    // })

    // db.collection('tasks').find({completed : true}).toArray((error, tasks) => {

    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(tasks)

    // })

//    const updatePromise =  db.collection('Users').updateOne({_id: new ObjectID("61a10f6934254794c9683b76") }, {
//         $set : {
//             name : 'Karpagam'
//         }
//     } ).then((result) => {
//         console.log(result)
//     }).catch( (error) => {
//         console.log(error)
//     })

// db.collection('tasks').updateMany({}, {
//     $set : {
//         completed : true
//     }
// } ).then((result) => {
//     console.log(result)
// }).catch( (error) => {
//     console.log(error)
// })

db.collection('tasks').deleteOne({
    description : 'Task 1'
} ).then((result) => {
    console.log(result)
}).catch( (error) => {
    console.log(error)
})

})


