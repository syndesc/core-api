import sendEmail from '../../resources/sendEmail';
import translate from '../../resources/translate';
import { Request, Response } from 'express';
import Utils from '../../resources/Utils';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default class UserController {
    public static async create(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, username, email, password } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.send({
                    success: false,
                    message: 'This email already exist!',
                    errCode: 4
                });
            }
            const tag = Utils.tag();
            const hash = await Utils.encrypt(password);
            const user = await User.create({ firstName, lastName, password: hash, tag, username, email });
            await sendEmail({
                to: email,
                subject: translate(req.lang, 3),
                data: {
                    title: translate(req.lang, 4),
                    content: translate(req.lang, 5),
                    token: Utils.token(user.id, true),
                    base_url: process.env.BASE_URL
                },
                template: 'verify'
            });
            return res.send({
                success: true
            });
        } catch (e) {
            console.log(e);
            return res.send({
                success: false,
                message: translate(req.lang, 8)
            });
        }
    }
    public static async verification(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        const { token } = req.params;
        try {
            if (!token) {
                return res.send({
                    success: false,
                    message: translate(req.lang, 0)
                });
            }
            const secret = process.env.SECRET as string;
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) return res.send({
                    success: false,
                    message: translate(req.lang, 2)
                });
                if (!decoded) return res.send({
                    success: false,
                    message: translate(req.lang, 2)
                });
                const user = await User.findById(decoded.id);
                if (!user) return res.send({
                    success: false,
                    message: translate(req.lang, 6)
                });
                user.confirmed = true;
                await user.save();
                return res.send({
                    success: true
                });
            });
        } catch (e) {
            return res.send({
                success: false,
                message: translate(req.lang, 8)
            });
        }
    }
    public static async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.send({
                success: false,
                message: translate(req.lang, 6)
            });
            if (!await Utils.test(password, user.password)) {
                return res.send({
                    success: false,
                    message: translate(req.lang, 7)
                });
            }
            return res.send({
                success: true,
                token: Utils.token(user.id)
            });
        } catch (e) {
            return res.send({
                success: false,
                message: translate(req.lang, 8),
                errCode: 3
            });
        }
    }
    public static async index(req: Request, res: Response): Promise<Response> {
        const { userId } = req;
        try {
            const user = await User.findById(userId);
            if (!user) return res.send({
                success: false,
                message: translate(req.lang, 6)
            });
            return res.send({
                success: true,
                user
            });
        } catch (e) {
            return res.send({
                success: false,
                message: translate(req.lang, 8),
                errCode: 3
            });
        }
    }
    public static async changeProfile(req: Request, res: Response): Promise<Response> {
        const { userId } = req;
        if(!req.file) return res.send({
            success: false,
            message: translate(req.lang, 9)
        });
        try {
            const user = await User.findById(userId);
            if (!user) return res.send({
                success: false,
                message: translate(req.lang, 6)
            });
            if(user.profile !== 'default.png') {
                await fs.unlink(path.resolve(__dirname, '..', '..', '..', 'uploads', 'public', req.file.filename));
            }
            user.profile = req.file.filename;
            await user.save();
            return res.send({
                success: true
            });
        } catch (e) {
            return res.send({
                success: false,
                message: translate(req.lang, 8),
                errCode: 3
            });
        }
    }
}
