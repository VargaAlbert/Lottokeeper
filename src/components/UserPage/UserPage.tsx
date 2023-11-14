import LotteryTicket from "../LotteryTicket/LotteryTicket";
import style from "./UserPage.module.scss";
import { FaUser, FaAddressCard } from "react-icons/fa6";
import { ChangeEvent, ReactNode, useState } from 'react';
import { useLottoContext } from "../../contextAPI/LottoContext";
import UserHitResult from './UserHitResult/UserHitResult';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import LotteryTicketList from "./LotteryTicketList/LotteryTicketList";

const UserPage: React.FC = () => {
    const [userName, setUsername] = useLocalStorage<string>("userName", "User")
    const [akcse, setAkcse] = useState<number>(10_000)

    const { lottoKeeperLutteryNumber, formatPrice } = useLottoContext();
    const lotteryTicket = lottoKeeperLutteryNumber.filter((Ticket) => Ticket.owner === "0user");


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleBlurChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== "") {
            setUsername(event.target.value);
        } else {
            setUsername("USER");
        }
    }

    console.log("szelvények", lotteryTicket.length);

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.controlContainer}>
                    <div className={style.profileContainer}>

                        <div className={style.iconContainer}>
                            <FaUser className={style.icon} />
                            <input type="text"
                                onChange={handleInputChange}
                                onBlur={handleBlurChange}
                                placeholder="irj egy nevet."
                                value={userName}>
                            </input>
                        </div>

                        <div>
                            <p>Account balance</p>
                            <div className={style.balanceContainer}>
                                <div className={style.balance}>{formatPrice(akcse)}</div>
                                <div className={style.akcse}>Akcse</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.tippContainer}>
                    <LotteryTicket setAkcse={setAkcse} akcse={akcse} />
                </div>

                <LotteryTicketList />

                <UserHitResult />

            </div>
        </section>
    );
}

export default UserPage;