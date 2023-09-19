const { Sequelize } = require("sequelize");
const { Video } = require("../model");

/** add video */
module.exports.createVideo =async(req,res,next) => {
    const {title , url} = req.body;
    try{
        if(!title || !url){
            const error = new Error ('البيانات المرسلة غير كاملة');
            error.statusCode = 422;
            throw error;
        }
        const newVideo = await Video.create({
            title:title.trim(),
            url, 
        });
        await newVideo.save();
        res.status(201).json({message:"تم انشاء الفيديو بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** delete video */
module.exports.deleteVideo = async (req,res,next) => {
    const {videoId} = req.params;
    try{
        await Video.destroy({
            where: {
                id: videoId,
            },
        });
        res.status(201).json({message:"تم حذف الفيديو بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get all videos - limit 8 paginaition */
module.exports.getAllVideos =async (req,res,next) => {
    try{
        const PAGE_SIZE = +req.query.size || 8;
        const page = req.query.page || 1;
        const offset = (page - 1) * PAGE_SIZE;
        const videos = await Video.findAll({
        limit: PAGE_SIZE,
        offset,
        order: [['createdAt', 'DESC']],
        }); 
        const count = await Video.count();
        const totalPages = Math.ceil(count / PAGE_SIZE);  
        res.status(200).json({videos,totalPages});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

/** get single video */
module.exports.getSingleVideo = async(req,res,next) => {
    const {videoId}  = req.params;
    try{
        const video = await Video.findOne({where:{id:videoId}});
        if(!video){
            const error = new Error ('عذرا الفيديو غير موجود');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({video});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }

}

/** get random videos limit 8 */
module.exports.getRandomVideos = async(req,res,next) => {
    try{
        const videos = await Video.findAll({
            order: Sequelize.literal('rand()'),
            limit: 8,
        });
        res.status(200).json({videos});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}