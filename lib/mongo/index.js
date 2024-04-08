import { MongoClient, ServerApiVersion } from 'mongodb';
 const mongo_uri = process.env.MONGO_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!mongo_uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the database connection
  // is maintained during hot reloading
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongo_uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(mongo_uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
