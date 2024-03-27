import { Recipients } from '@/components/Recipients/recipients';
import { Hero } from '@/components/Heros/hero';
import { Footer } from '@/components/Footers/footer';
import { getAllRecipients } from '@/lib/mongo/recipients';
import { Search } from '@/components/Filters/search';
export default async function RecipientsPage({}){
    
    const response = await getAllRecipients();
    //this is to serialize the data so that it can be passed as props
    const allRecipients = JSON.parse(JSON.stringify(response)).reverse();

    return (
        <div>
        <Hero 
            title={'Our Recipients'}
            subtitle={'We are the future'}
            image={'/images/graduates.jpg'}
            height={'50vh'}
            top={true}
        />
        <Search />
        <div className="recipients">
             <Recipients allRecipients={allRecipients} />
        </div>
        <Footer />            
        </div>
    );
}
