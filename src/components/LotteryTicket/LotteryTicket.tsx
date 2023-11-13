import style from "./LotteryTicket.module.scss";

import { useLottoContext, MIN_NUMBER, MAX_NUMBER, } from "../../contextAPI/LottoContext";






const LotteryTicket: React.FC = () => {

    const { LotteryTicketGridNumbers } = useLottoContext();


    return (
        <section className={style.mainContainer}>
            {LotteryTicketGridNumbers.map((number) => {
                return (<div>{number}</div>);
            })}
        </section>
    );
}

export default LotteryTicket;