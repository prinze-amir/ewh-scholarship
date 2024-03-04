'use client'
import footerStyles from './footer.module.css'
import Link from 'next/link'
//import Image from 'next/image'
export const Footer = () => {

    // const footerStyles = {
    //     divContainer: {
    //     display: 'flex',
    //     flexFlow: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: '4rem',
    //     backgroundColor: '#151515',
    //     color: '#fff',
    //     position: 'absolute',
    //     width: '100%',
    //     zIndex: '3',
    //     fontSize: '1.2rem', 
    //     },
    //     navmenu: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     listStyle: 'none',
    //     gap:`20px`,
    //     width: '30%',
    //     margin: '20px 0',
    //     },
    //     button: {
    //         padding: '10px 20px',
    //         backgroundColor: '#2fd6b9',
    //         color: '#fff',
    //         border: 'none',
    //         borderRadius: '5px',
    //         fontSize: '1.2rem',
    //     },
    //     button2: {
    //         padding: '10px 20px',
    //         backgroundColor: 'rgb(255 255 255 / 17%)',
    //         color: '#fff',
    //         border: 'solid 1px #fff',
    //         borderRadius: '15px',
    //         fontSize: '1.2rem',
    //     }
    // }
    return (
        <div className={footerStyles.divContainer}>
             
        <h1 className="text-4xl">EWH Scholarships</h1>
        <h3 className="text-lg">Memorial Scholarship Fund</h3>
        <ul className={footerStyles.navmenu}>
            <li><button className={footerStyles.footerButton1}>Donate</button></li>
            <Link  href='/apply' ><li><button className={footerStyles.footerButton2}>Apply</button></li></Link>
        </ul>
        <h4 className="">Built and designed by WeArePlu2o</h4>
        </div>
    )
    }