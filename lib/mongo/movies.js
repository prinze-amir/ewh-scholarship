import clientPromise from "./index";
let collection;
 async function connectToDatabase() {
    if (!collection) {
        const client = await clientPromise;
        collection = await client.db('sample_mflix').collection("movies");
    }
    return collection;
}

const getMovies =  async ()=> {
    const collection = await connectToDatabase();
    const movies = await collection.find({}).toArray();
    return movies;
}

export { getMovies };
