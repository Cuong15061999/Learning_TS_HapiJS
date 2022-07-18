import * as mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';
 
let mockMongoose: MockMongoose = new MockMongoose(mongoose);
 
mockMongoose.prepareStorage().then(() => {
    mongoose.connect('mongodb+srv://phamvqcuong99:Quoccuong_999@cluster0.7qnaw.mongodb.net/testmock');
    mongoose.connection.on('connected', () => {  
      console.log('db connection is now open');
    }); 
});