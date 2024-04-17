//import Image from 'next/image'
import {Hero} from '@/components/Heros/hero'
import {Schools} from '@/components/schools'
import {Footer} from '@/components/Footers/footer'
import { Latest } from '@/components/Latest/latest'
import {TransparentHeader} from '@/components/Headers/transparentHeader'
import { Suspense } from 'react'

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
   <Suspense fallback={<div>Loading...</div>}>  
    <Latest/>
    </Suspense>

   <Hero image={'/images/tsu-campus.jpg'}
   height={'30vh'}
   />
    <Schools/>
   
    <Footer/>
   
    </div>
  )
}
