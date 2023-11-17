import style from "./AdminPage.module.scss";
import { FaUser, FaAddressCard, FaArrowRotateLeft } from "react-icons/fa6";

import { useLottoContext } from "../../contextAPI/LottoContext";
import LotteryTicketListAdmin from "./LotteryTicketListAdmin/LotteryTicketListAdmin";

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
        startGenerateAdminLotteryTicket
    } = useLottoContext();




    return (
        <section className={style.mainContainer}>
            <div className={style.container}>

                <div className={style.controlContainer}>

                    <div className={style.profileContainer}>

                        <div className={style.iconContainer}>
                            <FaUser className={style.icon} />
                            <input type="text"
                                onChange={(e) => { handleInputChange(e, id) }}
                                onBlur={(e) => { handleBlurChange(e, id) }}
                                placeholder="irj egy nevet."
                                value={setValue(id)}>
                            </input>
                        </div>

                        <p>Account balance</p>
                        <div className={style.adminControl}>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{getMoney(id)}</div>
                                <div className={style.akcse}>Akcse</div>
                            </div>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{getMoney("profit")}</div>
                                <div className={style.akcse}>profit</div>
                            </div>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{getMoney("collector")}</div>
                                <div className={style.akcse}>gyüjtö</div>
                            </div>
                        </div>

                    </div>

                    <div className={style.controllerContainer}>

                        <div>
                            <label htmlFor="generet-num">Generált szelvények:</label>
                            <input id="generet-num"
                                type="number"
                                onChange={setGenerateTicket}
                                value={adminGenerateTicket} />
                            <div>
                                <FaArrowRotateLeft onClick={() => setAdminGenerateTicket("")} />
                                <button onClick={startGenerateAdminLotteryTicket} > generálás</button>
                            </div>
                        </div>


                        <button onClick={() => { startLottery(); }}>Sorsolás inditása</button>

                    </div>

                    <LotteryTicketListAdmin />

                    <div>fagfaf</div>

                </div>
            </div >
        </section>
    );
}

export default AdminPage;