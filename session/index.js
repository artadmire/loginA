const Koa = require('koa');
const Route = require('koa-router');
const session = require('koa-session');
const static = require('koa-static');
const body = require('koa-parser')
let app = new Koa();
// 处理post
app.use(body());
let router = new Route()
// 加密cookie用，可以随意写一个string
app.keys = [
    'dhkjshafkd932402',
    'ieywoqyr8439743243',
    'jklfdsufiequ4353454'
]
app.use(session({
  cookie: {
    path: '/',           // 项目根路径，表示cookie用于整个项目
    httpOnly: true,      // 禁止客户端通过js脚本修改cookie
    maxAge: 24 * 60 * 60 * 1000  // cookie过期时间 这里设置1天
  }
}, app))
router.post('/login', async ctx => {
    var { username = '', password = '' } = ctx.request.body
    if(username === '麦乐' && password === '123456') {
        ctx.session.user = username;
        ctx.body = {
            code: '200'
        }
        console.log('登陆成功')
    } else {
        ctx.body = {
            code: '401'
        }
        console.log('登陆失败')
    }
    
})
router.get('/profile', async ctx => {
   console.log(ctx.session)
   // 如果拿不到session中的user信息，说明未登陆
    if(!ctx.session.user) {
        ctx.body = `<a href='/'>请返回登陆</a>`
    }else {
       // 用户已经登陆
        ctx.body = `用户中心`
    }
})
router.get('/logout', async ctx => {
    ctx.session.user = null
    ctx.body = `<a href='/'>请返回登陆</a>`
})
app.use(router.routes());
app.use(static(__dirname + '/static'))
app.listen(3000)