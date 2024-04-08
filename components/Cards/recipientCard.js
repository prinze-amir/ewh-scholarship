'use client'
import Image from 'next/image';
import {PhoneIcon, EmailIcon}  from '@chakra-ui/icons';
import style from './card.module.css';
export default function RecipientCard ({recipient}) {

    const imageUrl = recipient.profileImage ? recipient.profileImage.src : "/images/nayla.jpeg";

    return (
        <div className={style.recipientView}>
                    <div className={style.info}>
                    <h2 className="text-4xl mb-2">{recipient.name}</h2>
                    {recipient.parents && <p className='text-lg'> My Parents:  {recipient.parents}</p>}
                    
                   {recipient.email && <p> <EmailIcon/> {recipient.email}</p>}
                    {recipient.phone && <p><PhoneIcon/> {recipient.phone}</p>}
                    {recipient.address && 
                    <>
                    <p> {recipient.address?.street}</p>
                    <p> {recipient.address?.city} {recipient.address?.state} {recipient.address?.zip}</p>
                    </> 
                
                    }
                    <hr className='my-2'></hr>

                    <p>Graduated Highschool in {recipient.graduationYear}</p>
                    <p> Attending {recipient.college}</p>
                    <p> Studying {recipient.major}</p>
                    <hr className='my-2'></hr>
                    <h2 className="mt-3 text-lg">About Me</h2>
                    <p className='p-4 border rounded-xl my-3'>{recipient.bio}</p>
                    <p className="text-lg font-bold">Amount Received: $ {recipient?.amountReceived || '0.00'}</p>
                    </div>
                    <Image src={imageUrl} height={350} width={350} alt={recipient.name} />
                </div>
    )
}