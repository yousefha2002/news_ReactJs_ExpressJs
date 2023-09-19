const { SocialMedia } = require("../model");

module.exports.createSocialMedia = async (req,res,next) => {
    const {Link} = req.body;
    try{
        const socialMedia = await SocialMedia.create({Link});
        res.status(201).json({message:"تم انشاء الرابط بنجاح"});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
} 

module.exports.getSocialMedia = async (req,res,next) => {
    try{
        const social = await SocialMedia.findAll({
            attributes:["id","Link"]
        });
        res.status(200).json({social});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.deleteSocial = async (req,res,next) => {
    try{
        const {socialId} = req.params
        const social = await SocialMedia.findByPk(socialId)
        if(!social)
        {
            const error = new Error('الرابط غير متوفر') ;
            error.statusCode = 404 ;
            throw error ; 
        }
        await social.destroy()
        res.status(201).json({message:"تم حذف الرابط بنجاح"})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}