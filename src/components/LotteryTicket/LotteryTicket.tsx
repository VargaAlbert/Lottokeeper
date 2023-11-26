import { useState } from "react";
import { useLottoContext, LOTTERY_NUMBER, TICKET_PRICE, COLLECTOR_ID } from "../../contextAPI/LottoContext";
import { FaArrowRotateLeft, FaComputer } from "react-icons/fa6";

import xImg from "../../img/x.png"
import style from "./LotteryTicket.module.scss";
import TicketModalLowmoney from "./TicketModal/TicketModalLowmoney";
import TicketModalFlewnumbers from "./TicketModal/TicketModalFlewnumbers";

type Props = {
    id: string
}

const LotteryTicket: React.FC<Props> = ({ id }) => {

    const {
        LotteryTicketGridNumbers,
        setLottoObject,
        addLotteryNumber,
        moneyTransaction,
        getMoney,
    } = useLottoContext();

    const [lotteryNumbers, setLotteryNumbers,] = useState<number[]>([]);

    const [showLowmoney, setShowLowmoney] = useState(false);
    const [showFlewnumbers, setShowFlewnumbers] = useState(false);

    const addNumber = (lotteryNumber: number) => {
        setLotteryNumbers((prevNumbers) => {
            if (!prevNumbers.includes(lotteryNumber) && prevNumbers.length < LOTTERY_NUMBER) {
                return [...prevNumbers, lotteryNumber];
            } else {
                return prevNumbers;
            }
        });
    };

    const removeNumber = (lotteryNumber: number) => {
        setLotteryNumbers((prevNumbers) => prevNumbers.filter((num) => num !== lotteryNumber));
    };

    const checked = (lotteryNumber: number) => {

        if (lotteryNumbers.includes(lotteryNumber)) {
            removeNumber(lotteryNumber);
        } else {
            addNumber(lotteryNumber);
        }
    }

    const LotteryTicketContentTSX = (lotteryNumber: number) => {
        if (lotteryNumbers.includes(lotteryNumber)) {
            return (
                <>
                    <span className={style.number}>{lotteryNumber}</span>
                    <img className={style.xImg} src={xImg} alt="x" />
                </>
            );
        } else if (lotteryNumbers.length === LOTTERY_NUMBER) {
            return <span className={style.full}>{lotteryNumber}</span>
        } else {
            return <span >{lotteryNumber}</span>
        }
    }

    const computerLottoNumbers = () => {
        setLotteryNumbers(addLotteryNumber());
    }

    const resetLottoNumbers = () => {
        setLotteryNumbers([])
    }


    const givesValue = () => {
        if (lotteryNumbers.length === LOTTERY_NUMBER && (getMoney(id)) >= TICKET_PRICE) {
            setLottoObject(id, lotteryNumbers)
            moneyTransaction(id, TICKET_PRICE, COLLECTOR_ID);
            setLotteryNumbers([])
        }
        else if (lotteryNumbers.length === LOTTERY_NUMBER && (getMoney(id)) < TICKET_PRICE) {
            handleShowLowmoney();
        }
        else if (lotteryNumbers.length < LOTTERY_NUMBER) {
            handleShowFlewnumbers();
        }
    }

    const handleCloseLowmoney = () => setShowLowmoney(false);
    const handleShowLowmoney = () => setShowLowmoney(true);

    const handleCloseFlewnumbers = () => setShowFlewnumbers(false);
    const handleShowFlewnumbers = () => setShowFlewnumbers(true);

    return (
        <section className={style.mainContainer}>
            <div className={style.ticketHead} >
                <h2>Lottó jegy</h2>
            </div>
            <div className={style.numberContainer}>
                {LotteryTicketGridNumbers.map((number) => {
                    return (<div
                        key={number}
                        className={style.number}
                        onClick={() => { checked(number) }}>
                        {LotteryTicketContentTSX(number)}
                    </div>);
                })}
            </div>
            <div className={style.btnContainer}>
                <FaComputer onClick={computerLottoNumbers} className={style.icon} />
                <button onClick={givesValue}>
                    Beküld {`(tipp ${LOTTERY_NUMBER}/${lotteryNumbers.length})`}
                </button>
                <FaArrowRotateLeft onClick={resetLottoNumbers} className={style.icon} />
            </div>
            <TicketModalLowmoney handleClose={handleCloseLowmoney} show={showLowmoney} id={id} />
            <TicketModalFlewnumbers handleClose={handleCloseFlewnumbers} show={showFlewnumbers} tipp={lotteryNumbers.length} />
        </section>
    );
}

export default LotteryTicket;
