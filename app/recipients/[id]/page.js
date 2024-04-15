import { getRecipient } from "@/lib/mongo/recipients";
import RecipientCard from "@/Components/Cards/recipientCard";
import { Hero } from "@/Components/Heros/hero";
import { Footer } from "@/Components/Footers/footer";
import { getProxyImages } from "@/app/actions";
import { TransparentHeader } from "@/Components/Headers/transparentHeader";

export default async function RecipientSinglePage({params}){
    const recipientId = params;
    const recipientUnserialized = await getRecipient(recipientId.id);
    const recipient = JSON.parse(JSON.stringify(recipientUnserialized));
    
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
