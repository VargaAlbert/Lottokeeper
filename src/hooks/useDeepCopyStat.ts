import { useMemo } from 'react';
import { lotteryTicket } from "../contextAPI/LottoContext";

const useDeepCopyStat = (data: lotteryTicket[], id: string) => {

    const memoizedResultStatistics = useMemo(() => {

        const filteredStatistics = id
          ? data.filter((ticket) => ticket.owner === id)
          : data.filter((ticket) => ticket.lottoId > 0);
    
       return JSON.parse(JSON.stringify(filteredStatistics));
    
    }, [id, data]);

  return memoizedResultStatistics;
};

export default useDeepCopyStat;
