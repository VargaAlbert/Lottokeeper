import { useEffect, useState } from "react";
import { useLottoContext, lotteryTicket } from "../../contextAPI/LottoContext";
import style from "./HitResult.module.scss";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Props = {
    id: string
}

const HitResult: React.FC<Props> = ({ id }) => {
    const {
        winningNumbers,
        lottoLutteryNumberStatistics,
        calculateTotalTicketValueById,
        sumByKey,
        formatPrice,
    } = useLottoContext();

    const [resultStatistics, setResultStatistics] = useState<lotteryTicket[]>([])
    const [sortedResultStatistics, setSortedResultStatistics] = useState<lotteryTicket[]>([]);

    const [sort, setSort] = useLocalStorage<string>(`${id}-sort`, "")
    const data = {
        id: "ID:",
        owner: "Owner:",
        lottoNumber: "Lotto számok:",
        hit: "Találat:",
        akcse: "nyeremény:"
    };

    useEffect(() => {
        if (id) {
            setResultStatistics(JSON.parse(JSON.stringify(lottoLutteryNumberStatistics.filter((ticket) => ticket.owner === id))));
        } else {
            setResultStatistics(JSON.parse(JSON.stringify(lottoLutteryNumberStatistics.filter((ticket) => ticket.lottoId > 0))));
        }

    }, [lottoLutteryNumberStatistics]);

    useEffect(() => {
        const sortedData = [...resultStatistics];
        switch (sort) {
            case "id-min":
                sortedData.sort((a, b) => a.lottoId - b.lottoId);
                break;
            case "id-max":
                sortedData.sort((b, a) => a.lottoId - b.lottoId);
                break;
            case "owner-min":
                sortedData.sort((a, b) => a.owner.localeCompare(b.owner));
                break;
            case "owner-max":
                sortedData.sort((b, a) => a.owner.localeCompare(b.owner));
                break;
            case "lottoNumber-min":
                sortedData.sort((a, b) => a.LotteryNumbers.reduce((acc, curr) => acc + curr, 0) - b.LotteryNumbers.reduce((acc, curr) => acc + curr, 0));
                break;
            case "lottoNumber-max":
                sortedData.sort((b, a) => a.LotteryNumbers.reduce((acc, curr) => acc + curr, 0) - b.LotteryNumbers.reduce((acc, curr) => acc + curr, 0));
                break;
            case "hit-min":
                sortedData.sort((a, b) => a.hits.length - b.hits.length);
                break;
            case "hit-max":
                sortedData.sort((b, a) => a.hits.length - b.hits.length);
                break;
            case "akcse-min":
                sortedData.sort((a, b) => a.ticketValue - b.ticketValue);
                break;
            case "akcse-max":
                sortedData.sort((b, a) => a.ticketValue - b.ticketValue);
                break;
            default:
                break;
        }
        setSortedResultStatistics(sortedData);
    }, [sort, resultStatistics]);

    const entries = Object.entries(data);

    const sumTSX = (): string => {
        if (id) {
            return (formatPrice(calculateTotalTicketValueById(lottoLutteryNumberStatistics, id)));
        } else {
            return (formatPrice(sumByKey(lottoLutteryNumberStatistics, "ticketValue")));//ticketValue
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
                                        <FaAngleUp className={style.sortArrow} onClick={() => { setSort(`${key}-min`) }} />
                                        <FaAngleDown className={style.sortArrow} onClick={() => { setSort(`${key}-max`) }} />
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
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <span>Össznyeremény:</span>
                    </td>
                    <td colSpan={1}>
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