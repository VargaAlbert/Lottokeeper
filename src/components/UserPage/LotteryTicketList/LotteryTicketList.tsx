import style from "./LotteryTicketList.module.scss";
import { useLottoContext } from "../../../contextAPI/LottoContext";

const LotteryTicketList: React.FC = () => {

    const { lottoKeeperLutteryNumber, formatPrice } = useLottoContext();
    const lotteryTicket = lottoKeeperLutteryNumber.filter((Ticket) => Ticket.owner === "0user");

    if (lotteryTicket.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
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
        return (
            <div className={style.lotteryListContainer}>
                Még nem adtál fel szelvéynt!
            </div>);
    }
}

export default LotteryTicketList;