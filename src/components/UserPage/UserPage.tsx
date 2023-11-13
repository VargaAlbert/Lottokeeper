import LotteryTicket from "../LotteryTicket/LotteryTicket";
import style from "./UserPage.module.scss";
import { FaUser, FaAddressCard } from "react-icons/fa6";

const UserPage: React.FC = () => {
    return (
        <section className={style.mainContainer}>
            USER PAGE
            <div className={style.container}>
                <div className={style.dataContainer}>
                    <div className={style.profileContainer}>
                        <FaUser className={style.icon} />
                        <div>USER</div>
                        <div className={style.balanceContainer} >
                            <p> Account balance</p>
                            <div className={style.balance}>0</div>
                            <div className={style.akcse}>Akcse</div>
                        </div>
                    </div>
                    <div className={style.tippContainer}>
                        <LotteryTicket />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}

export default UserPage;