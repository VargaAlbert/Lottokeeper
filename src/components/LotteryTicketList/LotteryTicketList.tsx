import style from "./LotteryTicketList.module.scss";
import { useLottoContext, lotteryTicket } from "../../contextAPI/LottoContext";
import { useEffect, useState } from "react";

type Props = {
    id: string
}

const LotteryTicketList: React.FC<Props> = ({ id }) => {

    const { lottoLutteryNumber } = useLottoContext();

    const [lotteryTicketList, setLotteryTicketList] = useState<lotteryTicket[]>([])

    useEffect(() => {
        if (id) {
            setLotteryTicketList(lottoLutteryNumber.filter((Ticket) => Ticket.owner === id));
        } else {
            setLotteryTicketList(lottoLutteryNumber.filter((Ticket) => Ticket.lottoId > 0).sort());
        }
    }, [lottoLutteryNumber]);

    if (lotteryTicketList.length > 0) {
        return (
            <div className={style.lotteryListContainer}>
                {lotteryTicketList.map((ticket) => {
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
        if (id) {
            return (
                <div className={style.lotteryListContainer}>
                    Még nem adtál fel szelvéynt!
                </div>
            );
        } else {
            return (
                <div className={style.lotteryListContainer}>
                    Még nem adtak fel szelvéynt!
                </div>
            )
        }
    }
}

export default LotteryTicketList;