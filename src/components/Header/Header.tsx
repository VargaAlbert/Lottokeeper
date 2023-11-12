import { Link } from "react-router-dom";
import { FaUser, FaAddressCard } from "react-icons/fa6";
import logo from "../../img/logo.png";
import style from "./Header.module.scss";

const Header = () => {
    return (
        <header>
            <section className={style.mainContainer} >

                <div className={style.logoContainer}>
                    <img className={style.logo} src={logo} alt="Lottokeeper-logo" />
                </div>

                <nav>

                    <Link className={style.navCategory} to="/UserPage">
                        <FaUser className={style.icon} />
                        User Page
                    </Link>

                    <Link className={style.navCategory} to="/AdminPage">
                        <FaAddressCard className={style.icon} />
                        Admin Page
                    </Link>

                </nav>
            </section>
        </header>
    );
}

export default Header;