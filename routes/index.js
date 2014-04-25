var express = require('express');
var router = express.Router();

var restaurantUsers = [];
var restaurantNames = ['Pizza2','iPho','Restaurant 3','Rest 5','qwewe','Food'];
var menuItems = Array();
var menuItemsForCurrentOrder = '';

menuItems[0] = {
        'Item 1':'pizza1',
        'Item 2':'pizza2',
        'Item 3':'pizza3',
        'Item 4':'pizza4',
        'Item 5':'pizza5',
        'Item 6':'pizza6',
        'Item 7':'pizza7',
        'Item 8':'pizza8',
        'Item 9':'pizza9',
        'Item 10':'pizza10',
        'Item 11':'pizza11',
    };

menuItems[1] = {
        'Item 1':'banana1',
        'Item 2':'banana2',
        'Item 3':'banana3',
        'Item 4':'banana4',
        'Item 5':'banana5',
        'Item 6':'banana6',
        'Item 7':'banana7',
        'Item 8':'banana8',
        'Item 9':'banana9',
        'Item 10':'banana10',
        'Item 11':'banana11',
    };

menuItems[2] = {
        'Item 1':'chicken1',
        'Item 2':'chicken2',
        'Item 3':'chicken3',
        'Item 4':'chicken4',
        'Item 5':'chicken5',
        'Item 6':'chicken6',
        'Item 7':'chicken7',
        'Item 8':'chicken8',
        'Item 9':'chicken9',
        'Item 10':'chicken10',
        'Item 11':'chicken11',
    };

menuItems[3] = {
        'Item 1':'garlic1',
        'Item 2':'garlic2',
        'Item 3':'garlic3',
        'Item 4':'garlic4',
        'Item 5':'garlic5',
        'Item 6':'garlic6',
        'Item 7':'garlic7',
        'Item 8':'garlic8',
        'Item 9':'garlic9',
        'Item 10':'garlic10',
        'Item 11':'garlic11',
    };

menuItems[4] = {
        'Item 1':'Beef1',
        'Item 2':'Beef2',
        'Item 3':'Beef3',
        'Item 4':'Beef4',
        'Item 5':'Beef5',
        'Item 6':'Beef6',
        'Item 7':'Beef7',
        'Item 8':'Beef8',
        'Item 9':'Beef9',
        'Item 10':'Beef10',
        'Item 11':'Beef11',
    };

menuItems[5] = {
        'Item 1':'PORK1',
        'Item 2':'PORK2',
        'Item 3':'PORK3',
        'Item 4':'PORK4',
        'Item 5':'PORK5',
        'Item 6':'PORK6',
        'Item 7':'PORK7',
        'Item 8':'PORK8',
        'Item 9':'PORK9',
        'Item 10':'PORK10',
        'Item 11':'PORK11',
    };
var voted = 0, maxVotes = restaurantNames.length;

var users = [["t", "melvin", "hello@hello.com", 'admin', 'offline'],
             ["Peter Kim", "hamburger", "peter@kim.com", 'notadmin', 'offline']];

//GET Login page
router.get('/', function(req, res) {
    res.render('login', {title: 'Login'})
});

//GET all pages
router.get('/list', function(req, res) {
    res.render('list');
});

//GET user greeting page
router.get('/greeting', function(req, res) {
    res.render('greeting', {title: 'Greeting'})
});

//GET admin greeting page
router.get('/greetingadmin', function(req, res) {
    res.render('greetingadmin', {title: 'Greeting'})
});

//POST login page
router.post('/', function(req, res) {

    //request username and password
    var username = req.body.username;
    var password = req.body.password;
    var arraylength = users.length;

    console.log("User is " + username);
    console.log("Password is " + password);

    for (var i = 0; i < arraylength; i++) {
        if(users[i][0] == username) {
            if(users[i][1] == password) {
                console.log("User is " + username);
                console.log("Password is " + password);
                    res.redirect('/greeting');
                }
            }
        }
});

