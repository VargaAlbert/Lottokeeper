import LotteryTicket from "../LotteryTicket/LotteryTicket";
import style from "./UserPage.module.scss";
import { FaUser, FaAddressCard } from "react-icons/fa6";
import { ReactNode, useState } from 'react';
import { useLottoContext } from "../../contextAPI/LottoContext";

const UserPage: React.FC = () => {
    const [akcse, setAkcse] = useState<number>(10_000)

    const { lottoKeeperLutteryNumber } = useLottoContext();
    const lotteryTicket = lottoKeeperLutteryNumber.filter((Ticket) => Ticket.owner === "0user");

    console.log("szelvények", lotteryTicket.length);

    const lotteryTicketTSX = (): ReactNode => {
        if (lotteryTicket.length > 0) {
            return (
                <div >
                    {lotteryTicket.map((ticket) => {
                        return (
                            <div className={style.lotteryTicketContainer}>
                                <div className={style.ticketTitleCont}>
                                    <div>user</div>
                                    <div>Sorszám:</div>
                                    <div className={style.lottoId}>{ticket.lottoId}.</div>
                                </div>
                                <div className={style.lotteryNumberContainer}>
                                    {ticket.LotteryNumbers.sort((a, b) => a - b).map((number) => {
                                        return (
                                            <div key={number} className={style.lotteryNumber}>
                                                {`${number}`}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            return (<div>Még nem adtál fel szelvéynt!</div>);
        }

    }

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
                            <div className={style.balance}>{akcse}</div>
                            <div className={style.akcse}>Akcse</div>
                        </div>
                    </div>
                    <div className={style.tippContainer}>
                        <LotteryTicket setAkcse={setAkcse} akcse={akcse} />
                    </div>
                </div>
                <div className={style.lotteryListContainer} >
                    {lotteryTicketTSX()}
                </div>
            </div>
        </section>

    );
}

export default UserPage;