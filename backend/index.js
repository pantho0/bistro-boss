const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("bistroDB").collection("users")
    const menuCollection = client.db("bistroDB").collection("menu")
    const reviewCollection = client.db("bistroDB").collection("reviews")
    const cartCollection = client.db("bistroDB").collection("carts")




    //json web token
    app.post('/jwt', async(req,res)=>{
      const user = req.body;
      const token =jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '1h'})
      res.send({token})
    })

    //middleware of json
    const verifyToken = (req, res, next) =>{
      if(!req.headers.authorization){
        return res.status(401).send({message: 'Forbidden Access'})
      }
      const token = req.headers.authorization.split(' ')[1];
      
      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded)=>{
        if(err){
          return res.status(401).send({message: 'Forbidden Access'})
        }
        req.decoded = decoded;
        next()
      })
    }
    //middleware for admin verification 
    const verifyAdmin = async(req,res,next)=>{
      const email = req.decoded.email;
      const query = {email : email};
      const user = await userCollection.findOne(query)
      const isAdmin = user?.role === 'admin'
      if(!isAdmin){
        res.status(403).send({message:'Unauthorized Access'})
      }
      next();
    }

    //to load all menu items
    app.get("/menu", async(req,res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    })
    // to load all reviews
    app.get('/reviews', async(req,res)=>{
      const result = await reviewCollection.find().toArray()
      res.send(result)
    })
    //to get individual users cart length
    app.get('/carts', async(req,res)=>{
      const email = req.query.email;
      const query = {email:email}
      const result = await cartCollection.find(query).toArray()
      res.send(result)
    })
    //to save cart item in DB 
    app.post('/carts', async(req,res)=>{
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem)
      res.send(result)
    })
  // to delete cart item 
  app.delete('/carts/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await cartCollection.deleteOne(query)
    res.send(result)
  })

  //to save user data in the db
  app.post('/users', async(req,res)=>{
    const user = req.body;
    const email = user?.email;
    const query = {email: email};
    const isExistUser = await userCollection.findOne(query);
    if(isExistUser){
      return res.send('User Already Exist')
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
  })
  //to verify user role for admin detection 
  app.get('/users/admin/:email', verifyToken, async(req,res)=>{
    const email = req.params.email;
    if(email !== req.decoded.email){
      return res.status(403).send({message:'unauthorized access'})
    }
    const query = {email: email}
    const user = await userCollection.findOne(query)
    let admin = false;
    if(user){
      admin = user?.role === 'admin'
    }
    res.send({admin})
  })

  // to load all users from db to client
  app.get('/users', verifyToken, verifyAdmin, async(req,res)=>{
    const result = await userCollection.find().toArray();
    res.send(result)
  })
  //for delete a user 
  app.delete('/users/:id', verifyToken, verifyAdmin, async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await userCollection.deleteOne(query);
    res.send(result)
  })
  //for update a user
  app.patch('/users/admin/:id', verifyToken, verifyAdmin, async(req,res)=>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const updateDoc = {
      $set:{
        role : 'admin'
      }
    }
    const result = await userCollection.updateOne(filter, updateDoc)
    res.send(result)
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req,res)=>{
    res.send("Bistro Boss Restaurant Server is in operation")
})

app.listen(port, ()=>{
    console.log(`Bistro Boss is Running on ${port}`);
})