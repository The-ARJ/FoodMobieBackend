const multer = require('multer')
const path = require('path')
const { off } = require('process')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) =>{
        let ext = path.extname(file.originalname)
        cb(null,`${file.fieldname}--${Date.now()}${ext}`)
    }
})

const imageFileFilter = (res,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('File format not supported'),false)
    }
    cb(null,true)
}

const upload = multer({ storage: storage,
fileFilter:imageFileFilter 
})


module.exports = upload