import { accentColor } from '@/utilities/theme'
import Image from 'next/image'

export const Schools = () => {
    const schools = [
        {
            name: 'Tennessee State University',
            city: 'Nashville',
            state: 'TN',
            image: '/schools/tsu.png',
            alt: 'Tennessee State University',
            url: 'https://www.tnstate.edu/',
            
        },
        {
            name: 'Alabama A&M University',
            city: 'Huntsville',
            state: 'AL',
            image: '/schools/alabama.png',
            alt: 'Alabama A&M University',
            url: 'https://www.aamu.edu/',
            
        },
        {
            name: 'Morgan State University',
            city: 'Baltimore',
            state: 'MD',
            image: '/schools/morgan.png',
            alt: 'Morgan State University',
            url: 'https://www.morgan.edu/',
            
        },
        {
            name: 'mississippi valley state university',
            city: 'Itta Bena',
            state: 'MS',
            image: '/schools/missippi-valley.png',
            alt: 'Mississippi Valley State University',
            url: 'https://www.mvsu.edu/',
        },
        {
            name:'Mississippi State University',
            city: 'Starkville',
            state: 'MS',
            image: '/schools/mississippi-state.png',
            alt: 'Mississippi State University',
            url: 'https://www.msstate.edu/',
        }
       
    ]


    const schoolsStyles = {
        divContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexShrink: '3',
            gap:'20px' ,
            padding: '1rem',
            backgroundColor: '#f1f5f9',
            color: '#000',
            position: 'relative',
            zIndex: '1',
        },
        schoolCard: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '250px',
            color: '#000',
        },
        schoolImage: {
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            zIndex: '99',
        },
        schoolName: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            zIndex: '2',
        },
        schoolLocation: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            zIndex: '2',
        },
        schoolDescription: {
            fontSize: '1rem',
            textAlign: 'center',
            zIndex: '2',
        },
        schoolLink: {
            fontSize: '1rem',
            textAlign: 'center',
            zIndex: '2',
        },
    }

    return (
        <div style={schoolsStyles.divContainer}>
            {schools.map((school, index) => (
                <div key={index} style={schoolsStyles.schoolCard} >
                    <a style={schoolsStyles.schoolLink} href={school.url} target="_blank"> 
                    <Image 
                        src={school.image} alt={school.alt} 
                        width={350} 
                        height={350} 
                        style={schoolsStyles.schoolImage} 
                    />
                    {/* <h2 style={schoolsStyles.schoolName}>{school.name}</h2>
                    <h3 style={schoolsStyles.schoolLocation}>{school.city}, {school.state}</h3> */}
                    </a>
                </div>
            ))}
        </div>
    )
}

