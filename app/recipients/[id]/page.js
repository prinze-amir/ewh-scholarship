import { getRecipient } from "@/lib/mongo/recipients";
import RecipientCard from "@/components/Cards/recipientCard";
import { Hero } from "@/components/Heros/hero";
import { Footer } from "@/components/Footers/footer";
import { getProxyImages, getNextRecipient } from "@/app/actions";
import { TransparentHeader } from "@/components/Headers/transparentHeader";
import { ThemeButton } from "@/components/Buttons/themeButton";
import { getServerSession } from "next-auth";
export default async function RecipientSinglePage({params}){
    const recipientId = params;
    const session = await getServerSession();
    const recipient = await getRecipient(recipientId.id);

    const {next, previous} = await getNextRecipient(recipientId.id);
   
    const profileImage = recipient.profileImage ? recipient.profileImage.src : null;

    const proxyImage = await getProxyImages(profileImage);
    
    return (
        <>
        <div className="bg-black opacity-50 w-[100%] h-[100%] absolute"></div>

        <div className='bg-cover bg-center bg-no-repeat bg-fixed bg-slate-900' style={{backgroundImage: `url("${proxyImage}")`}}>
            <TransparentHeader />

           <Hero 
           title={recipient.name}       
           image={''}
           height={'45vh'}
           top={true}
           noOverlay={true} 
           />
       {session && <div className="flex justify-center my-5 ">
                    <ThemeButton text={'Edit Recipient'} theme='dark' link={'/admin/recipients/'+recipientId.id} />

        </div>}


           <div className="flex flex-col gap-2 mx-4 items-center ">
                <RecipientCard recipient={recipient} next={next} previous={previous} />
                
           </div>
           <Hero 
           title={recipient.college}
           subtitle={'Studying '+recipient.major}       
           image={''}
           height={'35vh'} 
           noOverlay={true}
           />
           <Footer />

        </div>
        </>
        
    );
}
