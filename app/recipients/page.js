'use client';
import { getMovies } from "../../lib/mongo/movies";
import { useState, useEffect } from 'react';

export default function RecipientsPage(){

    const [movies, setMovies] = useState(null);    

    useEffect(() => {
        async function loadMovies() {
            const newMovies = await getMovies();
            setMovies(newMovies);
        }
        loadMovies();
    }, [])

    if (!movies) {
        return (
            <h1>No movies to display</h1>
        )
    }

    return (
        <div>
            <h1>Recipients</h1>
       
        </div>
    );
}
