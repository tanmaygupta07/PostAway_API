import multer from "multer";


//middleware to upload a file using multer
const storage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, './images');
    },
    filename: (req, file, next) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        next(null, `${timestamp} - ${file.originalname}`);
    }
});

export const upload = multer({ storage: storage });