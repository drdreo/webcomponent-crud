//Require mongoose package
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at'
        },
        retainKeyOrder: true,
        collection: "users"
    }
);


//set collection here or in the model creation or in the schema creation
userSchema.set("collection", "users");

//first argument is a useless model name, 3rd is the actual collection name
const UsersModel = module.exports = mongoose.model('UserSchema', userSchema, "users");


//Model.find() returns the collection
module.exports.getAllUsers = (sort, callback) => {
    console.log("finding all users ...");
    UsersModel.find({}).sort(sort).exec(function (err, results) {
        //invoke callback with your mongoose returned result
        callback(err, results);
    });
    console.log("done finding");
};

//newUser.save is used to insert the document into MongoDB
module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
};

//Here we need to pass an id parameter to Model.remove
module.exports.deleteUserById = (id, callback) => {
    let query = {_id: id};
    UsersModel.remove(query, callback);
};

// example schema types
// var schema = new Schema({
//     name: String,
//     binary: Buffer,
//     living: Boolean,
//     updated: {type: Date, default: Date.now},
//     age: {type: Number, min: 18, max: 65},
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String],
//     ofNumber: [Number],
//     ofDates: [Date],
//     ofBuffer: [Buffer],
//     ofBoolean: [Boolean],
//     ofMixed: [Schema.Types.Mixed],
//     ofObjectId: [Schema.Types.ObjectId],
//     ofArrays: [[]],
//     ofArrayOfNumbers: [[Number]],
//     nested: {
//         stuff: {type: String, lowercase: true, trim: true}
//     }
// });


