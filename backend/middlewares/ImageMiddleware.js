const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/Images");
    },
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});

const categoryUploadMiddleware = (req, res, next) => {
    upload.single("categoryImage")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: "File upload error" });
        } else if (err) {
            console.error(err);
            return res.status(500).json({ message: "Unknown error" });
        }
        next();
    });
};


const productUploadMiddleware = (req, res, next) => {
    upload.single("productImage")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: "File upload error" });
        } else if (err) {
            console.error(err);
            return res.status(500).json({ message: "Unknown error" });
        }
        next();
    });
};

module.exports = { categoryUploadMiddleware, productUploadMiddleware };