const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId
 const cors=require ('cors');
 require('dotenv').config()
// const { json } = require('express');
const app=express();
 app.use(cors());
 app.use(express.json())

const port=process.env.PORT || 5000;
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lreh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{
        await client.connect();
       
        const database=client.db("newCarService");
        const newCarServices=database.collection('newServices')
        // get api
        app.get('/services',async(req,res)=>{
            const cursor=newCarServices.find({});
            const service= await cursor.toArray();
            res.send(service)
        })
        // get single service
        app.get('/services/:id',async(req,res)=>{
            const id=req.params.id;
            console.log(id);
            const query={_id:ObjectId(id)}
            const service=await newCarServices.findOne(query);
            res.send(service)
        })
        // post
        app.post('/services',async(req,res)=>{
            const service=req.body
        console.log("post hit",service);
            const result=await newCarServices.insertOne(service);
            console.log(result);
            res.json(result)
        })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
   
 
    res.send("the name of the express car");
})
app.get('/hello',(req,res)=>{
    console.log("object");
    res.send('hello update here')
})

app.listen(port,()=>{
    console.log("server site ",port);
})