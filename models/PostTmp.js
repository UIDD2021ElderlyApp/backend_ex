//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//PostTmp Schema
var PostTmpSchema = mongoose.Schema({
    last_update_time: {
        type: Date,
        index: true
    },
    user_name: {//編號
        type: String
    },
    post_tmp: {
        type: String
    },
    post_img_select_tmp: {
        type: String
    }
});

//export PostTmp schema
var PostTmp = module.exports = mongoose.model('PostTmp', PostTmpSchema);

//function

module.exports.createPostTmp = function (newPostTmp, callback) {
    newPostTmp.save(callback);
}

module.exports.getPostTmp = function (user_name, callback) {
    console.log("------->getPostTmp");
    var query = { user_name: { $eq: user_name } };
    PostTmp.findOne(query, callback);
    console.log(callback);
}

module.exports.setPostTmp = function (time, user_name, string_to_set, select, callback) {
    console.log("------->setPostTmp");
    var query = { user_name: { $eq: user_name } };
    PostTmp.findOne(query, function (err, Personget) {
        if (Personget) {
            Personget.last_update_time = time;
            if (select == 1)
                Personget.post_tmp = string_to_set;
            else if (select == 2)
                Personget.post_img_select_tmp = string_to_set;
            else if (select == 0)
                Personget.post_tmp = "";
                Personget.post_img_select_tmp = "";
            Personget.save();
            callback(0);
        }
        else {
            callback(1);
        }
    });
    console.log("module.exports.setPostTmp");

}

module.exports.deletePostTmpByuser_name = function (user_name, callback) {
    console.log("------->deletePostTmpByuser_name");
    var query = { user_name: { $eq: user_name } };
    PostTmp.deleteOne(query, callback);
    console.log(callback);
}

