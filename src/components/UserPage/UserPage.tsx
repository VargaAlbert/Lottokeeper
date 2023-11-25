import { useLottoContext, USER_ID } from "../../contextAPI/LottoContext";
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
        setInputValue,
        formatPrice
    } = useLottoContext();

    const id = USER_ID;

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.controlContainer}>
                    <div className={style.profileContainer}>
                        <div className={style.iconContainer}>
                            <div className={style.iconCont}>
                                <FaUser className={style.icon} />
                                ID: {id}
                            </div>
                            <div className={style.nameInputCont}>
                                <label htmlFor="customName">
                                    Felhasználónév:
                                </label>
                                <input type="text"
                                    onChange={(e) => { handleInputChange(e, id) }}
                                    onBlur={(e) => { handleBlurChange(e, id) }}
                                    placeholder="Irj egy nevet."
                                    value={setInputValue(id)}>
                                </input>
                            </div>
                        </div>
                        <div>
                            <p>Egyenleg:</p>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{formatPrice(getMoney(id))}</div>
                                <div className={style.akcse}>Akcse</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.tippContainer}>
                        <LotteryTicket id={id} />
                    </div>
                    <LotteryTicketList id={id} />
                </div>
                <div className={style.tableContainer}>
                    <UserHitResult id={id} />
                </div>
            </div>
        </section>
    );
}

export default UserPage;