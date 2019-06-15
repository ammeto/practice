const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');
const main = serve(path.join(__dirname, 'static'));
const UsersInfo = require('./controller');
const {insertInfo, deleteInfoById, selectAllInfo} = new UsersInfo();
const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next)=> {
    await next();
    if(ctx.status === 404){
        ctx.body="404 NOT FOUND"
    }
});

//test
router.get('/t', async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

//createUser
router.post('/createUser', async ctx => {
    console.log('ctx.request.body:', ctx.request.body);
    let {name, city} = ctx.request.body;
    ctx.response.type = 'application/json';
    ctx.body = await insertInfo(name, city);
});

//allUsers
router.get('/allUsers', async ctx => {
    ctx.response.type = 'application/json';
    ctx.body= await selectAllInfo();
});

//deleteUser
router.post('/deleteUser', async ctx => {
    console.log('ctx.request.body:', ctx.request.body);
    let {id} = ctx.request.body;
    ctx.body = await deleteInfoById(id);
});

//middleware
app
  .use(main)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

//listen port 3000
app.listen(3000, err => {
    if (err) throw err;
    console.log('running...');
});
console.log('app started at port 3000...');
