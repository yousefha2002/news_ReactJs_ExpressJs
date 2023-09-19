const { New, Category } = require("../model");
const fs = require('fs');
const path = require('path');
const { Sequelize } = require("sequelize");



/** add new */
module.exports.createNew = async(req,res,next) => {
    const {title , description , categoryId} = req.body;
    try{
        if(!title || !description || !categoryId){
            const error = new Error ('البيانات المرسلة غير كاملة');
            error.statusCode = 422;
            throw error;
        }
        if(!req.file){
            const error = new Error ('الرجاء تحميل صورة');
            error.statusCode = 422;
            throw error;
        }
        const newNews = await New.create({
            title:title.trim(),
            description, 
            categoryId,
            image:req.file.filename
        });
        await newNews.save();
        res.status(201).json({message:"تم انشاء الخبر بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** delete new */
module.exports.deleteNew = async(req,res,next) => {
    const {newId} = req.params;
    try{
        const foundNew = await New.findOne({where:{id:newId}});
        if(!foundNew){
            const error = new Error ('عذرا الخبر غير موجود');
            error.statusCode = 422;
            throw error;
        }
        clearImage(foundNew.image);
        await foundNew.destroy();
        res.status(201).json({message:"تم حذف الخبر بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** edit new */
module.exports.updateNew = async(req,res,next) => {
    const {title , description , categoryId} = req.body;
    const {newId} = req.params;
    try{
        if(!title || !description || !categoryId){
            const error = new Error ('البيانات المرسلة غير كاملة');
            error.statusCode = 422;
            throw error;
        }
        const foundNew = await New.findOne({where:{id:newId}})
        if(!foundNew){
            const error = new Error ('عذرا الخبر غير موجود');
            error.statusCode = 422;
            throw error;
        }
        foundNew.description = description;
        foundNew.title = title;
        foundNew.categoryId = categoryId;
        if(req.file){
            clearImage(foundNew.image)
            foundNew.image = req.file.filename;
        }
        await foundNew.save();
        res.status(201).json({message:"تم تعديل الخبر بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get news - limit 12 paginaition */
module.exports.getNewsWithPaginaition = async(req,res,next) => {
    try{
        const PAGE_SIZE = 12;
        const page = req.query.page || 1;
        const offset = (page - 1) * PAGE_SIZE;
        const news = await New.findAll({
        limit: PAGE_SIZE,
        offset,
        order: [['createdAt', 'DESC']],
        include:[
            {
                model:Category,
                attributes: ['id', 'title'], // specify the attributes to retrieve
            }
        ]
        }); 
        const count = await New.count();
        const totalPages = Math.ceil(count / PAGE_SIZE); 
        res.status(200).json({news,totalPages});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get random selected news limit 9 */
module.exports.getRandomNews = async(req,res,next) => {
    try{
        const news = await New.findAll({
            order: Sequelize.literal('rand()'),
            limit: 9,
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title'], // specify the attributes to retrieve
                }
            ]
        });
        res.status(200).json({news});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get last news limit 6 */
module.exports.lastNews = async (req,res,next) => {
    try{
        const news = await New.findAll({
            order: [['createdAt', 'DESC']],
            limit: 6,
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title']
                }
            ]
        });
        res.status(200).json({news});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }

}

/** get most viewd news limit 6 */
module.exports.getMostViewsNews = async(req,res,next) => {
    try{
        const news = await New.findAll({
            order: [['views', 'DESC']],
            limit: 6,
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title'],
                }
            ]
        });
        res.status(200).json({news});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get single new for user*/
module.exports.getSingleNewForUser = async (req,res,next) =>{
    const {newId} = req.params;
    try{
        const news = await New.findOne({where:{id:newId}});
        if(!news){
            const error = new Error ('عذرا الخبر غير موجود');
            error.statusCode = 422;
            throw error;
        }
        news.views += 1;
        await news.save();
        const foundNew = await New.findOne({
            where:{id:newId},
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title']
                }
            ]
        })
        res.status(200).json({new:foundNew});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get single new for admin*/
module.exports.getSingleNewForAdmin = async (req,res,next) =>{
    const {newId} = req.params;
    try{
        const foundNew = await New.findOne({
            where:{id:newId},
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title']
                }
            ]
        })
        if(!foundNew){
            const error = new Error ('عذرا الخبر غير موجود');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({new:foundNew});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get news by categories - limit 12 pagination */
module.exports.getNewsByCategoryWithPaginaition = async(req,res,next) => {
    const {categoryId} = req.params;
    try{
        const PAGE_SIZE = 12;
        const page = req.query.page || 1;
        const offset = (page - 1) * PAGE_SIZE;
        const news = await New.findAll({
            where:{
                categoryId:categoryId
            },
            limit: PAGE_SIZE,
            offset,
            order: [['createdAt', 'DESC']],
            include:[
                {
                    model:Category,
                    attributes: ['id', 'title'], // specify the attributes to retrieve
                }
            ]
        });  
        const count = await New.count({where:{categoryId:categoryId}});
        const totalPages = Math.ceil(count / PAGE_SIZE); 
        const category = await Category.findOne({where:{id:categoryId}});
        res.status(200).json({news , totalPages , category});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}