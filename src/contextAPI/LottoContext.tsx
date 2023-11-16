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

export type lotteryTicket = {
    owner: string;
    lottoId: number,
    LotteryNumbers: number[],
    hits: number[],
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
    lottoLutteryNumber: lotteryTicket[];
    formatPrice: (price: number) => string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleBlurChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    dataBase: dataBase[];
    setValue: (id: string) => string;
    getMoney: (id: string) => number;
    setMoney: (id: string) => void;
    setGenerateTicket: (e: ChangeEvent<HTMLInputElement>) => void;
    setAdminGenerateTicket: React.Dispatch<React.SetStateAction<string>>;
    adminGenerateTicket: string;
    startGenerateAdminLotteryTicket: () => void;

    userResult: lotteryTicket[];
    setUserSort: React.Dispatch<React.SetStateAction<boolean>>;
    userSort: boolean;
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
    const [lottoLutteryNumber, setlottoLutteryNumber] = useState<lotteryTicket[]>(
        [{
            owner: "",
            lottoId: 0,
            LotteryNumbers: [],
            hits: [],
        }]);

    const [userResult, setUserResult] = useState<lotteryTicket[]>([]);


    const [dataBase, setDataBase] = useLocalStorage<dataBase[]>("dataBase",
        [
            { id: "admin", name: "admin", usd: 0 },
            { id: "user", name: "user", usd: 10_000 }
        ]
    )

    const [adminGenerateTicket, setAdminGenerateTicket] = useState("")
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

            const usd = 500;

            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id && item.usd >= usd) {
                    return {
                        ...item,
                        usd: item.usd - usd,
                    };
                } else if (item.id === "admin") {
                    return {
                        ...item,
                        usd: item.usd + usd,
                    };
                } else {
                    return item;
                }
            });

            return updatedDatabase;
        });
    };


    /* --------------------- */


    const setLottoObject = (owner: string, lotteryNumbers: number[]): void => {
        setlottoLutteryNumber((existingLotto) => {
            const newLottoId = existingLotto.length > 0 ? existingLotto[existingLotto.length - 1].lottoId + 1 : 1;
            const newTicket: lotteryTicket = {
                owner,
                lottoId: newLottoId,
                LotteryNumbers: lotteryNumbers,
                hits: [],
            };
            return [...existingLotto, newTicket];
        });
    };

    const checkAndStoreHits = (numbersToCheck: number[]): void => {

        setlottoLutteryNumber((existingLotto) => {
            const updatedLotto = existingLotto.map((ticket) => {
                const hits = numbersToCheck.filter((number) => ticket.LotteryNumbers.includes(number));
                return {
                    ...ticket,
                    hits: hits.length > 0 ? [...ticket.hits, ...hits] : ticket.hits, // Hozzáadjuk az újonnan talált számokat
                };
            });

            return updatedLotto;
        });

    };

    const [userSort, setUserSort] = useState(false);

    useEffect(() => {
        const sortedTickets: lotteryTicket[] = JSON.parse(JSON.stringify(lottoLutteryNumber));

        if (userSort) {
            sortedTickets.sort((a, b) => a.hits.length - b.hits.length);
        } else {
            sortedTickets.sort((b, a) => a.hits.length - b.hits.length);
        }

        setUserResult(sortedTickets);

    }, [lottoLutteryNumber, userSort]);



    //Árak formázása
    const formatPrice = (price: number) => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }




    /* ------admin------------- */


    const setGenerateTicket = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ?
            (setAdminGenerateTicket(""))
            : (setAdminGenerateTicket(String(Math.floor(Math.abs(limitValue(Number(e.target.value)))))));
    }

    const maxLimit = 99999999;
    const limitValue = (db: number): number => {
        return db > maxLimit ? maxLimit : db;
    };

    /* ----------random lott-----generalás---- */


    const generateAdminLotteryTicket = (counter: number, adminTicket: number[]): number => {
        if (counter === 0) {
            return 0;
        } else {
            counter--;
            setLottoObject("admin", generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER))
            return generateAdminLotteryTicket(counter, adminTicket);
        }
    }

    const startGenerateAdminLotteryTicket = () => {
        generateAdminLotteryTicket(Number(adminGenerateTicket), generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER))
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === "admin") {
                    return {
                        ...item, usd: item.usd + Number(adminGenerateTicket) * 500
                    };
                } else {
                    return item;
                }
            });
            return updatedDatabase;
        });
    }


    const startLottery = (): void => {

        const winNumbers = generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER)

        setlottoNumbers(winNumbers);

        checkAndStoreHits(winNumbers)

        console.table(lottoLutteryNumber)

        // setUserResult(JSON.parse(JSON.stringify(lottoLutteryNumber)));

    }

    console.table(lottoLutteryNumber)

    const contextValue: LottoContextProps = {
        lottoNumbers,
        generateUniqueRandomNumbers,
        startLottery,
        LotteryTicketGridNumbers,
        setLottoObject,
        lottoLutteryNumber,
        formatPrice,
        handleInputChange,
        handleBlurChange,
        dataBase,
        setValue,
        getMoney,
        setMoney,
        setGenerateTicket,
        setAdminGenerateTicket,
        adminGenerateTicket,
        startGenerateAdminLotteryTicket,
        userResult,
        setUserSort,
        userSort,
    };

    return (
        <LottoContext.Provider value={contextValue}>
            {children}
        </LottoContext.Provider>
    );
}

export default LottoContext;
