const {Video , New , Opinion , Author} = require('../model');

module.exports.getAllStatistics = async(req,res,next) => {
    try{
        const authors = await Author.count();
        const videos = await Video.count();
        const opinions = await Opinion.count();
        const news = await New.count();
        res.status(200).json({authors,videos,opinions,news});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}