//POST to Add User Service
router.post('/adduser', function(req, res) {

    //Set internal DB variable
    var db = req.db;

    //Get form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPassword = req.body.userpassword;
    var userAdmin = req.body.useradmin;

    //Set collection
    var collection = db.get('usercollection');

    //Submit to the DB
    collection.insert ({
        "username" : userName,
        "email" : userEmail,
        "password" : userPassword,
        "admin" : userAdmin
    }, function (err, doc) {
        if (err) {
            //If failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.location("userlist");

            res.redirect('userlist');
        }
    });
});

//POST to Update User service
router.post('/updateuser', function(req, res) {

    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPassword = req.body.userpassword;
    var userAdmin = req.body.useradmin;

    var collection = db.get('usercollection');

    collection.update (
        { username: userName },
        {
            username: userName,
            email: userEmail,
            password: userPassword,
            admin: userAdmin
        }, function (err, doc) {
            if(err) {
                //If failed, return error
                res.send("There was a problem modifying the selected user.");
            }
            else {
                res.location("userlist");

                res.redirect("userlist");
            }
        })
    });

//POST to REMOVE USER
router.post('/removeuser', function(req, res) {
    var db = req.db;

    var userName = req.body.username;

    var collection = db.get('usercollection');

    collection.remove(
        {  username: userName },
        function (err, doc) {
            if(err) {
                res.send("There was a problem deleting the information from the database.");
            }
            else {
                res.location("userlist");

                res.redirect("userlist");
            }
    })
});

//GET User Page
router.param('name', function(req, res, next, name) {
    var collection = db.get('usercollection');

    collection.find({name: name}, function(err, docs) {
        req.user = docs [0];
        next();
    })
});

//SHOW User Page
router.get('/users/:name', function(req, res) {
    res.render("users/show", {username: req.username});
});

module.exports = router;

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


/* SHOW Phase1Sprint1 page. */
router.get('/ph1sp1', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs11 = " + docs);
        console.log("docs11 = " + docs[0].phase);
        console.log("docs11 = " + docs[2].phase);

        res.render('ph1sp1', {
            "questions" : docs,
            "tasks" : docs
        });

    });
});

/* POST to Add task ph1sp1 */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* POST to Add Question ph1sp1 */
router.post('/addQuestionSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
        if (err) {
            console.log("error saving sprint 1 to the database");

            // If it failed, return error
            res.send("There was a problem saving sprint 1 to the database.");
        }
        else {
            console.log("inserted comments: " + questionInput);

            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("ph1sp1");
            // And forward to success page
            res.redirect("ph1sp1");
        }
    });
});


/* SHOW Phase1Sprint2 page. */
router.get('/ph1sp2', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs12 = " + docs);
        console.log("docs12 = " + docs[1].sprint);
        console.log("docs12 = " + docs[1].sprint);


        res.render('ph1sp2', {
            "questions" : docs,
            "title": "Phase 1 Assignments"
        });
    });
});

/* POST to Add Question ph1sp2 */
router.post('/addQuestionSave12', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint2" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp2");
                // And forward to success page
                res.redirect("ph1sp2");
            }
        });
});

/* SHOW Phase2Sprint1 page. */
router.get('/ph2sp1', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs21 = " + docs);
        console.log("docs21 = " + docs[2].sprint);
        console.log("docs21 = " + docs);


        res.render('ph2sp1', {
            "questions" : docs,
            "title": "Phase 2 Assignments"
        });
    });
});

/* POST to Add Question ph2sp1 */
router.post('/addQuestionSave21', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint1" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp1");
                // And forward to success page
                res.redirect("ph2sp1");
            }
        });
});

/* SHOW Phase2Sprint2 page. */
router.get('/ph2sp2', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs22 = " + docs);
        console.log("docs22 = " + docs[3].sprint);
        console.log("docs22 = " + docs[3].sprint);


        res.render('ph2sp2', {
            "questions" : docs,
            "title": "Phase 2 Assignments"
        });
    });
});

/* POST to Add Question ph2sp2 */
router.post('/addQuestionSave22', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint2" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp2");
                // And forward to success page
                res.redirect("ph2sp2");
            }
        });
});

