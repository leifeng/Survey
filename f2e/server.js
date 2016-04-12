var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var bodyParser = require('body-parser')
var compiler = webpack(config);

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json 
app.use(bodyParser.json())

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('/admin/json/survey', function(req, res) {
    res.json({
        "id": 1,
        "title": "测试问卷发布",
        "type": null,
        "createTime": "2016-04-05 11:41:31",
        "editTime": null,
        "questions": [{
            "id": 2,
            "title": "单选东方闪电",
            "answers": [
                "a",
                "v",
                "c",
                "d"
            ],
            "kind": 1,
            "sid": 1,
            "listOrder": 1
        }, {
            "id": 1,
            "title": "多项12312312",
            "answers": [
                "1",
                "2",
                "3",
                "4"
            ],
            "kind": 2,
            "sid": 1,
            "listOrder": 2
        }, {
            "id": 3,
            "title": "asdfsdfsdf?",
            "answers": [],
            "kind": 3,
            "sid": 1,
            "listOrder": 3
        }],
        "setting": {
            "id": null,
            "endTime": "2016-04-05 11:41:31",
            "collections": 0,
            "ipConfine": false,
            "requireLogin": false,
            "isRepeat": true
        },
        "status": 1,
        "author": 1,
        "settingId": null,
        "style": null
    })
});
app.get('/app/survey/', function(req, res) {
    res.json({
        id: 1,
        title: '',
        createTime: '',
        endTime: '',
        status: '',
        author: '',
        style: {
            bgColor: '#fff',
            title: {
                color: '#000',
                size: '12px'
            },
            option: {
                color: '#111',
                size: '14px;'
            }
        },
        setting: {
            login: false,
            share: true
        },
        questions: [{
            kind: 1,
            id: 1000,
            title: '这是单选问题',
            answers: ['选项1', '选项2', '选项3']
        }, {
            kind: 2,
            id: 10001,
            title: '这是多选问题',
            answers: ['选项1', '选项2', '选项3']
        }, {
            kind: 3,
            id: 10002,
            title: '这是填空题'
        }, {
            kind: 4,
            id: 10003,
            title: '排序题',
            answers: ['第一', '第二', '第三']
        }]
    })
});
app.post('/admin/post/survey/edit',function(req,res){
    console.log(req.body);
    res.json({msg:'OK'});
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});