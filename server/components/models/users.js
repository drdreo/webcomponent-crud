//Require mongoose package
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
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


userSchema.pre('save', function (next) {
    let user = this;


    console.log("is modified ? = " + user.isModified('password'));
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            console.log("pwd overwritten with hashed! ");
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        console.log("password match ? = " + isMatch);
        cb(err, isMatch);
    });
};

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


//newUser.save is used to insert the document into MongoDB
module.exports.updateUser = (number, user, callback) => {
    UsersModel.findOne({number: Number(number)}, function (err, doc) {
        doc.username = user.username;
        doc.email = user.email;
        doc.password = user.password;
        doc.save();

        callback(err, doc);
    });

};

//runningSince,  getting the date since the db is up and running.
module.exports.usersCount = (callback) => {
    UsersModel.count({}, function (err, cnt) {
        callback(err, cnt);
    })
};

//runningSince,  getting the date since the db is up and running.
module.exports.runningSinceDate = (callback) => {
    UsersModel.collection.serverStatus(function (err, res) {
        callback(err, res);
    })
};

//Here we need to pass an id parameter to Model.remove
module.exports.deleteUserById = (id, callback) => {
    let query = {_id: id};
    UsersModel.remove(query, callback);
};

//Here we need to pass an id parameter to Model.remove
module.exports.getUserByUsername = (username, callback) => {
    let query = {
        username: {$regex: username}
    };
    UsersModel.findOne(query, function (err, result) {
        // test a matching password

        callback(err, result);
    });
    console.log("done getting username");
};

//Here we need to pass an id parameter to Model.remove
module.exports.getUserByID = (id, callback) => {

    UsersModel.findOne({'number': Number(id)}, '', function (err, user) {
        // test a matching password
        callback(err, user);
    });
    console.log("done getting user by id ");
};

// fetch user and test password verification
module.exports.validateUser = (username, password, callback) => {

    UsersModel.findOne({username: username}, function (err, user) {
        // if user exists
        if (user) {
            user.comparePassword(password, function (err, isMatch) {

                console.log('Passwords  match:' + isMatch);
                if (isMatch) {
                    callback(err, user);
                }
                else {
                    callback(err, false);
                }
            });
        } else {
            callback(err, false);
        }

    });
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


