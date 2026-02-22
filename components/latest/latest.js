import Image from 'next/image'
import styles from '@/components/latest/latest.module.css'
import {getLatestRecipient} from '@/lib/mongo/recipients';
import { defaultAccentColor, defaultProfile } from '@/utilities/defaults';
import { ThemeButton } from '@/components/Buttons/themeButton';

const toProxyUrl = (id) => `/api/proxy?id=${encodeURIComponent(id)}`;

const extractGoogleDriveId = (value) => {
    if (typeof value !== 'string' || value.trim() === '') return null;

    try {
        const url = new URL(value);
        const fromQuery = url.searchParams.get('id');
        if (fromQuery) return fromQuery;

        const fromPath = url.pathname.match(/\/d\/([^/]+)/);
        if (fromPath?.[1]) return fromPath[1];
    } catch (error) {
        return null;
    }

    return null;
};

const resolveImageSrc = (profileImage) => {
    if (profileImage && typeof profileImage === 'object') {
        if (typeof profileImage.id === 'string' && profileImage.id.trim() !== '') {
            return toProxyUrl(profileImage.id);
        }

        if (typeof profileImage.src === 'string' && profileImage.src.trim() !== '') {
            const fromSrc = extractGoogleDriveId(profileImage.src);
            if (fromSrc) return toProxyUrl(fromSrc);
            return profileImage.src;
        }
    }

    if (typeof profileImage === 'string' && profileImage.trim() !== '') {
        const fromString = extractGoogleDriveId(profileImage);
        if (fromString) return toProxyUrl(fromString);
        return profileImage;
    }

    return defaultProfile;
};

export const Latest = async () => {

    const latest = await getLatestRecipient();
    
    if (!latest) return <div>No recipient found</div>;

    const profileImage = resolveImageSrc(latest.profileImage);
    const latestId = latest._id?.toString?.() || latest._id;
    return (
        <div className="flex items-center justify-center gap-4 flex-wrap relative bg-slate-100 py-20">
            <div className={styles.latestThumbnail}>
                
                <Image
                    src={profileImage}
                    alt={latest.name}
                    width={400}
                    height={400}
                    priority
                />
               <ThemeButton text={'Latest Recipient '+latest.name} link={`/recipients/${latestId}`}/>
              
            </div>

            <div className={styles.latestContent}>
                <p style={{fontStyle:'italic', marginBottom:'8px'}}>-FUNDING THE FUTURE-</p>
                <h2 style={{color:defaultAccentColor, fontSize:'2.5em', lineHeight:'.5'}}>MISSION</h2>
                <h2 style={{fontSize:'2.5em', lineHeight:'.5'}}>STATEMENT</h2>
                <p>IMPORTANCE OF EDUCATION</p>
                <p>To provide scholarships to an acredited college, university , or vocational school for graduating high school seniors who are decedants of Earline and William Hall.</p>
            </div>
        </div>
    )
}
