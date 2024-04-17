'use client'
import footerStyles from './footer.module.css'
import Link from 'next/link'
export const Footer = () => {

    
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
