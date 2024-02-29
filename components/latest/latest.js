
//import Recipient from './recipient'
import styles from '@/components/latest/latest.module.css'
import Recipient from './recipient'
export const Latest = () => {

    return (
        <div className="flex items-center justify-center gap-x-4 flex-wrap relative bg-slate-100 py-20">
            <Recipient /> 
            <div className={styles.latestContent}>
                <p style={{fontStyle:'italic', marginBottom:'8px'}}>-FUNDING THE FUTURE-</p>
                <h2 style={{color:'#2fd6b9', fontSize:'2.5em', lineHeight:'.5'}}>MISSION</h2>
                <h2 style={{fontSize:'2.5em',lineheight:'.5'}}>STATEMENT</h2>
                <p>IMPORTANCE OF EDUCATION</p>
                <p>To provide scholarships to an acredited college, university , or vocational school for graduating high school seniors who are decedants of Earline and William Hall.</p>
            </div>
        </div>
    )
}