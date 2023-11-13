import { useState } from "react";
import { useLottoContext, LOTTERY_NUMBER } from "../../contextAPI/LottoContext";
import xImg from "../../img/x.png"
import style from "./LotteryTicket.module.scss";


const LotteryTicket: React.FC = () => {

    const { LotteryTicketGridNumbers } = useLottoContext();

    const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);

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
            return (<>
                <span className={style.number}>{lotteryNumber}</span>
                <img className={style.xImg} src={xImg} alt="x" />
            </>);
        } else if (lotteryNumbers.length === LOTTERY_NUMBER) {
            return <span className={style.full}>{lotteryNumber}</span>
        } else {
            return <span >{lotteryNumber}</span>
        }
    }

    return (
        <section className={style.mainContainer}>
            <div>
                <div>Lottery Ticket</div><div>Reset</div>
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
            <div>
                <button>Gyorstip</button>
                <button>Bekuld</button>
            </div>
        </section>
    );
}

export default LotteryTicket;
