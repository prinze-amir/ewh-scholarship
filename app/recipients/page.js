import { Recipients } from '@/Components/Recipients/recipients';
import { Hero } from '@/Components/Heros/hero';
import { Footer } from '@/Components/Footers/footer';
import { getAllRecipients } from '@/lib/mongo/recipients';
import {TransparentHeader} from '@/Components/Headers/transparentHeader'
import { getRecipients } from '../actions';

export default async function RecipientsPage({}){

    const limit = 6

    const {recipients, pages} = await getRecipients(0,limit);
    //this is to serialize the data so that it can be passed as props
    const allRecipients = JSON.parse(JSON.stringify(recipients)).reverse();

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
       
             <Recipients 
             pages={pages}
             limit={limit}
             allRecipients={allRecipients} 
             />
      
        <Footer />            
        </div>
    );
}
