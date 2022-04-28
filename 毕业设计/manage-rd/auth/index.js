let jwt = require('jsonwebtoken');

let secretKey = 'fgbb**';
module.exports = {
    creatAuthration(playload) {
        return jwt.sign(playload, secretKey,{ expiresIn: "24h" });
    },

    async verifyAuthration(ctx, next) {
        if (ctx.header.authorization) {
            let token = ctx.header.authorization;
            // console.log("token",token)
            // let bearer =  parts.split(" ")[0];
            // let token = parts.split(" ")[1];
            // console.log(token)
            // if(/^Bearer$/.test(bearer)){
                try {
                    let user = jwt.verify(token, secretKey);
                    if(next){
                        await next();
                    }
                    return user;
 
                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        state: "fail",
                        token: "token不存在或已过期"
                    }
                    console.log('blog' + err)
                }
            // }
        }
    },

}