import { useLottoContext, ADMIN_STATEMENT_MIN_HIT_NUMBER } from "../../../contextAPI/LottoContext";
import style from "./AdminLottoStatement.module.scss";

const AdminLottoStatement: React.FC = () => {

    const {
        lottoLutteryNumberStatistics,
        sumByKey,
        adminStatement,
        formatPrice,
        winningNumbers
    } = useLottoContext();

    return (
        <table className={style.adminTable}>
            <thead>
                <tr>
                    <th colSpan={2}>Kimutatás</th>
                    <th colSpan={2}>A {winningNumbers.luttery}. Játék statisztikája</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th colSpan={4}>Az egyes találatokra összesen kifizetendő nyeremény:</th>
                </tr>

                {adminStatement.paiDoutPriceHit.slice(ADMIN_STATEMENT_MIN_HIT_NUMBER).map((priceHit, index) => {
                    return (
                        <tr key={index}>
                            <td colSpan={2}>{`${index + ADMIN_STATEMENT_MIN_HIT_NUMBER} Találatra:`}</td>
                            <td colSpan={2}>{priceHit} Akcse</td>
                        </tr>
                    );
                })}

                <tr>
                    <th colSpan={4}>Az egyes találatokra szelvényenként kifizetendő nyeremény:</th>
                </tr>

                {adminStatement.priceTicket.slice(ADMIN_STATEMENT_MIN_HIT_NUMBER).map((priceTicket, index) => {
                    return (
                        <tr key={index}>
                            <td colSpan={2}>{`${index + ADMIN_STATEMENT_MIN_HIT_NUMBER} Találatra:`}</td>
                            <td colSpan={2}>{priceTicket} Akcse</td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className={style.tdBorder}> Az összes szelvény után járó bevétel:</td>
                    <td colSpan={1} className={style.tdBorder}> {formatPrice(adminStatement.ticketIncomeSum)} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={3}>Az összes találatra összesen kifizetendő összeg:</td>
                    <td colSpan={1}>{formatPrice(sumByKey(lottoLutteryNumberStatistics, "ticketValue"))} Akcse</td>
                </tr>
                <tr className={style.last}>
                    <td colSpan={3}>Az üzemeltető nyeresége:</td>
                    <td colSpan={1}>{formatPrice(adminStatement.profitValue)} Akcse</td>
                </tr>
            </tfoot>
        </table>
    );
}

export default AdminLottoStatement;
