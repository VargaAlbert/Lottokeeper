import { Link } from "react-router-dom";
import { FaUser, FaAddressCard } from "react-icons/fa6";

import style from "./Header.module.scss";

const Header = () => {
    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.logoContainer}></div>
            </div>
            <nav>
                <div>
                    <Link to="/UserPage">
                        <FaUser className={style.icon} />
                        User Page
                    </Link>
                </div>
                <div>
                    <Link to="/AdminPage">
                        <FaAddressCard className={style.icon} />
                        Admin Page
                    </Link>
                </div>
            </nav>
        </section>
    );
}

export default Header;