//import Image from 'next/image'
import {Hero} from '@/Components/Heros/hero'
import {Schools} from '@/Components/schools'
import {Footer} from '@/Components/Footers/footer'
import { Latest } from '@/Components/Latest/latest'
import {TransparentHeader} from '@/Components/Headers/transparentHeader'

export default function Home() {
  return (
   <div className="main-container font-roboto">
    <TransparentHeader/>
    <Hero 
      title={'Earline & William Hall'}
      subtitle={'Memorial Scholarship Fund'}
      image={'/images/tsu-campus.jpg'}
      buttonText={'Apply Now'}  
      height={'70vh'}
      top={true}
    />
     
    <Latest/>

   <Hero image={'/images/tsu-campus.jpg'}
   height={'30vh'}
   />
    <Schools/>
   
    <Footer/>
   
    </div>
  )
}
