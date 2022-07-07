import mongoose from "mongoose";
import { ENV, MongoURL } from '../secrets/secret'

export const mongoConnect = {
    connectDB: function(){
        var URL = <string> MongoURL;
        switch(ENV){
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
    }
}