import Image from 'next/image'
import styles from '@/components/latest/latest.module.css'

const fetchLatest = async () => {
    const latest = await fetch('http://localhost:3000/api/latest');
    const data = await latest.json();
    console.log(data, 'latest data');
    return data[0];
}

const Recipient = async () => {
    
     const latest = await fetchLatest();
console.log(latest, 'latest');
     if (!latest) return <div>No recipient found</div>;

        return (
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'20px', width:'fit-content'}}>
            <Image src="/images/nayla.jpeg" alt="nayla" width={450} height={450} />
            <button className={styles.latestButton}>Latest Recipient {latest.name}</button>
              
            </div>
        )
       
    };

    export default Recipient;
