import mongoose from "mongoose";
import { User} from "../models/user";
import * as dotenv from 'dotenv';
dotenv.config();

export const mongoconnect = {
    connectDB: function(){
        //check what env dev want to devploy
        var URL = <string> process.env.MongoURL;
        switch (process.env.ENV) {
            case 'DEVELOPMENT':
                mongoose.connect(URL, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Dev');
                });
                break;
            case 'PRODUCTION':
                mongoose.connect(URL, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Production');
                });;
                break;
            default:
                throw new Error('Unknow execution environment: ');
        }
        //intial create first User in User Collection
        User.find(function (err, users) {
            if (users.length) return;
            new User({
                email: 'admin@gmail.com',
                password: 'admin',
                fullName: 'administrator',
            }).save(function (err) {
                if (err) throw err;
                console.log('First user successfully saved.');
            });
        })
    }
}
