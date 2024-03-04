import {Hero} from '@/components/Heros/hero'
import Form from '@/components/Forms/applyForm'
import {Footer} from '@/components/Footers/footer'
export default function Apply(){
    
    
        return (
           <>
            <Hero 
            image={'/images/graduates.jpg'}
            height={'30vh'}
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
           </>
            
        )
    }

