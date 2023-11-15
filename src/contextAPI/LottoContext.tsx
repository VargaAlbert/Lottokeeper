import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
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
    LotteryNumbers: number[],
}


type dataBase = {
    id: string;
    name: string,
    usd: number,
}

interface LottoContextProps {
    generateUniqueRandomNumbers: (counter: number, min: number, max: number) => number[];
    lottoNumbers: number[];
    startLottery: () => void;
    LotteryTicketGridNumbers: number[];
    setLottoObject: (owner: string, LotteryNumbers: number[]) => void;
    lottoKeeperLutteryNumber: lotteryTicket[];
    formatPrice: (price: number) => string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleBlurChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    dataBase: dataBase[];
    setValue: (id: string) => string;
    getMoney: (id: string) => number;
    setMoney: (id: string) => void;
};

const LottoContext = createContext({} as LottoContextProps)
/* ---type-end-interface--- */



/* --lotto-contanst--- */
export const MIN_NUMBER: number = 1;
export const MAX_NUMBER: number = 39;
export const LOTTERY_NUMBER: number = 5;




export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {
    /* --state--- */
    const [lottoNumbers, setlottoNumbers] = useLocalStorage<number[]>("lottoNumbers", []);
    const [lottoKeeperLutteryNumber, setLottoKeeperLutteryNumber] = useLocalStorage<lotteryTicket[]>(
        "lottoKeeperLutteryNumber",
        []);
    const [lottoId, setlottoId] = useLocalStorage<number>("lottoId", 1);

    /* ---user--- */
    const [dataBase, setDataBase] = useLocalStorage<dataBase[]>("dataBase",
        [
            { id: "admin", name: "admin", usd: 0 },
            { id: "user", name: "user", usd: 1000 }
        ]
    )

    /* --state end-- */

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
    console.log(lottoNumbers)
    /* -----user------ */

    //userlottoTicked Grid
    const LotteryTicketGridNumbers = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id) {
                    return { ...item, name: event.target.value };
                } else {
                    return item;
                }
            });

            return updatedDatabase;
        });
    };


    const handleBlurChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {

        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id) {
                    if (event.target.value !== "") {
                        return { ...item, name: event.target.value };
                    } else {
                        return { ...item, name: "USER" };
                    }
                } else {
                    return item;
                }
            });

            return updatedDatabase;
        });
    }

    console.log(dataBase)

    const setValue = (id: string) => {
        if (dataBase) {
            const foundItem = dataBase.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.name
            }
        }
        return "0";
    }

    const getMoney = (id: string) => {
        if (dataBase) {
            const foundItem = dataBase.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.usd
            }
        }
        return 0;
    }

    const setMoney = (id: string) => {
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id && item.usd >= 500) {
                    return {
                        ...item, usd: item.usd - 500
                    };
                } else {
                    return item;
                }
            });
            return updatedDatabase;
        });
    };




    /* --------------------- */

    const setLottoObject = (owner: string, LotteryNumbers: number[]) => {
        setlottoId(lottoId + 1)
        setLottoKeeperLutteryNumber((lottoKeeperLutteryNumber) => [...lottoKeeperLutteryNumber, { owner, lottoId, LotteryNumbers }]);
    }








    //Árak formázása
    const formatPrice = (price: number) => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }










    const contextValue: LottoContextProps = {
        lottoNumbers,
        generateUniqueRandomNumbers,
        startLottery,
        LotteryTicketGridNumbers,
        setLottoObject,
        lottoKeeperLutteryNumber,
        formatPrice,
        handleInputChange,
        handleBlurChange,
        dataBase,
        setValue,
        getMoney,
        setMoney,
    };

    return (
        <LottoContext.Provider value={contextValue}>
            {children}
        </LottoContext.Provider>
    );
}

export default LottoContext;
