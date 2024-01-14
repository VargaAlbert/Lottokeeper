import { useMemo } from 'react';
import { lotteryTicket } from "../contextAPI/LottoContext";

export type Sort = {
    sortId: string,
    sortRev: boolean
}

const useSortResultStat = (data: lotteryTicket[], sort : Sort ) =>{
    
    const {sortId, sortRev} = sort

    const sumLottoNumber = (ticket: lotteryTicket) => {
        return ticket.LotteryNumbers.reduce((acc, curr) => acc + curr, 0)
    }

    const memoizedSortedData = useMemo(() => {

        const copyData = [...data];
    
        switch (sortId) {
          case "id":
            copyData.sort((a, b) => sortRev ? a.lottoId - b.lottoId : b.lottoId - a.lottoId);
            break;
          case "owner":
            copyData.sort((a, b) => sortRev ? a.owner.localeCompare(b.owner) : b.owner.localeCompare(a.owner));
            break;
          case "lottoNumber":
            copyData.sort((a, b) => sortRev ? sumLottoNumber(a) - sumLottoNumber(b) : sumLottoNumber(b) - sumLottoNumber(a));
            break;
         case "hit":
            copyData.sort((a, b) => sortRev ? a.hits.length - b.hits.length : b.hits.length - a.hits.length);
            break;
         case "akcse":
            copyData.sort((a, b) => sortRev ? a.ticketValue - b.ticketValue : b.ticketValue - a.ticketValue);
            break;
          default:
            break;
        }
       return copyData

    }, [data, sortId, sortRev]);
    
  return memoizedSortedData;
};

export default useSortResultStat;