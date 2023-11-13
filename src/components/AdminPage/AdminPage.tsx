import style from "./AdminPage.module.scss";
import { FaUser, FaAddressCard } from "react-icons/fa6";
import { useLottoContext } from "../../contextAPI/LottoContext";

const AdminPage: React.FC = () => {

    const { startLottery } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            AdminPage
            <div className={style.container}>
                <div className={style.dataContainer}>
                    <div className={style.profileContainer}>
                        <FaUser className={style.icon} />
                        <div>Admin</div>
                        <div className={style.balanceContainer} >
                            <p> Account balance</p>
                            <div className={style.balance}>0</div>
                            <div className={style.akcse}>Akcse</div>
                        </div>
                    </div>
                    <div className={style.controllerContainer}>
                        <button onClick={() => { startLottery(); }}>Sorsolás inditása</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}

export default AdminPage;