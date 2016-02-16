var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'orGO' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    console.log("here");

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userBday = req.body.userbday;

    // Set our collection
    var collection = db.get('usercollection');

    if (collection.find({ "$username": userName}, {"$email":userEmail}, {"$birthday":userBday}).count() > 1)
    {
        res.redirect("accountexists");
    }
    else if (collection.find({ "$username": userName}).count() > 1) {
        res.render('newuser', { title: 'Username Exists'});
    }
    else{
      // Submit to the DB
      collection.insert({
          "username" : userName,
          "email" : userEmail,
          "birthday" : userBday
      }, function (err, doc) {
          if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
          }
          else {
              // And forward to success page
              if (collection.find({ "$username": userName}).count() > 1){
                res.redirect ("usernameexists");
              }


              res.redirect("userlist");
          }
      });
    }
});



module.exports = router;
