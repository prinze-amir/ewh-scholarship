'use client';
// import { getMovies } from "../../lib/mongo/movies";
import { useState, useEffect } from 'react';
import { Recipient } from '@/components/recipient';

export default function RecipientsPage(){

    const [recipients, setRecipient] = useState(null);    

   

    // if (!recipients) {
    //     return (
    //         <h1>No recipients to display</h1>
    //     )
    // }

    return (
        <div>
            <h1>Recipients</h1>
            <Recipient />
       
        </div>
    );
}
