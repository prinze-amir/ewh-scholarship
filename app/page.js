//import Image from 'next/image'
import {Hero} from '@/components/Heros/hero'
import {Schools} from '@/components/schools'
import {Footer} from '@/components/Footers/footer'
import { Latest } from '@/components/latest/latest'
import {TransparentHeader} from '@/components/Headers/transparentHeader'
import { Suspense } from 'react'
import { Skeleton } from '@chakra-ui/react'

export default function Home() {
  return (
   <div className="main-container font-roboto">
    <TransparentHeader/>
    <Hero 
      title={'Earline & William Hall'}
      subtitle={'Memorial Scholarship Fund'}
      image={'/images/tsu-campus.jpg'}
      buttonText={'Apply Now'}  
      height={'75vh'}
      top={true}
    />
   <Suspense fallback={<Skeleton height="450px"/>}>  
      <Latest/>
    </Suspense>

   <Hero image={'/images/tsu-campus.jpg'}
   height={'40vh'}
   />
    <Schools/>
   
    <Footer/>
   
    </div>
  )
}
