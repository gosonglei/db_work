/**
 * Created by songlei on 2016-6-1.
 */
//数据库设置文件
(function() {
    var settings;
//所用数据库的基本信息
    settings = {
        db: {
            host: '127.0.0.1',     //本地数据库
            port: '3306',           //数据库接口
            user: 'root',          //数据库用户名
            password: 'songlei01',          //数据库密码
            database: 'mytest'  //数据库名称
        }
    };
    module.exports = settings;
}).call(this);