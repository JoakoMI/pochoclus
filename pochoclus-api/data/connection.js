import "dotenv/config";
import { MongoClient } from "mongodb";
import movieJSON from '../movie.json' assert { type: "json" };

const uri = process.env.CONNECTION_STRING;
const api_key = process.env.BEARER;

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
    if (instance == null) {
        try {
            instance = await client.connect();

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${api_key}`
                }
            }
            movieJSON.forEach(async movie => {
                await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie.movie}&include_adult=false&language=es-ES&page=1&year=${movie.year}`, options)
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
            });
            
        } catch (error) {
            console.log(error.message);
        }
    }
    return instance;
}