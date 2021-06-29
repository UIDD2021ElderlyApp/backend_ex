var express = require('express');
var router = express.Router();

var glob_user_obj;

var Medal = require('../models/Medal');

router.post('/', ensureAuthenticated, function(req, res) {
    console.log("?------------------------------> set Medal")
    console.log(req.body.medal)
    var inputMedal = req.body.medal;
    Medal.setMedalByUserId(glob_user_obj.username, inputMedal, function(db_type) {
        if (db_type === -1) {
            var newMedal = new Medal({
                user_id: glob_user_obj.username,
                exp: 0,
                wake: false,
                sleep: false,
                picture: false,
                stroll: false,
                walk: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                post: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                message: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                level: {
                    progress: 0,
                    finished: false,
                    goal: 0
                }
            });
            Medal.createMedal(newMedal, function(err, newMedal) {
                if (err) throw err;
                console.log(newMedal);
            });
            Medal.setMedalByUserId(glob_user_obj.username, inputMedal, function(db_type_2) {
                console.log("**********Reload to put data**********");
                if (db_type_2 === 1) {
                    var levelObject = {
                        "type": 8,
                        "goal": 1
                    }
                    Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type_3) {
                        console.log("**********Reload to level up**********");
                    });
                }
            }); // reset the data  
        }
        if (db_type === 1) {
            var levelObject = {
                "type": 8,
                "goal": 1
            }
            Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type) {
                console.log("**********Reload to level up**********");
            });
        }
    });
    res.status(200).send();
})

router.post('/setWake', ensureAuthenticated, function(req, res) {
    Person.getPersonal(glob_user_obj.username, function(err, Personget) {
        if (err) throw err;
        if (Personget) {
            Medal.getDaily(glob_user_obj.username, function(dailyMissionComplete) {
                var getup = Personget.getup_time[0] * 60 + Personget.getup_time[1];
                var dt = new Date();
                var nowtime = dt.getHours() * 60 + dt.getMinutes();
                if (Math.abs(nowtime - getup) <= 10 || Math.abs(nowtime - getup) >= 1430 && !dailyMissionComplete.wake) {
                    var input = {
                        "type": 1,
                        "goal": 1
                    };
                    Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(input), function(db_type) {
                        if (db_type === -1) {
                            var newMedal = new Medal({
                                user_id: glob_user_obj.username,
                                exp: 0,
                                wake: false,
                                sleep: false,
                                picture: false,
                                stroll: false,
                                walk: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                post: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                message: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                level: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                }
                            });
                            Medal.createMedal(newMedal, function(err, newMedal) {
                                if (err) throw err;
                                console.log(newMedal);
                            });
                            Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(input), function(db_type_2) {
                                console.log("**********Reload to put data**********");
                                if (db_type_2 === 1) {
                                    var levelObject = {
                                        "type": 8,
                                        "goal": 1
                                    }
                                    Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type_3) {
                                        console.log("**********Reload to level up**********");
                                    });
                                }
                            }); // reset the data  
                        }
                        if (db_type === 1) {
                            var levelObject = {
                                "type": 8,
                                "goal": 1
                            }
                            Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type) {
                                console.log("**********Reload to level up**********");
                            });
                        }
                    });
                }
            })
        } else {
            res.status(200).send(-1);
        }
    })
    res.status(200).send();
})

router.post('/setSleep', ensureAuthenticated, function(req, res) {
    Person.getPersonal(glob_user_obj.username, function(err, Personget) {
        if (err) throw err;
        if (Personget) {
            Medal.getDaily(glob_user_obj.username, function(dailyMissionComplete) {
                var sleep = Personget.sleep_time[0] * 60 + Personget.sleep_time[1];
                var dt = new Date();
                var nowtime = dt.getHours() * 60 + dt.getMinutes();
                if (Math.abs(nowtime - sleep) <= 10 || Math.abs(nowtime - sleep) >= 1430 && !dailyMissionComplete.sleep) {
                    var input = {
                        "type": 2,
                        "goal": 1
                    };
                    Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(input), function(db_type) {
                        if (db_type === -1) {
                            var newMedal = new Medal({
                                user_id: glob_user_obj.username,
                                exp: 0,
                                wake: false,
                                sleep: false,
                                picture: false,
                                stroll: false,
                                walk: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                post: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                message: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                },
                                level: {
                                    progress: 0,
                                    finished: false,
                                    goal: 0
                                }
                            });
                            Medal.createMedal(newMedal, function(err, newMedal) {
                                if (err) throw err;
                                console.log(newMedal);
                            });
                            Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(input), function(db_type_2) {
                                console.log("**********Reload to put data**********");
                                if (db_type_2 === 1) {
                                    var levelObject = {
                                        "type": 8,
                                        "goal": 1
                                    }
                                    Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type_3) {
                                        console.log("**********Reload to level up**********");
                                    });
                                }
                            }); // reset the data  
                        }
                        if (db_type === 1) {
                            var levelObject = {
                                "type": 8,
                                "goal": 1
                            }
                            Medal.setMedalByUserId(glob_user_obj.username, JSON.stringify(levelObject), function(db_type) {
                                console.log("**********Reload to level up**********");
                            });
                        }
                    });
                }
            })
        } else {
            res.status(200).send(-1);
        }
    })
    res.status(200).send();
})

router.get('/getdaily', ensureAuthenticated, function(req, res) {

    Medal.getDaily(glob_user_obj.username, function(dailyMissionComplete) {
        res.status(200).send(JSON.parse(dailyMissionComplete));
    })
})

router.get('/getEXP', ensureAuthenticated, function(req, res) {
    Medal.getEXP(glob_user_obj.username, function(goal) {
        res.status(200).send(String(goal));
    })
})

router.get('/getWalk', ensureAuthenticated, function(req, res) {
    Medal.getWalk(glob_user_obj.username, function(goal) {
        res.status(200).send(String(goal)); ///
    })
})

router.get('/getPost', ensureAuthenticated, function(req, res) {
    Medal.getPost(glob_user_obj.username, function(goal) {
        res.status(200).send(JSON.parse(goal));
    })
})

router.get('/getMessage', ensureAuthenticated, function(req, res) {
    Medal.getMessage(glob_user_obj.username, function(goal) {
        res.status(200).send(JSON.parse(goal));
    })
})

router.get('/getLevel', ensureAuthenticated, function(req, res) {
    Medal.getLevel(glob_user_obj.username, function(goal) {
        res.status(200).send(JSON.parse(goal));
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;