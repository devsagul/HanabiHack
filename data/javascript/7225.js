var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var multer = require("multer");
var session = require("express-session");
var passport = require("./config/passport");
var nodemailer = require("nodemailer");
var paypal = require('paypal-rest-sdk');

//this is strictly for the account route
var db = require('./models');

var env = new paypal.core.SandboxEnvironment('AYXYu8sGMt7q82iA40QLPriE6RLG_29oNVsmu2KV2Ifu3hXlogkUK2SQ65UjvRj0HZE8jkSUC_zKeJQT','EKDWbd8ViGWZEN5Wr6OlkDozbnWx7GIjtzOonjlRO6eiRSHRy2SYT8XCAIFUM1W0ilL4XX2XtBDWevIx');
var client = new paypal.core.PayPalHttpClient(env);

var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Public'), {
        etag: false})
      );

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/Public/signup.html"));
});


app.post("/payment", function(req, res) {
  var payments = paypal.v1.payments;
  var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:8080/success",
          "cancel_url": "http://localhost:8080/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": 25
          },
          "description": "Hat for Brad."
      }]
    };
    var request = new payments.PaymentCreateRequest();
    request.requestBody(create_payment_json);
    //console.log(create_payment_json);
    client.execute(request).then((response) => {
    //     console.log(response.statusCode);
        console.log(response.result);
      for (var i = 0; i < response.result.links.length; i++) {
        if (response.result.links[i].rel === 'approval_url') {
          res.redirect(response.result.links[i].href);
        }
      }
      }).catch((error) => {
        console.error(error.statusCode);
        console.error(error.message);
    });
});

app.use(session({secret: "keyboard cat", resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


//configuration for the storage
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './userMaps')
  },
  filename: function(req, file, callback) {

    callback(null, file.originalname)
  }
});

app.get("/account", (req, res) => {
  //need to define here whether the user made a payment method
  if (db.Users.isAccount) {
    res.render("account.pug"), {
        username: db.Users.name,
    //    count: Need to add a method that gives mapCount
    }
  }
  else {
  //else render the buy page
    res.render("account.pug");
  }
});


//logic & route for the storage in File System --saved to userMaps directory
app.post("/storeFile", function(req, res){
  var upload = multer({
    storage: storage
  }).single('userFile')
  upload(req, res, function(err){
    console.log("Yay!");
  });
  res.send("Your file has been saved.")
});


//Download the file
app.get("/download/:fileName", function(req,res){
  var downloadURL = req.params.fileName
  console.log(downloadURL);
  var file = __dirname + '/userMaps/' + downloadURL;
  console.log(file);
  res.download(file);
  console.log("Finished Downloading");
});


db.sequelize.sync().then(function() {

app.listen(PORT, function() {
  console.log("App running on port 8080!");
});
});
