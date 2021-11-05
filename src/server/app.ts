import express, { Application } from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';

dotenv.config();

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.database();
        this.routes();
    }
    private middlewares(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }
    private database(): void {
        const mongourl = (process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : process.env.MONGO_URL_DEV) as string;
        mongoose.connect(mongourl);
    }
    private routes(): void {
        //
    }
}

const app = new App().app;
const server = http.createServer(app);
const io = new Server(server);

export { server, io };
