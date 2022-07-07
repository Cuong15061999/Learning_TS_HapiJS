import * as dotenv from "dotenv";

dotenv.config();

export const ENV: string = process.env.ENV || 'DEVELOPMENT';
export const MongoURL: string | undefined = process.env.MongoURL || undefined;
export const EMAIL: string | undefined = process.env.EMAIL_USERNAME || undefined;
export const PASSWORD: string | undefined = process.env.EMAIL_APP_PASSWORD || undefined;
