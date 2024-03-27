import { getRecipient } from "@/lib/mongo/recipients";
import { EditForm } from "@/components/Forms/editForm";
import style from '@/app/admin/admin.module.css';
export default async function EditRecipient({params}) {
  const {id} = params;

  const response = await getRecipient(id);
    //this is to serialize the data so that it can be passed as props
  const recipient = JSON.parse(JSON.stringify(response));


  return (
    <div className={style.adminContiainer}>
            <EditForm recipient={recipient} />
    </div>
  );
}