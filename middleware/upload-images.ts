import multer from 'multer';
import { Request } from 'express';
import { AppError } from '../modules/common/errors';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const ext = file.originalname.split('.').pop()?.toLowerCase();
  if (ext && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only jpg, jpeg, png, gif are allowed.', 400), false);
  }
}

export const files: string[] = []

const multerStorage = multer.diskStorage({
  destination: (_: Request, file: Express.Multer.File, cb: any) => {
    cb(null, './public/images/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    const ext = file.originalname.split('.').pop()?.toLowerCase()
    const uniqueSuffix = Date.now().toString() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`
    files.push(filename)
    req.body.media = files
    cb(null, filename)
  }
})

export const uploadImages = multer({ storage: multerStorage, 
    fileFilter: multerFilter
 })