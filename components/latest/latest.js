import Image from 'next/image'
import styles from '@/components/latest/latest.module.css'
import Link  from 'next/link'
import {getLatestRecipient} from '@/lib/mongo/recipients';
import { accentColor, defaultProfile } from '@/utilities/theme';
import { ThemeButton } from '@/components/Buttons/themeButton';
export const Latest = async () => {

    const latest = await getLatestRecipient();
    
    if (!latest[0]) return <div>No recipient found</div>;

    const profileImage = latest[0].profileImage ? latest[0].profileImage.src : defaultProfile;
    return (
        <div className="flex items-center justify-center gap-4 flex-wrap relative bg-slate-100 py-20">
            <div className={styles.latestThumbnail}>
                
                <Image src={profileImage} alt={latest[0].name} width={400} height={400} />
               <ThemeButton text={'Latest Recipient '+latest[0].name} link={`/recipients/${latest[0]._id}`}/>
              
            </div>

            <div className={styles.latestContent}>
                <p style={{fontStyle:'italic', marginBottom:'8px'}}>-FUNDING THE FUTURE-</p>
                <h2 style={{color:accentColor, fontSize:'2.5em', lineHeight:'.5'}}>MISSION</h2>
                <h2 style={{fontSize:'2.5em',lineheight:'.5'}}>STATEMENT</h2>
                <p>IMPORTANCE OF EDUCATION</p>
                <p>To provide scholarships to an acredited college, university , or vocational school for graduating high school seniors who are decedants of Earline and William Hall.</p>
            </div>
        </div>
    )
}