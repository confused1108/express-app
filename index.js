/**
 * Created by Hitesh on 08-Aug-19.
 */
const express=require('express');
const path=require('path');
const moment=require('moment');
const logger=require('./middleware/logger');
const exphbs=require('express-handlebars');
const members=require('./Members');
const app=express();


// Handlebar middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>res.render('index',{
    title:'Member App',
    members
}));

//app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/members', require('./routes/api/members'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);