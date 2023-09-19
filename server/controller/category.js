const { New  , Opinion} = require('../model');
const Category = require('../model/Category');


/** add category */
module.exports.createCategory = async(req,res,next) => {
    const {title} = req.body;
    try{
        const category = await Category.findOne({where:{title:title.trim()}});
        if(category){
            const error = new Error ('القسم موجود مسبقا');
            error.statusCode = 403;
            throw error;
        }
        const newCategory = await Category.create({
            title:title.trim(),
        });
        await newCategory.save()
        res.status(201).json({message:'تم انشاء القسم بنجاح'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** edit category */
module.exports.editCategory = async(req,res,next) => {
    const {title} = req.body;
    const {categoryId} = req.params;
    try{
        const category = await Category.findOne({where:{id:categoryId}});
        if(!category){
            const error = new Error ('القسم غير موجود');
            error.statusCode = 403;
            throw error;
        }
        const foundCategory = await Category.findOne({where:{title:title.trim()}});
        if(foundCategory && foundCategory.id !== category.id){
            const error = new Error ('القسم موجود مسبقا');
            error.statusCode = 403;
            throw error;
        }
        category.title = title.trim();
        await category.save()
        res.status(201).json({message:'تم تعديل القسم بنجاح'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get all categories */
module.exports.getAllCategories = async(req,res,next) => {
    try{
        const categories = await Category.findAll({
            include:[
                {
                    model:New,
                    attributes: ['id', 'title']
                },
                {
                    model:Opinion,
                    attributes: ['id', 'title']
                }
            ]
        })
        res.status(200).json({categories});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getSingleCategory = async(req,res,next) => {
    const {categoryId} = req.params;
    try{
        const category = await Category.findOne({
            where:{id:categoryId}
        })
        res.status(200).json({category});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}