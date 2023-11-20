import style from "./AdminPage.module.scss";
import { FaUser, FaAddressCard, FaArrowRotateLeft } from "react-icons/fa6";

import { useLottoContext } from "../../contextAPI/LottoContext";
import LotteryTicketList from "../LotteryTicketList/LotteryTicketList";
import UserHitResult from "../HitResult/HitResult";
import AdminLottoStatement from "./AdminLottoStatement/AdminLottoStatement";

const AdminPage: React.FC = () => {

    const id = "admin"

    const {
        startLottery,
        handleInputChange,
        handleBlurChange,
        getMoney,
        setValue,
        setGenerateTicket,
        setAdminGenerateTicket,
        adminGenerateTicket,
        startGenerateAdminLotteryTicket,
        resetGame,
        formatPrice
    } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>

                <div className={style.controlContainer}>

                    <div className={style.profileContainer}>
                        <div className={style.iconContainer}>
                            <div className={style.iconCont}>
                                <FaUser className={style.icon} />
                                admin
                            </div>
                            <div className={style.nameInputCont}>
                                <label htmlFor="customName">
                                    Felhasználónév:
                                </label>
                                <input
                                    type="text"
                                    id="customName"
                                    onChange={(e) => { handleInputChange(e, id) }}
                                    onBlur={(e) => { handleBlurChange(e, id) }}
                                    placeholder="Irj egy nevet."
                                    value={setValue(id)}>
                                </input>
                            </div>
                        </div>
                        <p>Account balance</p>
                        <div className={style.balanceMainContainer}>
                            <div className={style.balanceContainer}>
                                <div className={style.title}>Admin akcse:</div>
                                <div className={style.balance}>
                                    {formatPrice(getMoney(id))} Akcse
                                </div>
                            </div>
                            <div className={style.balanceContainer}>
                                <div className={style.title}>Lotto profit:</div>
                                <div className={style.balance}>
                                    {formatPrice(getMoney("profit"))} Akcse
                                </div>
                            </div>
                            <div className={style.balanceContainer}>
                                <div className={style.title}>Nyeremény alap:</div>
                                <div className={style.balance}>
                                    {formatPrice(getMoney("collector"))} Akcse
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.adminControlContainer}>
                        <div className={style.generateTicketContainer}>
                            <label htmlFor="generet-num">Szelvény generálás db:</label>
                            <input
                                id="generet-num"
                                className={style.generateTicketInput}
                                type="number"
                                onChange={setGenerateTicket}
                                value={adminGenerateTicket} />
                            <div className={style.startGenerateCont}>
                                <button onClick={startGenerateAdminLotteryTicket} > generálás</button>
                                <FaArrowRotateLeft
                                    className={style.icon}
                                    onClick={() => setAdminGenerateTicket("")} />
                            </div>
                        </div>
                        <div className={style.btnContainer}>
                            <button
                                onClick={() => { startLottery(); }}>Sorsolás inditása
                            </button>
                            <button
                                className={style.reset}
                                onClick={() => { resetGame(); }}>Játék újrainditása.
                            </button>
                        </div>
                    </div>

                    <LotteryTicketList id={""} />

                    <AdminLottoStatement />


                </div>

                <UserHitResult id={""} />
            </div >
        </section>
    );
}

export default AdminPage;