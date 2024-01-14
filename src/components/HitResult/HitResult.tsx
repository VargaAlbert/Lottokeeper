import { useLottoContext } from "../../contextAPI/LottoContext";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useLocalStorage } from "../../hooks/useLocalStorage";

import useSortResultStat from "../../hooks/useSortResultStat";
import useDeepCopyStat from "../../hooks/useDeepCopyStat";

import style from "./HitResult.module.scss";
type Props = {
    id: string
}

type Sort = {
    sortId: string,
    sortRev: boolean
}

const initSort = {
    sortId: "",
    sortRev: false
}

const headData = {
    id: "Sorszám",
    owner: "Tulajdonos(id)",
    lottoNumber: "Lotto számok",
    hit: "Találat",
    akcse: "Nyeremény"
};

const HitResult: React.FC<Props> = ({ id }) => {
    const {
        winningNumbers,
        lottoLotteryNumberStatistics,
        calculateTotalTicketValueById,
        sumByKey,
        formatPrice,
    } = useLottoContext();


    const [sort, setSort] = useLocalStorage<Sort>(`${id}-sort`, initSort)

    const resultStatistics = useDeepCopyStat(lottoLotteryNumberStatistics, id);

    const sortedResultStatistics = useSortResultStat(resultStatistics, sort);


    const entries = Object.entries(headData);

    const sumTSX = (): string => {
        if (id) {
            return (formatPrice(calculateTotalTicketValueById(lottoLotteryNumberStatistics, id)));
        } else {
            return (formatPrice(sumByKey(lottoLotteryNumberStatistics, "ticketValue")));
        }
    }

    return (
        <table className={style.mainTable}>
            <thead>
                <tr >
                    {entries.map(([key, value]) => {
                        return (
                            <th key={key} >
                                <div className={style.tableHeadContainer} >
                                    {value}
                                    <span>
                                        <FaAngleUp className={style.sortArrow} onClick={() => { setSort({ sortId: key, sortRev: false }) }} />
                                        <FaAngleDown className={style.sortArrow} onClick={() => { setSort({ sortId: key, sortRev: true }) }} />
                                    </span>
                                </div>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {sortedResultStatistics.map((ticket) => (
                    <tr key={ticket.lottoId} >
                        <td>
                            <div className={style.lottoId}>{ticket.lottoId}.</div>
                        </td>
                        <td>{ticket.owner}</td>
                        <td className={style.lotteryNumberContainer}>
                            {ticket.LotteryNumbers.sort((a, b) => a - b).map((number) => (
                                winningNumbers.winningNumbers.includes(number) ? (
                                    <div key={number} className={style.lotteryHitNumber}>
                                        {`${number},`}
                                    </div>
                                ) : (
                                    <div key={number} className={style.lotteryNumber}>
                                        {`${number},`}
                                    </div>
                                )
                            ))}
                        </td>
                        <td>{ticket.hits.length}</td>
                        <td>{formatPrice(ticket.ticketValue)} acs</td>
                    </tr>
                ))}
            </tbody>
            <tfoot className={style.mainTableFood}>
                <tr>
                    <td colSpan={3}>
                        <span>Össznyeremény:</span>
                    </td>
                    <td colSpan={2}>
                        <span>
                            {sumTSX()} Akcse
                        </span>
                    </td>
                </tr>
            </tfoot>
        </table >
    );
}

export default HitResult;