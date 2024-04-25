import { accentColor } from '@/utilities/theme'
import { text } from 'body-parser'
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
            name: 'Macomb Community College',
            city: 'Macomb',
            state: 'MI',
            image: '/schools/macomb.jpg',
            alt: 'macomb community college',
            url: 'https://www.macomb.edu/index.html',
            
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
            name: 'University of Memphis',
            city: 'Memphis',
            state: 'TN',
            image: '/schools/umemphis.png',
            alt: 'University of Memphis',
            url: 'https://www.memphis.edu/',
            
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
            gap:'20px' ,
            overflow: 'scroll',
            padding: '1rem',
            backgroundColor: '#f1f5f9',
            color: '#000',
            width: 'fit-content',
            flexWrap: 'nowrap',
            zIndex: '1',
        },
        schoolCard: {
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            // textAlign: 'center',
             width: '350px',
             height: 'auto',
             color: '#000',
        },
        schoolImage: {
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            zIndex: '99',
        },

    }

    return (
        <div className="w-[100%] overflow-scroll ">
            <div style={schoolsStyles.divContainer} className="snap-x">
            {schools.map((school, index) => (
                <div key={index} style={schoolsStyles.schoolCard} className="snap-center" >
                    <a style={schoolsStyles.schoolLink} href={school.url} target="_blank"> 
                    <Image 
                        src={school.image} alt={school.alt} 
                        width={350} 
                        height={350} 
                        style={schoolsStyles.schoolImage} 
                    />

                    </a>
                </div>
            ))}
        </div>
        </div>
    )
}

