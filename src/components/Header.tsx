import logo from '../assets/logo.png'
import classes from './Header.module.css'

function Header() {
    return (
        <div className={classes.header}>
            <div className="logo">
                <img className={classes['logo_image']} src={logo}></img>
            
            </div>
        </div>
    );
  }
  
  export default Header;
  