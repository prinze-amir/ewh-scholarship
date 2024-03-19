import Image from 'next/image'
import styles from '@/components/latest/latest.module.css'
import Link  from 'next/link'
const uri = process.env.baseURI;
const fetchLatest = async () => {
    const latest = await fetch(`${uri}/api/latest`, {cache: "no-store"});
    const data = await latest.json();
    console.log(data, 'latest data');
    return data[0];
}

export const Latest = async () => {

    const latest = await fetchLatest();
    
    if (!latest) return <div>No recipient found</div>;

    const profileImage = latest.profileImage ? latest.profileImage.src : "/images/nayla.jpeg";

    return (
        <div className="flex items-center justify-center gap-x-4 flex-wrap relative bg-slate-100 py-20">
            <div className={styles.latestThumbnail}>
                <Image src={profileImage} alt={latest.name} width={400} height={400} />
               <Link href={`/recipients/${latest._id}`}><button className={styles.latestButton}>Latest Recipient {latest.name}</button></Link> 
            </div>

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