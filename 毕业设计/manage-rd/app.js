const Koa = require("koa");
const User = require('./controllers/user')
var logger = require('koa-logger')
const app = new Koa();

app.use(router(app))
app.use(User.routes(), User.allowedMethods())
app.use(logger())
 

app.listen(3000);
