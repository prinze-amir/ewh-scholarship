import Image from "next/image"
import { getRecipient } from "@/lib/mongo/recipients";
import style from './single.module.css'
import RecipientCard from "@/Components/Cards/recipientCard";
import { Hero } from "@/Components/Heros/hero";
import { Footer } from "@/Components/Footers/footer";
import { TransparentHeader } from "@/Components/Headers/transparentHeader";
export default async function RecipientSinglePage({params}){
    const recipientId = params;
    
    const recipientUnserialized = await getRecipient(recipientId.id);
    const recipient = JSON.parse(JSON.stringify(recipientUnserialized));
    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

    const profileImage = recipient.profileImage ? recipient.profileImage.src : defaultProfile;
    const proxyImage = 'http://localhost:1105/api/proxy?'+profileImage;
    const backgroundImages = "bg-[url('" + proxyImage +"')] ";
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

           <div className="flex mx-4 justify-center my-20 ">
                <RecipientCard recipient={recipient}/>
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
