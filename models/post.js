//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Post Schema
var PostSchema = mongoose.Schema({
    PostTime: {
        type: String,
        index: true
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    /*voice: {
        type: String
    },*/
    like: {
        type: Array
    },
    message: {
        type: Array
    }
});

//export Post schema
var Post = module.exports = mongoose.model('Post', PostSchema);

//passport
module.exports.getPostById = function (id, callback) {
    console.log("------->findPostById");
    Post.findById(id, callback);
    console.log(callback);
}

module.exports.getPostByPosttitle = function (title, callback) {
    console.log("------->getPostByPosttitle");
    var query = { title: title };
    Post.findOne(query, callback);
    console.log(callback);
}

module.exports.setPostMessage = function (title, message, callback) {
    console.log("------->setPostMessage");
    var query = { title: title };
    Post.findOne(query, function(err, postget){
        postget.message.push(message);
        postget.save(callback);        
    });
    //Post.updateOne(query, {message: this.message.append(message)}, callback)
    console.log(callback);
}

module.exports.setPostLike = function (title, like, callback) {
    console.log("------->setPostLike");
    var query = { title: title };
    Post.findOne(query, function(err, postget){
        postget.like.push(like);
        postget.save(callback);
    });
    //Post.updateOne(query, {message: this.like.append(like)}, callback)
    console.log(callback);
}

module.exports.createPost = function (newPost, callback) {
    newPost.save(callback);
}

