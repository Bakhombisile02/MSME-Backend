'use strict'
const fs = require('fs');


module.exports =  {
  uploadFile,
  uploadMultipleFiles,
  // updateFileUrl
}


async function uploadFile(req, res, next) {
   console.log("Testing Text ",req.file);
  if (!req.file) {
    console.log('no file uploaded');
    return res.status(500).json({ message: 'internal server error' });
  }
  // if (fs.existsSync(req.file.path)) {
  //   fs.unlinkSync(req.file.path);
  //   console.log('existing file deleted');
  // }
  const size = req.file.size / 1024;
  console.log("Testing Text ",req.file);
  // console.log("file Name ", req.file.filename);
  // console.log("file Path ",req.file.path)
  // res.data = {
  //   message: 'successfully uploaded',
  //   url: _config.APP_URL + req.file.path.substring(7),
  //   size: size.toFixed(0) + 'kb',
  //   originalFilename:req.file.originalname,
  // };

  res.status(201).json({
    message: 'successfully uploaded',
    url: req.file.path.substring(7),
    size: size.toFixed(0) + 'kb',
    originalFilename:req.file.originalname,});
  // return next();
};
  
  async function uploadMultipleFiles(req, res, next) {
    try {
        if (!req.files || req.files.length === 0) {
            throw new Error("No files were uploaded");
        }

        if (req.files.length > 20) {
            throw new Error("You can only upload up to 20 files at once");
        }

        let uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            let fileUrl = _config.APP_URL + req.files[i].path.substring(7);
            uploadedFiles.push(  fileUrl );
        }

        res.data = { message: "Successfully uploaded", urls: uploadedFiles };
        return next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

