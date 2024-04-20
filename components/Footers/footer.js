import footerStyles from './footer.module.css'
import { ThemeButton } from '../Buttons/themeButton'
export const Footer = async() => {

    
    return (
        <div className={footerStyles.divContainer}>
             
        <h1 className="text-4xl">EWH Scholarships</h1>
        <h3 className="text-lg">Memorial Scholarship Fund</h3>
        <ul className={footerStyles.navmenu}>
            <li><ThemeButton text="Donate"/></li>
            <li><ThemeButton text="Apply" theme="dark" link="/apply"/></li>
        </ul>
        <h4 className="">Built and designed by WeArePlu2o</h4>
        </div>
    )
    }
