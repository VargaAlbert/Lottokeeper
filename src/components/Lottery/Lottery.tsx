import style from "./Lottery.module.scss";
import { useLottoContext } from "../../contextAPI/LottoContext";
import { match } from "assert";

const Lottery: React.FC = () => {

    const { winningNumbers } = useLottoContext();

    console.log(winningNumbers)

    const key = winningNumbers[5];
    //const key = "fdsf"
    return (
        <section className={style.mainContainer}>
            <div className={style.container}>

                <h2>Nyeröszámok:</h2>
                <div className={style.lotteryNumberContainer}>
                    {winningNumbers.slice(0, 5).sort((a, b) => a - b).map((number) => {
                        return (
                            <div key={number + String(key)} className={style.numberBullet}>
                                <div className={style.lotteryNumber}>
                                    {`${number}`}
                                </div>
                                <div className={style.lotteryNumberBack}></div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </section>
    );
}

export default Lottery;