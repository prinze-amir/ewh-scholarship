import { Recipients } from '@/components/Recipients/recipients';
import { Hero } from '@/components/Heros/hero';
import { Footer } from '@/components/Footers/footer';
import { getAllRecipients } from '@/lib/mongo/recipients';
import {TransparentHeader} from '@/components/Headers/transparentHeader'
import { getRecipients } from '../actions';
import { Suspense } from 'react';

export default async function RecipientsPage({}){

    const limit = 6

    const {recipients} = await getRecipients(0,limit);
    const {total} = await getAllRecipients();
    //this is to serialize the data so that it can be passed as props
    const allRecipients = JSON.parse(JSON.stringify(recipients)).reverse();
    const pages = Math.ceil(total / limit);

    return (
        <div className="md:m-0 mb-10">
            <TransparentHeader/>
            <Hero 
                title={'Our Recipients'}
                subtitle={'We are the future'}
                image={'/images/graduates.jpg'}
                height={'50vh'}
                top={true}
                search={true}
            />
             <Recipients 
             pages={pages}
             limit={limit}
             allRecipients={allRecipients} 
             />
      
        <Footer />            
        </div>
    );
}
