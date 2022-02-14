const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 配置启动页面
const { VueLoaderPlugin } = require('vue-loader'); // 使用vue-loader需要配合plugin
module.exports = {
    mode: 'development',
    entry: "./src/main.js",
    output: {
        filename: "boundle.js",
        path: path.join(__dirname,"dist")
    },
    module:{
        rules:[

          { test:/\.vue$/, use: 'vue-loader'}, 

        //   { test: /.css/, use:['style-loader', 'css-loader']} 

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./public/index.html') //指定模板页面
        }), 
        new VueLoaderPlugin(), 
        
    ],
    devServer:{
        port: 3000,
        hot: true, // 默认热更新
        // static: path.resolve(__dirname, 'public'),
    }
}