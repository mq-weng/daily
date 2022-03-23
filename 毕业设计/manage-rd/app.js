const Koa = require("koa");
const router = require("./routes/index");
var logger = require("koa-logger");
const bodyparser = require('koa-bodyparser')
var cors = require("koa2-cors");
const app = new Koa();

app.use(
  cors({
    origin: function (ctx) {
      console.log(ctx);
      if (ctx.url === "/test") {
        return false;
      }
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(router.routes(), router.allowedMethods());
app.use(logger());

app.listen(3000);
