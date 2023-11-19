import LotteryTicket from "../LotteryTicket/LotteryTicket";
import style from "./UserPage.module.scss";
import { FaUser, FaAddressCard } from "react-icons/fa6";

import { useLottoContext } from "../../contextAPI/LottoContext";
import UserHitResult from '../HitResult/HitResult';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import LotteryTicketList from "../LotteryTicketList/LotteryTicketList";

const UserPage: React.FC = () => {

    const {
        handleInputChange,
        handleBlurChange,
        getMoney,
        setValue,
        formatPrice
    } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>

                <div className={style.controlContainer}>

                    <div className={style.profileContainer}>

                        <div className={style.iconContainer}>
                            <FaUser className={style.icon} />
                            <input type="text"
                                onChange={(e) => { handleInputChange(e, "user") }}
                                onBlur={(e) => { handleBlurChange(e, "user") }}
                                placeholder="irj egy nevet."
                                value={setValue("user")}>
                            </input>
                        </div>

                        <div>
                            <p>Account balance</p>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{formatPrice(getMoney("user"))}</div>
                                <div className={style.akcse}>Akcse</div>
                            </div>
                        </div>

                    </div>

                    <div className={style.tippContainer}>
                        <LotteryTicket id={"user"} />
                    </div>

                    <LotteryTicketList id={"user"} />

                </div>

                <UserHitResult id={"user"} />

            </div>
        </section>
    );
}

export default UserPage;