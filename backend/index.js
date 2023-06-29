//Librarys - APIs 
const app = require('express')();
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
//Variables to use (For encryption - payment tokens - keys or general flags) 

//Stripe + Keys
const PUPLISHABLE_KEY = "pk_test_51MAWjfI5vsjFWvGhrr5n2mAujexURegEgW4ujlSPpois9Em7FBzHrEkuv5zkeRjck8CeLBAcI761eVqgWQ3mL6EX00oSp0WeB6";
const SECRET_KEY = "sk_test_51MAWjfI5vsjFWvGhRyaZjvp6Tw9QWcZKwk8eJTfOpJtVh2ZKchCd4XmKDTEBb6gYxtkY4ysBFtAHrf1dKWGgmmHX00rFKINwdL";
const stripe = require('stripe')(SECRET_KEY, { apiVersion: "2022-11-15" });

//App use for json formats
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connection to Database
const database = createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"elibrary"
});

//Main Select - Get all books
app.get("/books",(request,response) => {
  database.query(`Select * from books`,(req,res) => {
   response.send(JSON.stringify(res));
  });
 
})

//Get user Bought Book Collection
app.post("/getUserBooks",(req,res) => {
  resultOfData = req.body.userID;
  console.log(resultOfData)
  database.query(`Select * from books JOIN bookuser where userID = '${resultOfData}' AND bookID = books.id  `,(reqQuery,resQuery) => {
   res.send(resQuery);
  });
 
})

//Get user Rent Book Collection
app.post("/getUserRentBooks",(req,res) => {
  resultOfData = req.body.userID;
  console.log(resultOfData)
  database.query(`Select * from books JOIN bookrent where userID = '${resultOfData}' AND bookID = books.id  `,(reqQuery,resQuery) => {
   res.send(resQuery);
  });
 
})

//For Sign Up Data - Register
app.post("/emailSender",async (req,res) => {

  console.log(req.body.emailAXIOS)
  var randomGenerator = Math.floor(Math.random()* 100000);
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user:"ellie.turner47@ethereal.email", // generated ethereal user
      pass:"f8xMX7N9brT8ftfb17", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"darren 👻" ellie.turner47@ethereal.email', // sender address
    to: req.body.emailAXIOS, // list of receivers
    subject: "Email Verification ✔", // Subject line
    text: "Press the number in modal " + randomGenerator, // plain text body
  });
  
  res.send(""+randomGenerator);
 
})

//For Sign Up Data - Register
app.post("/signUpData",async (req,res) => {

    resultOfData = req.body;
    console.log(resultOfData);
    password_hash = bcrypt.hashSync(resultOfData.passwordAXIOS, 10);
    console.log(password_hash)   
    try{
      database.query(`INSERT INTO register (username, password, repeatPassword, email, Verified ) VALUES ('${resultOfData.usernameAXIOS}','${password_hash}','${password_hash}','${resultOfData.emailAXIOS}',true)`,(req,res) => {
        console.log(req);
    });
  }catch(error){
    console.log("Something went wrong in Register")
  }

})

//For Profile Image storing
app.post("/saveProfileImage",(req,res) => {
  resultOfData = req.body;
  console.log(resultOfData);

    database.query(`UPDATE register SET Image = '${resultOfData.userImage}' where username='${resultOfData.userID}' `,(req,res) => {
      console.log(req)
      if(res !=0 ){
        console.log("True");
      }
    });
    
})

//Get profile Image Stored
app.post("/savedProfileImage",(req,res) => {
  resultOfData = req.body;
  console.log(resultOfData);

    database.query(`SELECT Image from register where username = '${resultOfData.username}' `,(reqQuery,resQuery) => {
      console.log(req)
      if(resQuery !=0 ){
        console.log(resQuery)
        res.send(resQuery)
      }
    });
    
})

//For data login - Check
var dataProfile = {
  responseOfProfile : false,
  dataOfProfile : '',
}


app.post("/checkData", (req,res) => {
  resultOfData = req.body;
  
  database.query(`SELECT password from register where username='${resultOfData.usernameCheckAXIOS}'`,async (reqQuery,resQuery) => {
    try{
      resultOfDataPassword = await bcrypt.compare(resultOfData.passwordCheckAXIOS,resQuery[0].password)
      console.log(resultOfDataPassword)

      if(resultOfDataPassword == true){
       database.query(`SELECT id,username,password,email,image from register where username='${resultOfData.usernameCheckAXIOS}' AND password='${resQuery[0].password}'`,(reqQuery,resQuery) => {

          dataProfile = {
            responseOfProfile : true,
            dataOfProfile : resQuery[0],
          }
    
          res.send(dataProfile);
    
          dataProfile = {
            responseOfProfile : false,
            dataOfProfile : '',
          }
         })
        }
        else{
          res.send(dataProfile);
      }
    
    }
    catch(error){
      console.log("Cant find that user,error")
      res.send(dataProfile);
    }
  })

})

