const fs = require('fs');

module.exports = async(req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        console.log(file);
        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:'File size is too big.'});
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

// Function to remove temp files
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if(err) {
            console.log(err);
        }
    });
}