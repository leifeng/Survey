var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/data',function(req,res){
    res.json( [
        {
            type: 1,
            id: 1000,
            title: '0这是单选问题',
            options: ['选项1', '选项2', '选项3']
        }, {
            type: 2,
            id: 10001,
            title: '1这是多选问题',
            options: ['选项1', '选项2', '选项3']
        }, {
            type: 3,
            id: 10002,
            title: '2这是填空题'
        }, {
            type: 4,
            id: 10003,
            title: '3排序题',
            options: ['第一', '第二', '第三']
        },{
            type:5,
            title:'img single',
            options:['a','b','v']
        }
    ])
})
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});

