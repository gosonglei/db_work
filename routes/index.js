
//本js文件实现路由配置，前端传来的请求，通过本页面处理，做出回复
//例如，对数据库的操作，前端页面，传来的数据，通过本文件，连接到models/mysqltest，实现数据库的连接
var express = require('express');
var router = express.Router();

var Test = require('../models/mysqltest');  //请求数据库的js；
/* GET home page. */
/*
*路由配置，跳转到index页面；
*查 操作，
* Test.find为mysqltest文件中定义的函数方法，再次直接调用；
 */
router.get('/', function (req, res, next) {
    Test.find(function (err, data) {
        if (err) {
            console.log(err);
            return res.redirect('/err')
        }
        res.render('index', {
            title: '数据库',
            users: data
            //前端传来的数据存到data中，传到数据库
        });
    });
});

//同理，调用增添函数实现数据的增加；
//User.prototype.save = function(){.......}    实例方法;
//所以，save方法得实例化后才能调用；
router.post('/', function (req,res) {
    var new_Test = new Test({
        user_name :req.body.name,
        user_sex :req.body.sex,
        user_qq :req.body.QQ
    });//前端的数据；
    new_Test.save(function (err) {
        if (err) {
            return res.redirect('/err');
        }
        //req.flash('success', '插入成功');
        //插入成功，返回当前页面，当前页面是跟目录，所以，/即可，重启服务器；
        res.redirect('/');
    });
});

router.post('/user/edit', function (req, res) {
    var bobo = req.body.obj;//获取前端页面传来的obj数据；
    console.log("bobo=" + bobo);//测试输出
    var str = JSON.parse(bobo);
    console.log("json=" + str);//测试输出
    //遍历循环数组中的数据
    var id =str[0];
    var name = str[1];
    var sex = str[2];
    var QQ = str[3];
    console.log(id + name + sex + QQ);//测试输出
    Test.update(id,name, sex, QQ, function (err) {
        if (err) {
            console.log(err);
            return res.redirect('/err');
        }
        res.redirect('/');
    });
});

router.post('/user/del', function (req, res) {
    var bobo = req.body.obj;
    console.log("bobo=" + bobo);
    var delname = JSON.parse(bobo);
    console.log("json=" + delname);
    //遍历循环数组中的数据
    Test.del(delname, function (err) {
        if (err) {
            console.log(err);
            return res.redirect('/err');
        }
        res.redirect('/');
    });
});


module.exports = router;
