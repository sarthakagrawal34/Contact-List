const mongoose= require('mongoose');
// Note using require mongoose  more than 1 time will require mongoose to use from the same instance.


// defining schema for our contact list that how should it be stored in db
const contactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true
    }
});

// Declaring a collection for the fields to be stored in db
const Contact= mongoose.model('Contact', contactSchema); // Here model defines the collection

// Now exporting the module to the server
module.exports=Contact;