/* GET Phase1Sprint1Admin Questions page. */
router.get('/ph1sp1admin', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs11a = " + docs);
        console.log("docs11a = " + docs[0].phase);

        res.render('ph1sp1admin', {
            "questions" : docs,
            "answers" : docs,
            "tasks" : docs
        });
    });
});

/* POST to Add task ph1sp1admin */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* POST to Add Question ph1sp1admin */
router.post('/addAnswerSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var answerInput = req.body.inputAnswer;
    console.log("Answer is =" + answerInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { answerlist : { answer : answerInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + answerInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* GET Phase2Sprint1Admin Questions page. */
router.get('/ph2sp1admin', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs = " + docs);
        console.log("docs = " + docs[2].phase);

        res.render('ph2sp1admin', {
            "questions" : docs,
            "answers" : docs
        });
    });
});

/* POST to Add Answer ph2sp1admin */
router.post('/addAnswerSave21', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var answerInput = req.body.inputAnswer;
    console.log("Answer is =" + answerInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint2" },
        { $push: { answerlist : { answer : answerInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + answerInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp1");
                // And forward to success page
                res.redirect("ph2sp1");
            }
        });
});




/* GET order submit page. */
router.get('/userOrderSubmit', function(req, res) {
  res.render('userOrderSubmit',{title:'Order Submission'});
});

/* GET new order page. */
router.get('/neworder', function(req, res) {
  res.render('neworder');
});

/* GET order history page. */
router.get('/orderhistory', function(req, res) {
  res.render('orderhistory');
});

/* GET Restaurantlist page. */
router.get('/restaurantlist', function(req, res) {
    var db = req.db;
    var collection = db.get('restcollection');
    collection.find({},{},function(e,docs){
        res.render('restlist', {
                "restlist" : docs,
                "menuItems" : menuItems[voted],
                "voted":voted
            });
        });
    });

/* GET Restaurantlist page. */
router.get('/restaurantlistadmin', function(req, res) {
    var db = req.db;
    var collection = db.get('restcollection');
    collection.find({},{},function(e,docs){
        res.render('restlistadmin', {
                "restlistadmin" : docs,
                "voted":voted
            });
        });
    });

/* Select Rest andn POST to where???*/
router.post('/selectrestaurant', function(req, res) {
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
    console.log(selectedrest);
});

/* Winning Rest and POST to results???*/
router.get('/winningrestaurant', function(req, res) {
    console.log('top of winningrestaurant');
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    /*var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
    /*console.log(selectedrest);*/

    ++voted;
    voted = voted % maxVotes;

    console.log('in index.js voted='+voted);
    //res.writeHead(200, {"Content-Type": "text/plain"});
    //res.send(voted); // You Can Call Response.write Infinite Times BEFORE response.end
    //res.end();

    //res.location("restaurantlist");
    // And forward to success page
    res.redirect("restaurantlist");
});

router.post('/NewItemForCurrentOrder', function(req,res){
    var userItemChoice = req.body.selecteditem;
console.log("user submitted item: "+userItemChoice);

    if(userItemChoice != '') {
      if(menuItemsForCurrentOrder == ''){
          menuItemsForCurrentOrder = userItemChoice;
      }
      else {
         menuItemsForCurrentOrder += " "+userItemChoice;      
     }
   }
   else {
    console.log("User must select a menu item");
   }

   console.log("all submitted items: "+menuItemsForCurrentOrder);

   res.redirect("restaurantlist");
});

/* GET New Restaurant page. */
router.get('/newrestaurant', function(req, res) {
    res.render('newrestaurant', { title: 'Add New Restaurant' });
});

/* POST to Add Rest Service */
router.post('/addrestaurant', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var restName = req.body.restname;
    var restPhone = req.body.restphone;
    console.log("restName ="+restName);
    console.log("restPhone ="+restPhone);

    // Set our collection
    var collection = db.get('restcollection');

    // Submit to the DB
    collection.insert({
        "restname" : restName,
        "restphone" : restPhone
    }, function (err, doc) {
        if (err) {
            console.log("rest error");
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("not error");
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("restaurantlist");
            // And forward to success page
            res.redirect("restaurantlist");
        }
    });
});

module.exports = router;
