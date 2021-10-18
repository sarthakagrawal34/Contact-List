# Contact-List
A online contact list which is having database also for storing and deleting data.

# Steps Taken in creating the contact list
1. Created **index.js** file.
2. Then we did **npm init** to setup our project
3. It is used to create package.json file
4. Then we install express server by **npm install express**
5. Then we start our server.
    a. First we require express. Then we use a port to run up our server:- 
        **const express= require("express")**.
    b. Then we fired our express app by:- **const app= express();**
    c.Then we handle the listen of app and hab]ndle the error in running on port:- **app.listen(port,function(err){//function defn});**
6. Then we use template engine for view part.
7. We downloaded one of the template that is ejs:- **npm install ejs**
    a. then we set the view as ejs by:- **app.set('view engine', 'ejs');**
    b.Then we have to set the path to the views.
            i) first we require path:- **const path= require('path');**
            ii) Then we have to set the path to the folder that contain our ejs file that is folder vieeews by
                **app.set('views', path.join(__dirname,'vieeews'));** where __dirname= /contact_list
    c. Then we make ejs file in vieeews folder as home.ejs.
8. We have made a contactList array in index.js.
9. Then we render the ejs file on the port by:- 
    <!-- app.get('/',function(req,res){return res.render('home', {
        titleee: "My Contacts List",
        contact_list: contactList
        }); -->
10. Then we run a loop in home.ejs which prints the contactList defined in index.js by passing the object-key **contact_list**
11. Then we made a form in home.ejs with **action="/create-contact" and method=POST** as we want the data from the user and send it to **'/create-contact'**. We use **name** key as object of contactList
12. To read the form data in index.js we use middleware of express by:- **app.use(express.urlencoded());**. It parses into key and value pair.
13. The key value pair received is in **req.body**
14. Then we use the post request of the form by:- app.post('/create-contact', function(req,res){
    contactList.push(req.body);
     return res.redirect('back'); <!--// or return res.redirect('/');) -->
});
15. Now we want to add static files or assets like css, js, images files to our contact List.
16. We made a folder assets in contact_list folder and use **app.use(express.static('assets'));**
17. Then we made assets file for beautifying the content of the project.
18. We now worked upon the delete button which deletes the contact that has been added.
    a. We used the concept of **string params or query params** for passing on the data to the server:-
    <!-- app.get('/delete-contact',function(req,res){
        let phone= req.query.phone;
        let contactIndex=contactList.findIndex(contact => contact.phone==phone);
        if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
        }
        return res.redirect('back');
        }); -->
19. Finally the app is ready to serve the purpose without the use of database.





## Now we start setting up the database and linking the project to a database.
1. First we install MongoDB server and package. 
2. Then install mongoose using **npm install mongoose** which is a connection between MongoDB and the database.
3. Now we make a new file **mongoose.js** in **config folder** for setting up the configuration.
4. in mongoose.js file we use **const mongoose= require('mongoose');** to require the library mongoose.
5. then we setup a connection using **mongoose.connect('mongodb://localhost/contact_list_db');**
6. Then we check wheteher the connection is successful or not by :-
    const db= mongoose.connection;
    //error
    db.on('error', console.error.bind(console, "error connecting to db"));
    //up and running then print the message
    db.once('open', function(){
        console.log("Successfully connected to database");
    });
7. Now we require the db to run on server so in index.js we used **const db = require('./config/mongoose');** and test that is it running or not. And well it is running:)
8. We use **Robo3T to see what is happening in the database**



## Accessing the database for creating contact
1. Now we define a schema that is how should it be appear in the database.
2. For that we create a **models** folder and in that **contact.js** file which again requires mongoose library.
3. This doesn't mean that by requiring again there will be a new instance created. It will be acquire from where we left.
4. Now we define schema:
    <!-- const contactSchema= new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phone: {
            type:String,
            required: true
        }
    }); -->
5. Now we have to export this model on the index.js file so we declare a variable Contact and then export it by:
    <!-- // Declaring a collection for the fields to be stored in db
    const Contact= mongoose.model('Contact', contactSchema); // Here model defines the collection
    // Now exporting the module to the server
    module.exports=Contact; -->

6. Now we require this module in index.js file we use **const Contact = require('./models/contact');**
7. Now in post request of creating contact:
    <!-- app.post('/create-contact', function(req,res){
        Contact.create({
            name: req.body.name,
            phone: req.body.phone
        },function(err,newContact){
            if(err){
                console.log("Error in creating a contact!");
                return;
            }
            return res.redirect('back');     
        }); 
    });-->
8. This crates a contact in database but not shows on the browser for that we have to do changes in get request.
9.    <!--  app.get('/', function(req,res){
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
    }); -->
10. Now this is how we created the contact and saving in the database.

## Accessing the database and deleting the contact
1. In the home.ejs file we do change in the query parameter as we want to delete the contact using id.
    **<a href="/delete-contact/?id=<%= i._id %>">**
2. now in index.js we do changes in get request od delete contact.
3. <!--  app.get('/delete-contact',function(req,res){
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
    }); -->
4. Now this makes the basic Contact list with **CRD (Create, Read, delete)** function.
