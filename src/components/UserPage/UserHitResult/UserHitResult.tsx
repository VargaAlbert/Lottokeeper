import { useEffect, useState } from "react";
import { useLottoContext } from "../../../contextAPI/LottoContext";
import style from "./UserHitResult.module.scss";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
    id: string
}

const UserHitResult: React.FC<Props> = ({ id }) => {


    const { lottoLutteryNumber, formatPrice, lottoNumbers, userResult, setUserSort, userSort } = useLottoContext();
    const lotteryTicket = userResult.filter((Ticket) => Ticket.owner === id);


    const handleClick = () => {
        setUserSort((prevIsUp) => !prevIsUp);
    };


    const iconTSX = () => {
        return (
            <div onClick={handleClick}>
                {userSort ? <FaAngleUp /> : <FaAngleDown />}
            </div>
        );
    }

    return (
        <section className={style.mainContainer}>



            <div className={style.lotteryTicketContainer}>
                <div className={style.idColumn}>ID:</div>
                <div className={style.numbColumn}>Lotto számok:</div>
                <div className={style.hitColumn}>
                    HIT
                    <div className={style.icon}>{iconTSX()}</div>
                </div>
                <div className={style.usdColumn}>nyeremény:</div>
            </div>

            <div className={style.lotteryListContainer}>
                {lotteryTicket.map((ticket) => {
                    const hits = ticket.hits.length
                    return (
                        <div key={ticket.lottoId} className={style.lotteryTicketContainer}>

                            <div className={style.idColumn}>

                                <div className={style.lottoId}>{ticket.lottoId}.</div>
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


                            <div className={style.hitColumn}>{hits}</div>



                            <div className={style.usdColumn}>{hits * 1000}</div>

                        </div>
                    );
                })}
            </div>
            <div> <span>Össznyeremény</span> <span>547471544 USD</span></div>
        </section>
    );
}

export default UserHitResult;