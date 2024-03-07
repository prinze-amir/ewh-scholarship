//'use client';
import { Recipients } from './recipients';
import { Hero } from '@/components/Heros/hero';
import { Footer } from '@/components/Footers/footer';
export default function RecipientsPage(){

    return (
        <div>
        <Hero 
        title={'Our Recipients'}
        subtitle={'We are the future'}
        image={'/images/graduates.jpg'}
        height={'50vh'}
        top={true}
        />
        <Recipients />
        <Footer />            
        </div>
    );
}
