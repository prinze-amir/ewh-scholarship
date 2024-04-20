import { Button } from "@chakra-ui/react"
import { Search } from '@/components/Filters/search';
import style from './hero.module.css'
import Link from 'next/link'
import { accentColor } from "@/utilities/theme";
export const Hero = async (props) => {
    const {title, subtitle, image, buttonText, height, top, search, noOverlay} = props
    let imageUrl = image
    if (image.includes('google')) {
         imageUrl = '/api/proxy?' + image
    }

    let heroHeight = height ? height : '50vh'
    let adjustMargin = top ? '-74px' : '0px'
    let setTop = top ? 'top-0' : ''

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
        <div style={heroStyles.divContainer} className={`${setTop}`}>

           {title && <h1 className="md:text-6xl uppercase font-medium text-4xl text-white z-10 text-center my-3" >{title}</h1>
            }
            {subtitle && <h2 style={heroStyles.subtitle}>{subtitle}</h2>}
            {search && <Search className={style.search}/>}           
            {buttonText && <Link href="/apply"><Button 
                size='lg'
                bgColor={accentColor}
                color="white"
                zIndex={'2'} 
                 style={{marginTop:'20px'}}
                _hover={{color:'#333', backgroundColor:'white'}} 

                >{buttonText}</Button></Link>}
            {!noOverlay && <div style={heroStyles.overlay}></div>}
        </div>
        <div className={`${setTop}`} style={heroStyles.height}></div>
    </div>
    )
}
