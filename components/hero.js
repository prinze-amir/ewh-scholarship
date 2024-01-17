'use client'
import { useRouter } from "next/navigation"
export const Hero = (props) => {
    const {title, subtitle, image, buttonText, height} = props
    const router = useRouter()

    let heroHeight = height ? height : '50vh'


    const heroStyles = {
        divContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: heroHeight,
            backgroundImage: `url(${image})`,
            backgroundAttachment: 'fixed',
            color: '#fff',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            zIndex: '0',
            
        },
        overlay: {
            position: 'absolute',
            width: '100%',
            height: heroHeight,
            backgroundColor: 'rgb(0 0 0 / 70%)',
            zIndex: '1',
        },

        title: {
            fontSize: '3.5em',
            fontWeight: '500',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            zIndex: '2',
        },
        subtitle: {
            fontSize: '1.5rem',
            textAlign: 'center',
            zIndex: '2',
            color:'#fff',
        },

     }

     const handleClick = () => {
            console.log('clicked')
            router.push('/apply')
        }


    return (
        <div style={heroStyles.divContainer}>

           {title && <h1 style={heroStyles.title}>{title}</h1>
            }
            {subtitle && <h2 style={heroStyles.subtitle}>{subtitle}</h2>}
            {buttonText && <button style={{zIndex:'2', position:'relative', marginTop:'20px', padding:'10px 20px', backgroundColor:'#2fd6b9', color:'#fff', border:'none', borderRadius:'5px', fontSize:'1.2rem'}} onClick={handleClick}>{buttonText}</button>}
            <div style={heroStyles.overlay}></div>
        </div>
    )
}
