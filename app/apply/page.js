import {Hero} from '@/components/Heros/hero'
import Form from '@/components/forms/applyForm'
import {Footer} from '@/components/Footers/footer'
import {TransparentHeader} from '@/components/Headers/transparentHeader'
export default function Apply(){
    
    
        return (
           <div className="bg-neutral-900">
           <TransparentHeader/>
            <Hero
            image={'/images/graduates.jpg'}
            title={'Apply For The Scholarship'}
            height={'45vh'}
            top={true}
            />
            <div className="flex flex-col items-center justify-center gap-y-4 mt-20 p-5 ">
                {/* <h1 className="text-3xl font-bold">Apply For The Scholarship</h1> */}
                
                <Form />
                
            </div>
            <Hero
            image={'/images/graduates.jpg'}
            height={'30vh'}
            top={false}
            />
            <Footer/>
           </div>
            
        )
    }

