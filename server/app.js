const express = require('express')
const app = express()
const parser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(parser.json())
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    if(req.method==="OPTIONS")
    {
        return res.sendStatus(200)
    }
    next();
})

const modules = require('./model/index');

const authRoutes = require('./routes/auth');
app.use('/api/auth' , authRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category' , categoryRoutes);

const authorRoutes = require('./routes/author')
app.use('/api/author',authorRoutes)

const opinionRoutes = require('./routes/opinion')
app.use('/api/opinion',opinionRoutes)

const newRoutes = require('./routes/new');
app.use('/api/new' , newRoutes);

const videoRoutes = require('./routes/video');
app.use('/api/video' , videoRoutes);

const socialRoutes = require('./routes/socialmedia');
app.use('/api/socialmedia' ,socialRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin' ,adminRoutes);

app.use((error,req,res,next)=>
{
    console.log(error);
    const status = error.statusCode
    const message = error.message 
    res.status(status).json({message:message})
})

const sequlize = require('./utils/database')
sequlize.sync({alter:true})
.then(result=>
    {
        console.log('connection')
        app.listen(8000)
    })