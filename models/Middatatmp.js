//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Middatatmp Schema
var MiddatatmpSchema = mongoose.Schema({
    user_name: {//編號
        type: String
    },
    tmp_to_set: {
        type: String
    }
    // ary_1_tmp: {//12 bool
    //     type: Array
    // },
    // ary_2_tmp: {//8 bool
    //     type: Array
    // },
    // ary_3_tmp: {//8 bool
    //     type: Array
    // },
    // ary_4_tmp: {//8 bool
    //     type: Array
    // },
    // goal_data_1_tmp: {//float
    //     type: Number
    // },
    // goal_data_2_tmp: {//int
    //     type: Number
    // },
    // goal_data_3_tmp: {//int
    //     type: Number
    // },
    // goal_data_4_tmp: {//int
    //     type: Number
    // },
    // mis1_data_tmp_wake: {
    //     type: Boolean
    // },
    // mis1_data_tmp_sleep: {
    //     type: Boolean
    // },
    // mis1_data_tmp_picture: {
    //     type: Boolean
    // },
    // mis1_data_tmp_stroll: {
    //     type: Boolean
    // },
    // exp_data_tmp: {
    //     type: Number
    // }

});

//export Middatatmp schema
var Middatatmp = module.exports = mongoose.model('Middatatmp', MiddatatmpSchema);

//function

module.exports.createMiddatatmp = function (newMiddatatmp, callback) {
    newMiddatatmp.save(callback);
}

module.exports.getMiddatatmp = function (user_name, callback) {
    console.log("------->getMiddatatmp");
    var query = { user_name: { $eq: user_name } };
    Middatatmp.findOne(query, function (err, Middatatmpget) {
        if (!Middatatmpget) {
            var newMiddatatmp = new Middatatmp({
                user_name: user_name,
                tmp_to_set: JSON.stringify({
                    ary_1_tmp: [false, false, false, false, false, false, false, false, false, false, false, false],
                    ary_2_tmp: [false, false, false, false, false, false, false, false],
                    ary_3_tmp: [false, false, false, false, false, false, false, false],
                    ary_4_tmp: [false, false, false, false, false, false, false, false],
                    goal_data_1_tmp: 0,
                    goal_data_2_tmp: 0,
                    goal_data_3_tmp: 0,
                    goal_data_4_tmp: 0,
                    mis1_data_tmp_wake: false,
                    mis1_data_tmp_sleep: false,
                    mis1_data_tmp_picture: false,
                    mis1_data_tmp_stroll: false,
                    exp_data_tmp: 0,
                })
            });
            Middatatmp.createMiddatatmp(newMiddatatmp, function (err, newMiddatatmp) {
                if (err) throw err;
                console.log("newMiddatatmp : ");
                console.log(newMiddatatmp);
                Middatatmp.findOne(query, callback);
            });
        }
        else {
            Middatatmp.findOne(query, callback);
        }
    });
    console.log(callback);
}

module.exports.setMiddatatmp = function (user_name, Middatatmp_to_set, callback) {
    console.log("------->setMiddatatmp");
    var query = { user_name: { $eq: user_name } };
    Middatatmp.findOne(query, function (err, Middatatmpget) {
        if (Middatatmpget) {
            Middatatmpget.tmp_to_set = Middatatmp_to_set;
            Middatatmpget.save();
            callback(0);
        }
        else {
            callback(1);
        }
    });
    console.log("module.exports.setMiddatatmp");

}

module.exports.deleteMiddatatmpByuser_name = function (user_name, callback) {
    console.log("------->deleteMiddatatmpByuser_name");
    var query = { user_name: { $eq: user_name } };
    Middatatmp.deleteOne(query, callback);
    console.log(callback);
}

