"use client";
import Image from "next/image";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import style from "./card.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultProfile } from "@/utilities/defaults";
import { useEffect, useState } from "react";
export default function RecipientCard({ previous, recipient, next }) {
  //const [previous, setPrevious] = useState('');
  const router = useRouter();
  const params = useSearchParams();

  const { data: session } = useSession();
  // useEffect(() => {
  //     console.log(params.get('previous'), 'params')
  //     if (params.get('previous')) {
  //         setPrevious(params.get('previous'))
  //     }
  // }, [params])

  const imageUrl = recipient.profileImage
    ? recipient.profileImage.src
    : defaultProfile;

  return (
    <div className="z-20">

      <div className={style.recipientView}>
        <div className={style.info}>
          <h2 className="text-4xl mb-2">{recipient.name}</h2>
          {recipient.parents && (
            <p className="text-lg"> My Parents: {recipient.parents}</p>
          )}
          {session && (
            <>
              {recipient.email && (
                <p>
                  {" "}
                  <EmailIcon /> {recipient.email}
                </p>
              )}
              {recipient.phone && (
                <p>
                  <PhoneIcon /> {recipient.phone}
                </p>
              )}
              {recipient.address && (
                <>
                  <p> {recipient.address?.street}</p>
                  <p>
                    {" "}
                    {recipient.address?.city} {recipient.address?.state}{" "}
                    {recipient.address?.zip}
                  </p>
                </>
              )}
            </>
          )}
          <hr className="my-2"></hr>

          <p>Graduated Highschool in {recipient.graduationYear}</p>
          <p> Attending {recipient.college}</p>
          <p> Studying {recipient.major}</p>
          <hr className="my-2"></hr>
          <h2 className="mt-3 text-lg">About Me</h2>
          <p className="p-4 border rounded-xl my-3">{recipient.bio}</p>
          {session && (
            <p className="text-lg font-bold">
              Amount Received: $ {recipient?.amountReceived || "0.00"}
            </p>
          )}
        </div>
        <Image src={imageUrl} height={350} width={350} alt={recipient.name} />
      </div>
      <div className="flex justify-between">
        {previous && (
          <button
            className="bg-neutral-800 hover:bg-slate-100 hover:text-zinc-900 text-xl text-white font-bold py-2 px-4 mx-2 rounded-lg"
            onClick={() => router.push(`/recipients/${previous._id}`)}
          >
            Previous
          </button>
        )}
        {next && (
          <button
            className="bg-neutral-800 hover:bg-slate-100 hover:text-zinc-900 text-xl text-white font-bold py-2 px-4 rounded-lg mx-2"
            onClick={() =>
              router.push(`/recipients/${next._id}`)
            }
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
