import { useEffect, useState } from "react";
import { useLottoContext, lotteryTicket } from "../../../contextAPI/LottoContext";
import style from "./UserHitResult.module.scss";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
    id: string
}

const UserHitResult: React.FC<Props> = ({ id }) => {

    const {
        lottoNumbers,
        userResult,
        lottoLutteryNumberStatistics,
        setUserSort,
        userSort,
        calculateTotalTicketValueById
    } = useLottoContext();

    const [resultStatistics, setResultStatistics] = useState<lotteryTicket[]>([])
    const [sort, setSort] = useState<string>("")

    useEffect(() => {
        if (id) {
            setResultStatistics(JSON.parse(JSON.stringify(lottoLutteryNumberStatistics.filter((ticket) => ticket.owner === id))));
        } else {
            setResultStatistics(JSON.parse(JSON.stringify(lottoLutteryNumberStatistics)));
        }
    }, [lottoLutteryNumberStatistics]);

    console.log(resultStatistics);

    useEffect(() => {

        switch (sort) {
            case "min":
                resultStatistics.sort((a, b) => a.hits.length - b.hits.length);
                break;
            case "max":
                resultStatistics.sort((b, a) => a.hits.length - b.hits.length);
                break;
            default:
                break;
        }

    }, [sort]);


    const handleClick = () => {
        setUserSort((prevIsUp) => !prevIsUp);
    };

    const iconTSX = () => {
        return (
            <div onClick={handleClick}>
                {userSort ? <FaAngleUp onClick={() => { setSort("min") }} /> : <FaAngleDown onClick={() => { setSort("max") }} />}
            </div>
        );
    }

    return (
        <section className={style.mainContainer}>

            <div className={style.lotteryTicketContainer}>
                <div className={style.idColumn}>ID:</div>
                <div className={style.ownerColumn}>Owner:</div>
                <div className={style.numbColumn}>Lotto számok:</div>
                <div className={style.hitColumn}>
                    HIT
                    <div className={style.icon}>{iconTSX()}</div>
                </div>
                <div className={style.usdColumn}>nyeremény:</div>
            </div>

            <div className={style.lotteryListContainer}>
                {resultStatistics.map((ticket) => {

                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>

                            <div className={style.idColumn}>
                                <div className={style.lottoId}>{ticket.lottoId}.</div>
                            </div>

                            <div className={style.ownerColumn}>
                                {ticket.owner}
                            </div>

                            <div className={style.lotteryNumberContainer}>
                                {ticket.LotteryNumbers.sort((a, b) => a - b).map((number) => {

                                    if (lottoNumbers.includes(number)) {
                                        return (
                                            <div key={number} className={style.lotteryHitNumber}>
                                                {`${number}`},
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={number} className={style.lotteryNumber}>
                                                {`${number}`},
                                            </div>
                                        );
                                    }
                                })}
                            </div>

                            <div className={style.hitColumn}>
                                {ticket.hits.length}
                            </div>

                            <div className={style.usdColumn}>
                                {ticket.ticketValue}
                            </div>

                        </div>
                    );
                })}
            </div>
            <div> <span>Össznyeremény</span> <span>{calculateTotalTicketValueById(lottoLutteryNumberStatistics, id)}</span></div>
        </section>
    );
}

export default UserHitResult;