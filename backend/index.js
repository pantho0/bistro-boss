const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


//mail sending function :
const sendMail = (emailAddress, emailData) =>{
  //creating transporter for send email
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
      user : process.env.MAIL,
      pass : process.env.PASS,
    }
  })
    // verifying it is working or not 

    transporter.verify((error, success)=>{
      if(error){
        console.log(error)
      }else{
        console.log('server is ready to take our email', success)
      }
    })
  
  // mail body which will be sent
  const mailBody = {
    from : process.env.MAIL,
    to : emailAddress,
    subject : emailData?.subject,
    html : `<p>${emailData?.message}</p>`

  }

  //calling the nodemailer send mail function
  transporter.sendMail(mailBody, (error,info)=>{
    if(error){
      console.log(error)
    }else{
      console.log("Email Sent : "+info.response)
    }
  })
 
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("bistroDB").collection("users");
    const menuCollection = client.db("bistroDB").collection("menu");
    const reviewCollection = client.db("bistroDB").collection("reviews");
    const cartCollection = client.db("bistroDB").collection("carts");
    const paymentCollection = client.db("bistroDB").collection("payments");

    //json web token
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //middleware of json
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Forbidden Access" });
      }
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    //middleware for admin verification
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        res.status(403).send({ message: "Unauthorized Access" });
      }
      next();
    };

    //menu items related api
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const menu = req.body;
      const result = await menuCollection.insertOne(menu);
      res.send(result);
    });
    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });
    app.patch("/menu/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: item.name,
          recipe: item.recipe,
          category: item.category,
          price: item.price,
          image: item.image,
        },
      };
      const result = await menuCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // to load all reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });
    //to get individual users cart length
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    //to save cart item in DB
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });
    // to delete cart item
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    //to save user data in the db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const email = user?.email;
      const query = { email: email };
      const isExistUser = await userCollection.findOne(query);
      if (isExistUser) {
        return res.send("User Already Exist");
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    //to verify user role for admin detection
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    // to load all users from db to client
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    //for delete a user
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    //for update a user
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // ================
    //payment intent
    //==================

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payment", async (req, res) => {
      const payment = req.body;
      const email = payment.email;
      const paymentResult = await paymentCollection.insertOne(payment);
      //for delete cart items
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      const deleteCartItem = await cartCollection.deleteMany(query);

      // now send confirmation email
      sendMail(email,{
        subject: 'Booking Successful!',
        message: `Your Transaction Id:${payment?.transactionId} `,
      })


      res.send({ paymentResult, deleteCartItem });
    });

    //===========================
    //Admin Stat API
    //===========================
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      const result = await paymentCollection.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue:{
              $sum : '$price'
            },
          },
        },
      ]).toArray();
      const revenue = result.length > 0 ? result[0].totalRevenue.toFixed(2) : 0; 

      res.send({ users, menuItems, orders, revenue });
    });

    //Using Aggregate  Pipeline 
    app.get("/order-stats", async(req,res)=>{
      const result = await paymentCollection.aggregate([
        {
          $unwind : '$menuIds'
        },
        {
          $addFields: {
            menuIdObjectIds: {
              $toObjectId: '$menuIds'
            }
          }
        },
        {
          $lookup : {
            from: 'menu',
            localField : 'menuIdObjectIds',
            foreignField : '_id',
            as : 'menuItem'
          }
        },
        {
          $unwind : '$menuItem'
        },
        {
          $group : {
            _id : '$menuItem.category',
            quantity : {
              $sum : 1
            },
            revenue : {
              $sum : '$menuItem.price'
            }
          }
        },
        {
          $project :{
            _id : 0,
            category : '$_id',
            quantity : '$quantity',
            revenue : '$revenue',
          }
        }
      ]).toArray();
      res.send(result )
    })




    //===========================

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bistro Boss Restaurant Server is in operation");
});

app.listen(port, () => {
  console.log(`Bistro Boss is Running on ${port}`);
});
