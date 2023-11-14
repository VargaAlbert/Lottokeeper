import style from "./Home.module.scss";

const Home: React.FC = () => {
    return (
        <section className={style.mainContainer}>
            <div className={style.container}>
                <h1>FÖNYEREMÉNY: 50.000.000 Akcse</h1>
            </div>
        </section>
    );
}

export default Home;