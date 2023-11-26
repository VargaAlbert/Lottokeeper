import style from "./LotteryTicketList.module.scss";
import { useLottoContext, lotteryTicket } from "../../contextAPI/LottoContext";
import { useEffect, useState } from "react";

type Props = {
    id: string
}

const LotteryTicketList: React.FC<Props> = ({ id }) => {

    const { lottoLotteryNumber } = useLottoContext();

    const [lotteryTicketList, setLotteryTicketList] = useState<lotteryTicket[]>([])

    useEffect(() => {
        if (id) {
            setLotteryTicketList(lottoLotteryNumber.filter((Ticket) => Ticket.owner === id));
        } else {
            setLotteryTicketList(lottoLotteryNumber.filter((Ticket) => Ticket.lottoId > 0).sort((b, a) => a.owner.localeCompare(b.owner)));
        }
    }, [lottoLotteryNumber]);

    if (lotteryTicketList.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
                {lotteryTicketList.map((ticket) => {
                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>
                            <div className={style.ticketTitleCont}>
                                <div>ID: {ticket.owner}</div>
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
        if (id) {
            return (
                <div className={style.lotteryListContainer}>
                    <h3>Még nem adtál fel szelvéynt!</h3>
                </div>
            );
        } else {
            return (
                <div className={style.lotteryListContainer}>
                    <h3>Még nincs szelvény fel adva!</h3>
                </div>
            )
        }
    }
}

export default LotteryTicketList;