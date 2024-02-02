import { MongoClient, ServerApiVersion } from 'mongodb';

const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const cluster = process.env.DATABASE_CLUSTER;
console.log(dbUser, 'password', dbPassword);
const uri = `mongodb+srv://${dbUser}:$${dbPassword}@atlascluster.${cluster}.mongodb.net/?retryWrites=true&w=majority`;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the database connection
  // is maintained during hot reloading
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
