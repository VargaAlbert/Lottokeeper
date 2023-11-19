import { useLottoContext } from "../../contextAPI/LottoContext";
import { FaUser } from "react-icons/fa6";

import LotteryTicket from "../LotteryTicket/LotteryTicket";
import UserHitResult from '../HitResult/HitResult';
import LotteryTicketList from "../LotteryTicketList/LotteryTicketList";

import style from "./UserPage.module.scss";

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
                                placeholder="Irj egy nevet."
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