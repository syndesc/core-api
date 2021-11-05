import { server } from './app';
import dotenv from 'dotenv';
import './ws';

dotenv.config();

const port = process.env.PORT || 3333;
server.listen(port, () => console.log('Server running'));
