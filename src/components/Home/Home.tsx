import style from "./Home.module.scss";
import { useLottoContext, LOTTERY_NUMBER } from "../../contextAPI/LottoContext";

const Home: React.FC = () => {

    const {
        totalWinnings,
        formatPrice
    } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.homeTitle}>
                    <h1>Össznyeremény:</h1>
                    <h2>{formatPrice(totalWinnings)} Akcse</h2>
                </div>
            </div>
        </section>
    );
}

export default Home;