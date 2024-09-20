const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listeningSchema = new Schema({
    subject:{
        required:true,
        type:String,
    },
    topics:{
        required:true,
        type:String,
    },
    note:String,
    image:{
        url:{
            type:String,
        }
    },
});

const Listing = mongoose.model("Listing",listeningSchema);
module.exports = Listing;