import Image from 'next/image'
import {Header} from '../components/header'
import {Hero} from '../components/hero'
import {Schools} from '../components/schools'
import {Footer} from '../components/footer'
import { Latest } from '../components/latests'

export default function Home() {
  return (
   <div className="main-containe font-roboto">
    <Header/>
    <Hero 
      title={'Earline & William Hall'}
      subtitle={'Memorial Scholarship Fund'}
      image={'/images/tsu-campus.jpg'}
      buttonText={'Apply Now'}  
      height={'50vh'}
    />
    <div className="flex items-center justify-center gap-x-20 bg-amber-100 py-8 px-20 w-fit	mx-auto rounded-lg flex-wrap mt-[-60px] z-10 relative shadow-md">
      <div>
        <Image src="/images/earline.jpg" alt="earline" width={350} height={350} />
        <h2 style={{color:'#333', textAlign:'center', fontSize:'1.5em', marginTop:'15px'}}>Earline Hall</h2>
      </div>
      <div>
        <Image src="/images/william.jpg" alt="earline" width={350} height={350} />
        <h2 style={{color:'#333', textAlign:'center', fontSize:'1.5em', marginTop:'15px'}}>William Hall</h2>
      </div>
        
      
    </div>
    <Latest/>

   <Hero image={'/images/tsu-campus.jpg'}
   height={'30vh'}
   />
    <Schools/>
    <Footer/>
   
    </div>
  )
}
