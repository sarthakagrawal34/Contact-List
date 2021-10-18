const express= require('express');
const path = require('path');
const port= 8000;

const db = require('./config/mongoose');
// Requiring the Schema file on to the server
const Contact = require('./models/contact');

const app= express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'vieeews'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1
    // app.use(function(req,res,next){
    //     req.myName="Sarthak";
    //     //console.log("middleware 1 is called");
    //     next();
// });

// middleware 2
    // app.use(function(req,res,next){
    //     console.log('from mw1',req.myName);
    //     next();
// })

// var contactList= [
    //     {
    //         name:"Sarthak",
    //         phone:"8529488192"
    //     },
    //     {
    //         name:"Anany",
    //         phone:"9548011045"
    //     },
    //     {
    //         name:"Papa",
    //         phone:"8057657309"
    //     },
    //     {
    //         name:"Mummy",
    //         phone:"7906976980"
    //     },
    //     {
    //         name:"Baba",
    //         phone:"9557248476"
    //     }
    // ];


app.get('/', function(req,res){
    // console.log('from get route controller',req.myName);

    //using database to fetch the data and render it on the website
    Contact.find({}, function(err,contacts){
        if(err){
            console.log("Error in fetching data from db");
            return;
        }
        return res.render('home', {
            titleee: "My Contacts List",
            contact_list: contacts
        });
    });
    //This is without using database
        // return res.render('home', {
        //     titleee: "My Contacts List",
        //     contact_list: contactList
        // });
    
    
    // return res.render('home');
    // res.send('<h1>Cool it is running!</h1>');  // it is automatically convert content type to text/html
});

app.get('/practice', function(req,res){ 
    return res.render('practice', {
        titlee: "Let us Play"
    });
})

// app.get('/profile', function(req,res){
//     res.send('<h1>Cool it is running!</h1>');  // it is automatically convert content type to text/html
// })

// app.get('/', function(req,res){
//     res.send('Cool it is running!');
// })


// This post request is used to send the data to any database or any website.
app.post('/create-contact', function(req,res){
    // contactList.push(
    //     {
    //         name: req.body.name,
    //         phone:req.body.phone
    //     }
    // );

    // contactList.push(req.body);

    // creating and sending data to data base: populating schema
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating a contact!");
            return;
        }
        //console.log('********',newContact);
        return res.redirect('back');     
    });
    // return res.redirect('back'); // or return res.redirect('/');
    
    
    
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    
    // return res.redirect('/practice');
});

// for deleting contact
app.get('/delete-contact',function(req,res){
    // get the query from the url when database is used
    let id = req.query.id;
    //finding the contact in the database using id and deleting it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting the contact from database");
            return;
        }
        return res.redirect('back');
    })
    // get the query from the url when database is not used
        // let phone= req.query.phone;
        // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
        // if(contactIndex!=-1){
        //     contactList.splice(contactIndex,1);
        // }
        // return res.redirect('back');
});

//Using params
    // app.get('/delete-contact/:phone',function(req,res){
    //     console.log(req.params);
    //     let phone= req.params.phone;
    // });



app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('My Express server is running on port:', port);
})





// Errors which can be made:
    // Library inclusion
    //Syntax
        // Brackets closing & opening
        // quotes wrongly used ""