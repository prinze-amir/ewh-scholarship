import {Hero} from '@/components/Heros/hero'
import Form from '@/components/Forms/applyForm'
import {Footer} from '@/components/Footers/footer'
import {Header} from '@/components/Headers/header'
export default function Apply(){
    
    
        return (
           <div className="bg-white">
           <Header/>
            <Hero 
            image={'/images/graduates.jpg'}
            height={'40vh'}
            top={true}
            />
            <div className="flex flex-col items-center justify-center gap-y-4 mt-20">
                <h1 className="text-3xl font-bold">Apply For The Scholarship</h1>
                <div className="flex flex-col items-center justify-center gap-y-4">
                    <p className="text-xl">complete the form below</p>
                </div>
                <Form />
            </div>
            <Footer/>
           </div>
            
        )
    }

