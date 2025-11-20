'use strict'

const multer = require('multer');

class Multer{
    constructor(fileTypes, maxSize = 20, dest="/"){
        this.maxSize = maxSize*1024*1024;
        this.fileTypes = fileTypes.map(type => type.toLowerCase()); // Normalize to lowercase
        this.dest = dest;

        this.fileFilter = (req, file, cb) => {
            const fileMimeType = file.mimetype.toLowerCase(); // Normalize to lowercase
            console.log("File mimetype (original):", file.mimetype);
            console.log("File mimetype (normalized):", fileMimeType);
            console.log("Allowed types:", this.fileTypes);
            console.log("File size:", file.size);
            console.log("File original name:", file.originalname);
            
            if(this.fileTypes.includes(fileMimeType)){
                console.log("✓ File type accepted");
                cb(null, true);
            }
            else{
                console.log("✗ File type rejected");
                const invalidFileErr = new Error(`Invalid file '${file.originalname}' of type ${file.mimetype}. Allowed types are: ${this.fileTypes.join(', ')}`);
                cb(invalidFileErr, false);
            }
        }

    }
    get upload(){
        return multer({
           storage: multer.diskStorage({
              destination: (req, file, cb) =>{
                  cb(null, "public/" + this.dest);
              },
              filename: (req, file, cb) => {
                  let fileName = file.originalname.replace(/[^a-zA-Z0-9.]/g,'_');
                  const newFileName = Date.now().toString() + '-' + fileName;
                  cb(null, newFileName);
              }
           }),
           fileFilter: this.fileFilter,
           limits: {
               fileSize: this.maxSize
           }             
        })
    }
}

module.exports = {Multer};
