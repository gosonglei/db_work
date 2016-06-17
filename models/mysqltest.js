/**
 * Created by songlei on 2016-6-1.
 */
    //后端，操作数据库文件,
var client = require('../database');//请求数据库支持；
//获取一个用于生成用户id的js文件
var uid= require('../utils/uuid');
/*
*用户对象，在routes/index中调用
* 定义Test；
 */
function Test(mysqltest){
    this.user_id = mysqltest.user_id;
    this.user_name = mysqltest.user_name;
    this.user_sex = mysqltest.user_sex;
    this.user_qq = mysqltest.user_qq;
}
var tableName = "mysqltest"; //表名字；
mysql = client.getDbCon();
module.exports = Test;

/*
*去数据库设计一个表；
* 表已经设置好；
* 开始写对表进行的函数操作
 */
/*
*Test 类中的方法
* 实现  查  数据库中数据；
* 实现与数据的连接；
 */
Test.find = function find (callback){
    /*
    *查找数据库中状体del=0的记录；
     */
    var  sql = "select mysqltest.* from mysqltest where mysqltest.del=0";
    mysql.query( sql,function(err,results,fields){
        if(err){
            throw err;
        } else {
            console.log(results);//大印出结果；
            callback(err,results,fields);//返回结果；
        }
    })
};
//已经实现了查操作，同样的，可以实现增删改操作
/*
 *Test类中的方法函数；
 *新 增 用户
 *用户对象函数，保存用户数据，在routes/index中的调用
 * 注：   User.save = function(){......} 是这样调用的：User.save()   静态方法
 User.prototype.save = function(){.......} 是这样调用的：   实例方法;
 var user = new User();
 user.save()和
 */
Test.prototype.save = function save(callback){
    var mysqltest = {
        user_id: this.user_id,
        user_name: this.user_name,
        user_sex: this.user_sex,
        user_qq: this.user_qq,
        del: 0   //删除状态，0表示未删除，1表示删除；
    };
    uuid=uid.v4();  //生成用户id；
    /*
     *插入数据库数据；
     */
    var sql="insert into mysqltest(user_id,user_name,user_sex,user_qq,del) values(?,?,?,?,?)";
    mysql.query(sql,[uuid,mysqltest.user_name,mysqltest.user_sex,mysqltest.user_qq,mysqltest.del],function(err,results,fields){
        if(err){
            throw err;
        }else{
            return callback(err,uuid,fields);
        }
    });
};

/*
*删和修改，
 */
//更新数据库；
Test.update = function update(id,name,sex,QQ,callback){
    var sql = "update mysqltest set mysqltest.user_name='" + name + "',mysqltest.user_sex='" + sex + "',mysqltest.user_qq='" + QQ + "' where mysqltest.user_id='" + id + "'";    //在id的情况下修改数据；
    mysql.query(sql,function(err,resultes,fields){
        if(err){
            throw err;
        } else {
            callback(err,resultes,fields);
        }
    })
};//完成；

/*
 *Test类中的方法函数；
 *删除用户信息
 */
Test.del = function del(delname, callback) {
    //删除方法1：将del状态有零变为1，数据库中仍然保存数据；
    //var sql = "update mysqltest set mysqltest.del =1 where mysqltest.user_name = '" + delname + "' ";
    //删除方法2：真正的删除，数据库中数据将彻底消失;
    var sql = "delete from mysqltest where user_id= '" + delname + "' ";
    console.log(sql);
    mysql.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            callback(err, results, fields);
        }
    })
};
