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
                <h1>Össznyeremény: {formatPrice(totalWinnings)} Akcse</h1>
            </div>
        </section>
    );
}

export default Home;