//For Buying - Rent Books
app.post("/bookBuy",(req,res) => {

  bookCheckID = req.body.bookCheckID;
  userBoughtItID = req.body.userBoughtItID;

  database.query(`INSERT INTO bookuser (userID, bookID, bookBought) VALUES ('${userBoughtItID}','${bookCheckID}',true)`,(req1,res1) => {});
 
})

//Check if book is bought
app.post("/getBooksBought",(req,res) => {

  console.log(req.body)
  database.query(`SELECT * from bookuser where userID = '${req.body.userID}' AND bookID = '${req.body.bookID} AND bookBought = 1'`,(reqQuery,resQuery) => { 
    res.send(resQuery)
    console.log(resQuery)
   });
})

//Book Rent
app.post("/bookRent",(req,res) => {

  bookCheckID = req.body.bookCheckID;
  userBoughtItID = req.body.userBoughtItID;

  database.query(`INSERT INTO bookrent (userID, bookID, bookRented , TimeStart, TimeEnd) VALUES ('${userBoughtItID}','${bookCheckID}',true, CURRENT_TIMESTAMP() , ADDTIME(CURRENT_TIMESTAMP(), "40"))`,(req1,res1) => {}); 
})

//Check if book is bought
app.post("/getBooksRent",(req,res) => {

  console.log(req.body)
  database.query(`SELECT * from bookrent where userID = '${req.body.userID}' AND bookID = '${req.body.bookID}' AND bookRented = 1 ORDER BY ID DESC LIMIT 1 `,(reqQuery,resQuery) => { 
    res.send(resQuery)
    console.log(resQuery)
   });
})

//Delete that books rent over
app.post("/deleteOffRentBooks",(req,res) => {
  result = req.body;
  console.log(result.userID);
  database.query(`DELETE from bookRent where userID = '${result.userID}' AND TimeEnd < CURRENT_TIMESTAMP()`,(reqDelete,resDelete) => {
    if(resDelete != 0){
      console.log(resDelete)
      res.send(true);
    }
  });
})

//For Comfirming Payments
app.post("/createPayment", async (req, res) => {
  
  const customer = await stripe.customers.create();

  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}
  );

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: PUPLISHABLE_KEY
  });

});

//For Settings Page
app.post("/updateUsername",(req,res) => {
  result = req.body;
  console.log(result);
  database.query(`UPDATE register SET username = '${result.newUsernameAXIOS}' where id =${result.idAXIOS}`,(reqUsernameChange,resUsernameChange) => {
    if(resUsernameChange != 0){
      console.log("Changed username")
      res.send(true);
    }else{
      console.log("Nothing Changed in username")
    }
  });
})

app.post("/updateEmail",(req,res) => {
  result = req.body;
  console.log(result);
  database.query(`UPDATE register SET email = '${result.newEmailAXIOS}' where id =${result.idAXIOS}`,(reqEmailChange,resEmailChange) => {
    if(resEmailChange != 0){
      console.log("Changed email")
      res.send(true);
    }else{
      console.log("Nothing Changed in email")
    }
  });
})

app.post("/updatePassword",(req,res) => {
  result = req.body;
  console.log(result);
  
  database.query(`UPDATE register SET password = '${bcrypt.hashSync(result.newPasswordAXIOS,10)}' where id =${result.idAXIOS}`,(reqPasswordChange,resPasswordChange) => {
    if(resPasswordChange != 0){
      console.log("Changed password")
    }else{
      console.log("Nothing Changed in password")
    }
  });

  database.query(`UPDATE register SET repeatPassword = '${bcrypt.hashSync(result.newRepeatPasswordAXIOS,10)}' where id =${result.idAXIOS}`,(reqPasswordChange,resPasswordChange) => {
    if(resPasswordChange != 0){
      console.log("Changed Repeat password")
      res.send(true);
    }else{
      console.log("Nothing Changed in Repeat password")
    }
  });


})

app.post("/updateDelete",(req,res) => {
  result = req.body;
  console.log(result);
  database.query(`DELETE from register where id =${result.idAXIOS}`,(reqDelete,resDelete) => {
    if(resDelete != 0){
      console.log("Changed email")
      res.send(true);
    }else{
      console.log("Nothing Changed in email")
    }
  });
})

//Main App URL
app.get("/",(req,res) => {
  res.set('Content-Type', 'text/plain');
  res.send("Home Page");
})

//App Port listen
var listener = app.listen(8888,()=>{
  console.log(listener.address().port);
});


