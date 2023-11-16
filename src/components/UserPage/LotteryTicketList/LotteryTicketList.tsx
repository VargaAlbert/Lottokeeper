import style from "./LotteryTicketList.module.scss";
import { useLottoContext } from "../../../contextAPI/LottoContext";

type Props = {
    id: string
}

const LotteryTicketList: React.FC<Props> = ({ id }) => {

    const { lottoLutteryNumber } = useLottoContext();

    const lotteryTicket = lottoLutteryNumber.filter((Ticket) => Ticket.owner === id);

    if (lotteryTicket.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
                {lotteryTicket.map((ticket) => {
                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>
                            <div className={style.ticketTitleCont}>
                                <div>{id}</div>
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