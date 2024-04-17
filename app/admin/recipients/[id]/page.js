import { getRecipient } from "@/lib/mongo/recipients";
import { accentColor } from "@/utilities/theme";
import { EditForm } from "@/components/forms/editForm";
import style from '@/app/admin/admin.module.css';
import Link from "next/link";
import {Button} from '@chakra-ui/react';
export default async function EditRecipient({params}) {
  const {id} = params;
  const profileLink = `/recipients/${id}`
  const response = await getRecipient(id);
    //this is to serialize the data so that it can be passed as props
  const recipient = JSON.parse(JSON.stringify(response));


  return (
    <div>
      <Link className="text-center block mb-4" href={profileLink}><Button size='lg'  bgColor={accentColor}>View Profile</Button></Link>
            <EditForm recipient={recipient} />

    </div>
  );
}