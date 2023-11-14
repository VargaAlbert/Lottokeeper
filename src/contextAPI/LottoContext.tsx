import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const useLottoContext = () => {
    return useContext(LottoContext);
};

/* ---type-interface--- */
type LottoProviderProps = {
    children: ReactNode;
};

type lotteryTicket = {
    owner: string;
    lottoId: number,
    LotteryNumbers: number[]
}

interface LottoContextProps {
    generateUniqueRandomNumbers: (counter: number, min: number, max: number, uniqueNumbers: Set<number>) => number[];
    lottoNumbers: number[];
    startLottery: () => void;
    LotteryTicketGridNumbers: number[];
    setLottoObject: (owner: string, LotteryNumbers: number[]) => void;
};

const LottoContext = createContext({} as LottoContextProps)


/* --lotto-contanst--- */
export const MIN_NUMBER: number = 1;
export const MAX_NUMBER: number = 39;
export const LOTTERY_NUMBER: number = 5;

export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {
    const [lottoNumbers, setlottoNumbers] = useState<number[]>([]);
    const [userLutteryNumber, setUserLutteryNumber] = useLocalStorage<lotteryTicket[]>(
        "userLutteryNumber",
        []);
    const [lottoId, setlottoId] = useState<number>(0);


    const generateRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateUniqueRandomNumbers = (counter: number, min: number, max: number, uniqueNumbers: Set<number> = new Set()
    ): number[] => {
        if (counter === 0) {
            return Array.from(uniqueNumbers);
        }

        const randomNumber = generateRandomNumber(min, max);
        if (!uniqueNumbers.has(randomNumber)) {
            uniqueNumbers.add(randomNumber);
            counter--;
        }

        return generateUniqueRandomNumbers(counter, min, max, uniqueNumbers);
    }

    const startLottery = (): void => {
        setlottoNumbers(generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER));
    }

    /* -------------------- */

    const LotteryTicketGridNumbers = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);



    /* --------------------- */

    const setLottoObject = (owner: string, LotteryNumbers: number[]) => {
        setlottoId(lottoId + 1)
        setUserLutteryNumber((userLutteryNumber) => [...userLutteryNumber, { owner, lottoId, LotteryNumbers }]);
    }
    console.log(userLutteryNumber)


    const contextValue: LottoContextProps = {
        lottoNumbers,
        generateUniqueRandomNumbers,
        startLottery,
        LotteryTicketGridNumbers,
        setLottoObject
    };

    return (
        <LottoContext.Provider value={contextValue}>
            {children}
        </LottoContext.Provider>
    );
}

export default LottoContext;
