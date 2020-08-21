const express = require('express');

const admin= require('./routes/admin')
const logger=require('morgan');
const nunjucks= require('nunjucks');
const bodyParser=require('body-parser');

const app = express();
const port = 3000;

nunjucks.configure('template',{
    autoescape: true,                    //template에서 html태그 유무-true(태그 나오게), 
    express: app
});
//미들웨어 셋팅
app.use( logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/uploads', express.static('uploads'));

app.use( (req,res,next) =>{        //global view 
    app.locals.isLogin=true;       //미들웨어로 locals하면 어디서든 접근 가능 
    app.locals.req_path=req.path;     
    next();
});

// app.use( ( req , res, _ ) => {
//     res.status(400).render('./common/404.html')
// });

// // 500
// app.use( (err, req, res,  _ ) => {
//     res.status(500).render('./common/500.html')
// });


function vipMiddleware(req,res,next){
    console.log('최우선 미들웨어');
    next();
}
app.use('/admin',vipMiddleware, admin);
//app.use('/admin', admin);

app.get('/', (req,res) => {
    res.send('express start');
});

app.listen( port, () => {
    console.log('Express listening on port', port);
});