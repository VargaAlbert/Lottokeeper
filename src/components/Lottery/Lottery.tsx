import style from "./Lottery.module.scss";
import { useLottoContext } from "../../contextAPI/LottoContext";

const Lottery: React.FC = () => {

    const { winningNumbers } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>

                <h2>Nyeröszámok:</h2>
                <div className={style.lotteryNumberContainer}>
                    {winningNumbers.sort((a, b) => a - b).map((number) => {
                        return (
                            <div key={number} className={style.lotteryNumber}>
                                {`${number}`}
                            </div>
                        )
                    })}

                </div>
            </div>

        </section>
    );
}

export default Lottery;