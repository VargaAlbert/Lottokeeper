import style from "./LotteryTicketListAdmin.module.scss";
import { useLottoContext } from "../../../contextAPI/LottoContext";



const LotteryTicketListAdmin: React.FC = () => {

    const { lottoLutteryNumber, formatPrice } = useLottoContext();
    const lotteryTicket = lottoLutteryNumber.filter((Ticket) => Ticket.lottoId > 0).sort();

    if (lottoLutteryNumber.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
                {lotteryTicket.map((ticket) => {
                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>

                            <div className={style.ticketTitleCont}>
                                <div>{ticket.owner}</div>
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
                Még senki nem adott le szelvényt!
            </div>);
    }
}

export default LotteryTicketListAdmin;