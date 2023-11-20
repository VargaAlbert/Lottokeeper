import style from "./AdminLottoStatement.module.scss";
import { useLottoContext } from "../../../contextAPI/LottoContext";

const AdminLottoStatement: React.FC = () => {

    const {
        lottoLutteryNumberStatistics,
        sumByKey,
        adminStatement,
        formatPrice,
    } = useLottoContext();

    return (
        <table className={style.mainContainer}>
            <thead>
                <tr>
                    <th colSpan={4}>Kimutatás</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4}>Az egyes találatokra szelvényenként kifizetendő nyeremény:</td>
                </tr>
                <tr>
                    <td>kettö T.</td>
                    <td>három T.</td>
                    <td>négy T.</td>
                    <td>öt T.</td>
                </tr>
                <tr>
                    <td>{formatPrice(adminStatement.hit2)}</td>
                    <td>{formatPrice(adminStatement.hit3)}</td>
                    <td>{formatPrice(adminStatement.hit4)}</td>
                    <td>{formatPrice(adminStatement.hit5)}</td>
                </tr>

                <tr>
                    <td colSpan={4}>Az egyes találatokra szelvényenként kifizetendő nyeremény:</td>
                </tr>
                <tr className={style.tdnn}>
                    <td>kettö T.</td>
                    <td>három T.</td>
                    <td>négy T.</td>
                    <td>öt T.</td>
                </tr>
                <tr>
                    <td>kettö T.</td>
                    <td>három T.</td>
                    <td>négy T.</td>
                    <td>öt T.</td>
                </tr>


                <tr>
                    <td colSpan={2}>Az egyes találatokra összesen kifizetendő nyeremény:</td>
                    <td colSpan={2}>{formatPrice(sumByKey(lottoLutteryNumberStatistics, "ticketValue"))} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={2}>Az összes szelvény után járó bevétel:</td>
                    <td colSpan={2}>{formatPrice(0)} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={2}>Az összes találatra összesen kifizetendő összeg:</td>
                    <td colSpan={2}>{formatPrice(0)} Akcse</td>
                </tr>
                <tr>
                    <td colSpan={2}>Az üzemeltető nyeresége:</td>
                    <td colSpan={2}>{formatPrice(0)} Akcse</td>
                </tr>
            </tbody>
        </table>

    );
}

export default AdminLottoStatement;

//{formatPrice(sumByKey(lottoLutteryNumberStatistics, "ticketValue"))} Akcse