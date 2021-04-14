var mongoose = require('mongoose');
mongoose.connect('mongodb://cphcsyakb48ttp:wyjljnakb48ttp@140.116.132.223:27017/videoctrl', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

var viddataSchema = mongoose.Schema({
    vidindex: {
        type: String,
        index: true
    },
    vidtitle: {
        type: String
    },
    vidlocalurl: {
        type: String
    },
    vidhash: {
        type: String
    },
    vidgoogleurl: {
        type: String
    },
    viddescription: {
        type: String
    },
    vidclass: {
        type: String
    },
    vidsee: {
        type: String
    }
});

var viddata = module.exports = mongoose.model('viddata', viddataSchema);

module.exports.updata = function (adddata, callback) {
    adddata.save(callback);
};

module.exports.listall = function () {
    var tmpout;
    viddata.find().lean().exec(function (err, allfoo) {
        tmpout = allfoo;    /*TODO:
        *幹卡在這裡啦
            */
    });
    console.log(tmpout);
    return tmpout;
}