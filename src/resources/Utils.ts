import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export default class Utils {
    public static async encrypt(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    public static async test(password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash);
        return result;
    }
    public static token(id: string, fastExpire = false): string {
        const secret = process.env.SECRET as string;
        return jwt.sign({ id }, secret, {
            expiresIn: fastExpire ? (1 * 60 * 60) : (12 * 60 * 60)
        });
    }
}
