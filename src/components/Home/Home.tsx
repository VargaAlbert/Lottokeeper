import { useLottoContext } from "../../contextAPI/LottoContext";
import style from "./Home.module.scss";

const Home: React.FC = () => {

    const {
        memoizedPrizePool,
        formatPrice
    } = useLottoContext();

    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <div className={style.homeTitle}>
                    <h1>Össznyeremény:</h1>
                    <h2>{formatPrice(memoizedPrizePool)} Akcse</h2>
                </div>
            </div>
        </section>
    );
}

export default Home;