import multer from 'multer';
import path from 'path';

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../../assets/images')); // Adjust the path as needed
  },
  filename: function (req, file, cb) {
    // You can include logic here to customize file names
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (
    path.extname(file.originalname).toLowerCase() === '.jpeg' ||
    path.extname(file.originalname).toLowerCase() === '.jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false); // Reject the file
  }
};
export const upload = multer({ storage, fileFilter });
