import { useLottoContext } from "../../../contextAPI/LottoContext";
import style from "./AdminLottoStatement.module.scss";

const AdminLottoStatement: React.FC = () => {

    const {
        lottoLutteryNumberStatistics,
        sumByKey,
        adminStatement,
        formatPrice,
        winningNumbers
    } = useLottoContext();

    const tableData = [
        "kettö T.",
        "három T.",
        "négy T.",
        "öt T.",
    ]

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
                    <th colSpan={4}>Az egyes találatokra szelvényenként kifizetendő nyeremény:</th>
                </tr>
                <tr className={style.tdnn}>
                    {tableData.map((head) => {
                        return <td key={Date.now() + Math.random()}>{head}</td>;
                    })}
                </tr>
                <tr>
                    {adminStatement.paiDoutPriceHit.slice(2).map((priceHit, index) => {
                        return <td key={index}>{formatPrice(priceHit)} acs</td>;
                    })}
                </tr>
                <tr>
                    <th colSpan={4}>Az egyes találatokra összesen kifizetendő nyeremény:</th>
                </tr>
                <tr >
                    {tableData.map((head) => {
                        return <td key={Date.now() + Math.random()}>{head}</td>;
                    })}
                </tr>
                <tr>
                    {adminStatement.priceTicket.slice(2).map((priceHit, index) => {
                        return <td key={index}>{formatPrice(priceHit)} acs</td>;
                    })}
                </tr>
                <tr>
                    <td colSpan={3} className={style.tdBorder}> Az összes szelvény után járó bevétel:</td>
                    <td colSpan={1} className={style.tdBorder}> {formatPrice(adminStatement.ticketIncomeSum)} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={3}>Az összes találatra összesen kifizetendő összeg:</td>
                    <td colSpan={1}>{formatPrice(sumByKey(lottoLutteryNumberStatistics, "ticketValue"))} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={3}>Az üzemeltető nyeresége:</td>
                    <td colSpan={1}>{formatPrice(adminStatement.profitValue)} Akcse</td>
                </tr>
            </tbody>
        </table>
    );
}

export default AdminLottoStatement;
