import { useLottoContext } from "../../contextAPI/LottoContext";
import style from "./Lottery.module.scss";

const Lottery: React.FC = () => {

    const { winningNumbers } = useLottoContext();

    const key = winningNumbers.luttery;

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <h2>Nyerőszámok:</h2>
                <div className={style.lotteryNumberContainer}>
                    {
                        winningNumbers.winningNumbers.sort((a, b) => a - b).map((number) => (
                            <div key={number + String(key)} className={style.numberBullet}>
                                <div className={style.lotteryNumber}>
                                    {`${number}`}
                                </div>
                                <div className={style.lotteryNumberBack}></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );

}

export default Lottery;