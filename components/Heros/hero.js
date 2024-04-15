import { Button } from "@chakra-ui/react"
import { Search } from '@/Components/Filters/search';
import style from './hero.module.css'
import Link from 'next/link'
export const Hero = async (props) => {
    const {title, subtitle, image, buttonText, height, top, search, noOverlay} = props
    let imageUrl = image
    if (image.includes('google')) {
         imageUrl = 'http://localhost:1105/api/proxy?' + image
    }

    let heroHeight = height ? height : '50vh'
    let adjustMargin = top ? '-74px' : '0px'

    const heroStyles = {
        divContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: heroHeight,
            backgroundImage: `url(${imageUrl})`,
            backgroundAttachment: 'fixed',
            color: '#fff',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            zIndex: '0',
            position: 'absolute',
            
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
        height: {
            height: heroHeight,
            marginTop: adjustMargin,
        }

     }



    return (
        <div>
        <div style={heroStyles.divContainer} className={style.divContainer}>

           {title && <h1 style={heroStyles.title}>{title}</h1>
            }
            {subtitle && <h2 style={heroStyles.subtitle}>{subtitle}</h2>}
            {search && <Search/>}           
            {buttonText && <Link href="/apply"><Button 
                size='lg'
                bgColor="#2fd6b9" 
                color="white"
                zIndex={'2'} 
                 style={{marginTop:'20px'}}
                _hover={{color:'#333', backgroundColor:'white'}} 

                >{buttonText}</Button></Link>}
            {!noOverlay && <div style={heroStyles.overlay}></div>}
        </div>
        <div style={heroStyles.height}></div>
    </div>
    )
}
