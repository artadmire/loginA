var express = require('express')
var app = express();
app.get('/',(req,res)=> {
    res.cookie('maile', 16, {
        maxAge: 14 * 86400 * 1000, // 14天的有效期
        httpOnly: true // js脚本无法读取cookie,能有效的防止xss脚本攻击 没有这个属性document.cookie可以获取cookie
    })
    res.send('首页')
})
app.listen(3000);
 
// cookie解决http无状态, 存在浏览器，不安全。服务端告诉浏览器，把这个cookie存下来
// session 存在服务器，
//Session：记录一系列状态, 不是 独立存在的，依赖于cookie。通常用于登陆验证
 
//Session与cookie功能效果相同。Session与Cookie的区别在于Session是记录在服务端的，而Cookie是记录在客户端的。