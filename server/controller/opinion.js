const Category = require('../model/Category')
const Opinion = require('../model/Opinion')
const Author = require('../model/Author')
const fs = require('fs')
const path = require('path')

exports.createOpinion = async(req,res,next)=>
{
    try{
        const {authorId,categoryId,description,title,headLine} = req.body
        if(!req.file)
        {
            const error = new Error('يجب إضافة صورة');
            error.statusCode = 422 ; 
            throw error ;
        }
        const category = await Category.findByPk(categoryId)
        const author = await Author.findByPk(authorId)
        if(!category || !author)
        {
            const error = new Error('المؤلف أو الفئة غير متوفرة')
            error.statusCode = 404 ; 
            throw error ;
        }
        const opinion = await Opinion.create({authorId,categoryId,description,title,image:req.file.filename,headLine})
        res.status(201).json({opinion,message:"تم إضافة الرأي"})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.editOpinion = async(req,res,next)=>
{
    try{
        const {authorId,categoryId} = req.body
        const {opinionId} = req.params
        const category = await Category.findByPk(categoryId)
        const author = await Author.findByPk(authorId)
        if(!category || !author)
        {
            const error = new Error('المؤلف أو الفئة غير متوفرة')
            error.statusCode = 404 ; 
            throw error ;
        }
        const opinion = await Opinion.findByPk(opinionId)
        if(!opinion)
        {
            const error = new Error('الرأي غير متوفر')
            error.statusCode = 404 ; 
            throw error ;
        }
        if(req.file)
        {
            clearImage(opinion.image)
            await opinion.update({image:req.file.filename})
        }
        await opinion.update(req.body)
        res.status(201).json({opinion,message:"تم تعديل الرأي"})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.deleteOpinion = async(req,res,next)=>
{
    try{
        const {opinionId} = req.params
        const opinion = await Opinion.findByPk(opinionId)
        if(!opinion)
        {
            const error = new Error('الرأي غير متوفر') ;
            error.statusCode = 404 ;
            throw error ; 
        }
        clearImage(opinion.image)
        await opinion.destroy()
        res.status(201).json({message:"تم حذف الرأي بنجاح"})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** limit 8 with paginaition */
exports.getAllOpinions = async(req,res,next)=>
{
    try{
        const PAGE_SIZE = 8 ;
        const page = req.query.page || 1
        const offset = (page - 1) * PAGE_SIZE;
        const opinions = await Opinion.findAll(
            {limit:PAGE_SIZE,offset,order:[['createdAt','DESC']],
            include:[{model:Author,attributes:['id','name','image']},{model:Category,attributes:['id','title']}],
            attributes:['id','title','description','image']}
        )
        const count = await Opinion.count();
        const totalPages = Math.ceil(count / PAGE_SIZE); 
        res.status(200).json({opinions,totalPages})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** limit 8 */
exports.getLastOpinions = async(req,res,next)=>
{
    try{
        const opinions = await Opinion.findAll(
            {attributes:['id','title'],include:[{model:Author,attributes:['name','id','image']}],
            limit:8,order:[['createdAt',"DESC"]]}
        )
        res.status(200).json({opinions})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getSingleOpinion = async(req,res,next)=>
{
    try{
        const {opinionId} = req.params
        const opinion = await Opinion.findOne({where:{id:opinionId},attributes:{exclude:['authorId','categoryId']}
                ,include:[{model:Author,attributes:['name','id','image']},{model:Category,attributes:['title','id']}]})
        if(!opinion)
        {
            const error = new Error('الرأي غير متوفر')
            error.statusCode = 404 ; 
            throw error ; 
        }
        res.status(200).json({opinion})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get opinions by cateogry and limit to 8 */
exports.getCateogiresWithOpinion = async(req,res,next)=>
{
    try{
        const OPINION_LIMIT = 8 ;
        const categories = await Category.findAll({attributes:["id","title"],
        include:[{model:Opinion,limit:OPINION_LIMIT,order:[["createdAt","DESC"]],attributes:["id","title","authorId"],include:[{model:Author,attributes:["id","name","image"]}]}]})
        res.status(200).json({categories})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get opinions by cateogry and limit 16 pagination */
exports.getOpinionByCategory = async(req,res,next)=>
{
    try{
        const {categoryId} = req.params
        const page = req.query.page || 1
        const LIMIT_SIZE = 16
        const offset = (page - 1) * LIMIT_SIZE;
        const category = await Category.findByPk(categoryId)
        if(!category)
        {
            const error = new Error('الفئة غير متواجدة')
            error.statusCode = 404 ; 
            throw error ; 
        }
        const opinions = await Opinion.findAll({where:{categoryId:categoryId},limit:LIMIT_SIZE,offset,
            attributes:["title","id"],order:[["createdAt","DESC"]],include:[{model:Author,attributes:['id','name']}]});
        const count = await Opinion.count();
        const totalPages = Math.ceil(count / LIMIT_SIZE); 
        res.status(200).json({opinions , title:category.title , totalPages})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

const clearImage = (filePath)=>{
    filePath = path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}