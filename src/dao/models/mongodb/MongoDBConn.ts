import { MongoClient } from 'mongodb';

let connection:MongoClient = null;
let mongoURI = process.env.MONGO_URI || 'mongodb+srv://Ghost1998:Edwardcruz1998@ghosthnd.8vhbmph.mongodb.net/test';
let mongoDBName = process.env.MONGO_DB_NAME || 'sw2024';

export const getConnection = async ()=> {
  if( !connection){
    connection = await MongoClient.connect(mongoURI);
  }
  return connection.db(mongoDBName);
}
  