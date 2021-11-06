import UserController from '../controllers/UserController';
import { v4 as uuid } from 'uuid';
import auth from '../middlewares/auth';
import { Router } from 'express';
import multer from 'multer';
import User from '../models/User';

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(req.headers.isPulic){
            callback(null, 'uploads/public/');
            return;
        }
        callback(null, 'uploads/private');
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const filename = `${uuid()}.${ext}`;
        callback(null, filename);
    }
});

const upload = multer({ storage });

route.get('/verify/:token', UserController.verification);
route.post('/create', UserController.create);
route.post('/login', UserController.login);
route.post('/profile', auth, upload.single('image'), UserController.changeProfile);
route.get('/', auth, UserController.index);

export default route;
