import './header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className="header-main-container">
            <div className="header-container">
                <Link to="/dashboard">
                    <img src="https://aponus.com.ar/images/logo_chico.png" alt="Logo" className='header-logo' />
                </Link>
            </div>
        </div>
    )
}