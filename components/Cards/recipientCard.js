'use client'
import Image from 'next/image'
import style from '@/components/Cards/card.module.css';
import { useState, useEffect } from 'react';
export default function RecipientCard ({recipient}) {
    
    const imageUrl = recipient.profileImage ? recipient.profileImage.src : "/images/nayla.jpeg";

    return (
        <div className={style.recipientView}>
                    <div className={style.info}>
                    <p className="text-3xl">{recipient.name}</p>
                    <p> Parents:  {recipient.parents}</p>
                    <p> {recipient.email}</p>
                    <p> {recipient.phone}</p>
                    {recipient.address && 
                    <>
                    <p> {recipient.address?.street}</p>
                    <p> {recipient.address?.city} {recipient.address?.state} {recipient.address?.zip}</p>
                    </> 
                
                    }
                    <p> {recipient.graduationYear}</p>
                    <p> Attending {recipient.college}</p>
                    <p> Studying {recipient.major}</p>
                    <p> Bio: {recipient.bio}</p>
                    <p>Amount Received: {recipient?.amountReceived}</p>
                    </div>
                    <Image src={imageUrl} height={250} width={250} alt={recipient.name} />
                </div>
    )
}