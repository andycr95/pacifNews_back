import express from 'express'
import multer from 'multer'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        upload(req,res,function(err) {
            if(err) {
                res.send(err)
            }
            else {
                res.status(200).json({
                    message: 'File uploaded successfully',
                    filename: `https://pacific-news-back.herokuapp.com/${req.file!.filename}`
                });
            }
        })
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});



var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, __dirname+"/../../uploads")
    },
    filename: function (_req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
var upload = multer({storage: storage}).single("image"); 

export default router;
