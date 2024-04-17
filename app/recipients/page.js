import { Recipients } from '@/components/recipients/recipients';
import { Hero } from '@/components/Heros/hero';
import { Footer } from '@/components/Footers/footer';
import { getAllRecipients } from '@/lib/mongo/recipients';
import {TransparentHeader} from '@/components/Headers/transparentHeader'
import { getRecipients } from '../actions';
import { Suspense } from 'react';

export default async function RecipientsPage({}){

    const limit = 6

    const {recipients} = await getRecipients(0,limit);
    //this is to serialize the data so that it can be passed as props
    const allRecipients = JSON.parse(JSON.stringify(recipients)).reverse();
    const pages = Math.ceil(allRecipients.length / limit);

    return (
        <div>
            <TransparentHeader/>
            <Hero 
                title={'Our Recipients'}
                subtitle={'We are the future'}
                image={'/images/graduates.jpg'}
                height={'50vh'}
                top={true}
                search={true}
            />
       <Suspense fallback={<div>Loading...</div>}>
             <Recipients 
             pages={pages}
             limit={limit}
             allRecipients={allRecipients} 
             />
        </Suspense>
      
        <Footer />            
        </div>
    );
}
