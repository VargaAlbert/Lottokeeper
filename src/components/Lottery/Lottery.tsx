import style from "./Lottery.module.scss";
import { useLottoContext } from "../../contextAPI/LottoContext";

const Lottery = () => {

    const { lottoNumbers } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.lotteryNumberContainer}>

                    {lottoNumbers.map((number) => {
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