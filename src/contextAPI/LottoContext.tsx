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

/* -----------------------------type-interface--------------------------------- */
type LottoProviderProps = {
    children: ReactNode;
};

type divideNumber = {
    hit5: number;
    hit4: number;
    hit3: number;
    hit2: number;
};

export type lotteryTicket = {
    owner: string;
    lottoId: number,
    LotteryNumbers: number[],
    hits: number[],
    ticketValue: number
}

type dataBase = {
    id: string;
    name: string,
    usd: number,
}

interface LottoContextProps {

    sumByKey: <T extends Record<string, any>>(inputArray: T[], objKey: keyof T) => number;

    lottoLutteryNumber: lotteryTicket[];
    lottoLutteryNumberStatistics: lotteryTicket[];
    dataBase: dataBase[];
    adminStatement: divideNumber;

    setAdminGenerateTicket: React.Dispatch<React.SetStateAction<string>>;
    setUserSort: React.Dispatch<React.SetStateAction<boolean>>;



    handleInputChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleBlurChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    setGenerateTicket: (e: ChangeEvent<HTMLInputElement>) => void;
    setLottoObject: (owner: string, LotteryNumbers: number[]) => void;
    formatPrice: (price: number) => string;
    setValue: (id: string) => string;
    getMoney: (id: string) => number;
    moneyTransaction: (sender: string, money: number, beneficiary: string) => void;
    calculateTotalTicketValueById: (data: lotteryTicket[], ownerId: string) => number;
    addLotteryNumber: () => number[];
    startGenerateAdminLotteryTicket: () => void;
    startLottery: () => void;
    resetGame: () => void;

    lottoNumbers: number[];
    LotteryTicketGridNumbers: number[];
    totalWinnings: number;
    adminGenerateTicket: string;
    userSort: boolean;
};

const LottoContext = createContext({} as LottoContextProps)
/* -------------------------------------------------type-end-interface----------------------------------------- */

/* ------------------lotto-contanst-------------------- */
export const MIN_NUMBER: number = 1;
export const MAX_NUMBER: number = 39;
export const LOTTERY_NUMBER: number = 5;
export const TICKET_PRICE: number = 500;

export const USER_ID: string = "user";
export const ADMIN_ID: string = "admin";
const PROFIT_ID: string = "profit";
const COLLECTOR_ID: string = "collector";

const START_AKCSE_USER: number = 10_000;
const START_AKCSE_ADMIN: number = 0;
const START_PRIZE_FUND: number = 0;

const baseLottoDatabase: lotteryTicket = {
    owner: "",
    lottoId: 0,
    LotteryNumbers: [],
    hits: [],
    ticketValue: 0,
};

const baseDataBasee: dataBase[] = [
    { id: COLLECTOR_ID, name: "prize_fund", usd: START_PRIZE_FUND },
    { id: PROFIT_ID, name: "profit", usd: 0 },
    { id: ADMIN_ID, name: "admin", usd: START_AKCSE_ADMIN },
    { id: USER_ID, name: "user", usd: START_AKCSE_USER }
];

const initialDivideNumberState: divideNumber = {
    hit5: 0,
    hit4: 0,
    hit3: 0,
    hit2: 0,
};
/* -----------------totto contanst--------------------- */

export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {

    const [dataBase, setDataBase] = useLocalStorage<dataBase[]>("dataBase", baseDataBasee)

    const [lottoLutteryNumber, setlottoLutteryNumber] = useLocalStorage<lotteryTicket[]>("lottoLutteryNumber", [baseLottoDatabase]);
    const [lottoLutteryNumberStatistics, setlottoLutteryNumberStatistics] = useLocalStorage<lotteryTicket[]>("lottoLutteryNumberStatistics", []); //lottoLutteryNumber copy

    const [lottoNumbers, setlottoNumbers] = useLocalStorage<number[]>("lottoNumbers", []); //winning numbers
    const [adminStatement, setAdminStatement] = useLocalStorage<divideNumber>("adminStatement", (initialDivideNumberState)); //winning numbers

    const [adminGenerateTicket, setAdminGenerateTicket] = useState("")
    const [totalWinnings, setTotalWinnings] = useState<number>(0)

    const [userSort, setUserSort] = useState(false);

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

    const addLotteryNumber = () => {
        return generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER)
    }

    //name setting
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

    //name setting
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

    //money setting
    const setValue = (id: string) => {
        if (dataBase) {
            const foundItem = dataBase.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.name
            }
        }
        return "0";
    }

    //money setting
    const getMoney = (id: string) => {
        if (dataBase) {
            const foundItem = dataBase.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.usd
            }
        }
        return 0;
    }

    //money setting sending / receiving
    const moneyTransaction = (sender: string, money: number, beneficiary: string) => {
        setDataBase((prevDatabase) => {
            const payingUser = prevDatabase.find((item) => item.id === sender);
            const receivingUser = prevDatabase.find(
                (item) => item.id === beneficiary
            );

            if (payingUser && receivingUser && payingUser.usd >= money) {
                const updatedDatabase = prevDatabase.map((item) => {
                    if (item.id === sender) {
                        return {
                            ...item,
                            usd: item.usd - money
                        };
                    } else if (item.id === beneficiary) {
                        return {
                            ...item,
                            usd: item.usd + money
                        };
                    } else {
                        return item;
                    }
                });
                return updatedDatabase;
            } else {
                return prevDatabase; // Visszaadja az eredeti adatbázist, ha valamelyik feltétel nem teljesül
            }
        });
    };

    //money setting
    const formatPrice = (price: number) => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    //set database lotto ticket
    const setLottoObject = (owner: string, lotteryNumbers: number[]): void => {
        setlottoLutteryNumber((existingLotto) => {
            const newLottoId = existingLotto.length > 0 ? existingLotto[existingLotto.length - 1].lottoId + 1 : 1;
            const newTicket: lotteryTicket = {
                owner,
                lottoId: newLottoId,
                LotteryNumbers: lotteryNumbers,
                hits: [],
                ticketValue: 0,
            };
            return [...existingLotto, newTicket];
        });
    };

    /* -------------NYEREMÉNY MEGHATÁROZÁSA------------ */

    const divideAndDistribute = (number: number, data: lotteryTicket[]): divideNumber => {

        //találatok darabszámának kigyüjtése.
        const hitsCounts: number[] = data.reduce((acc, ticket) => {
            const hits = ticket.hits.length;
            acc[hits] = (acc[hits] || 0) + 1;
            return acc;
        }, new Array(6).fill(0));

        const hit5: number = Math.round((number * 54) / 100);
        const hit4: number = Math.round((number * 26) / 100);
        const hit3: number = Math.round((number * 13) / 100);
        const hit2: number = Math.round((number * 6) / 100);

        //profit elosztása és kiutalása.
        const profitValue: number = Math.round((number * 1) / 100);
        moneyTransaction(COLLECTOR_ID, profitValue, PROFIT_ID)

        const distributedHits = {
            hit5: hitsCounts[5] > 0 ? Math.round(hit5 / hitsCounts[5]) : 0,
            hit4: hitsCounts[4] > 0 ? Math.round(hit4 / hitsCounts[4]) : 0,
            hit3: hitsCounts[3] > 0 ? Math.round(hit3 / hitsCounts[3]) : 0,
            hit2: hitsCounts[2] > 0 ? Math.round(hit2 / hitsCounts[2]) : 0,
        };

        return distributedHits;
    };

    /* --------------------user------------------------- */

    //userlottoTicked Grid
    const LotteryTicketGridNumbers = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);

    /* -------------------admin------------------------ */

    //generate db input
    const setGenerateTicket = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ?
            (setAdminGenerateTicket(""))
            : (setAdminGenerateTicket(String(Math.floor(Math.abs(limitValue(Number(e.target.value)))))));
    }

    const maxLimit = 99999999;
    const limitValue = (db: number): number => {
        return db > maxLimit ? maxLimit : db;
    };

    //generate random ticket
    const generateAdminLotteryTicket = (counter: number, adminTicket: number[]): number => {
        if (counter === 0) {
            return 0;
        } else {
            counter--;
            setLottoObject(ADMIN_ID, addLotteryNumber())
            return generateAdminLotteryTicket(counter, adminTicket);
        }
    }

    function sumByKey<T extends Record<string, any>>(inputArray: T[], objKey: keyof T): number {
        return inputArray.reduce((acc, ticket) => acc + (ticket[objKey] || 0), 0);
    }

    //setting database random ticket & admin akcse
    const startGenerateAdminLotteryTicket = () => {
        generateAdminLotteryTicket(Number(adminGenerateTicket), addLotteryNumber())
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === COLLECTOR_ID) {
                    return {
                        ...item, usd: item.usd + Number(adminGenerateTicket) * TICKET_PRICE
                    };
                } else {
                    return item;
                }
            });
            return updatedDatabase;
        });
    }

    function calculateTotalTicketValueById(data: lotteryTicket[], ownerId: string) {
        const filteredData = data.filter((ticket) => ticket.owner === ownerId);
        const totalTicketValue = filteredData.reduce((acc, ticket) => acc + (ticket.ticketValue || 0), 0);
        return totalTicketValue;
    }

    const prizePool = getMoney(COLLECTOR_ID);

    useEffect(() => {
        setTotalWinnings(prizePool);
    }, [prizePool]);


    //START LOTTERY
    const startLottery = (): void => {

        const winNumbers = addLotteryNumber();
        setlottoNumbers(winNumbers);
        setTotalWinnings(prizePool);

        const data = [...lottoLutteryNumber]

        const updatedLotto = data.map((ticket) => {
            const hits = winNumbers.filter((number) => ticket.LotteryNumbers.includes(number));
            return {
                ...ticket,
                hits: hits.length > 0 ? [...ticket.hits, ...hits] : ticket.hits,
            };
        });

        const distributedHits = divideAndDistribute(prizePool, updatedLotto)

        setAdminStatement(distributedHits);
        /* const sumDivideNumbers = (obj: divideNumber): number => {
           return Object.values(obj).reduce((acc, curr) => acc + curr, 0);
       }; */

        const updatedLottoValue = updatedLotto.map((ticket) => {
            switch (ticket.hits.length) {
                case 2:
                    return { ...ticket, ticketValue: distributedHits.hit2 };
                case 3:
                    return { ...ticket, ticketValue: distributedHits.hit3 };
                case 4:
                    return { ...ticket, ticketValue: distributedHits.hit4 };
                case 5:
                    return { ...ticket, ticketValue: distributedHits.hit5 };
                default:
                    return ticket;
            }
        });

        moneyTransaction(COLLECTOR_ID, calculateTotalTicketValueById(updatedLottoValue, ADMIN_ID), ADMIN_ID)
        moneyTransaction(COLLECTOR_ID, calculateTotalTicketValueById(updatedLottoValue, USER_ID), USER_ID)

        setlottoLutteryNumberStatistics(updatedLottoValue)

        setlottoLutteryNumber([baseLottoDatabase]);

    }

    const resetGame = () => {
        setlottoLutteryNumber([baseLottoDatabase]);
        setDataBase(baseDataBasee);
    }

    console.table(lottoLutteryNumber)

    const contextValue: LottoContextProps = {
        lottoNumbers,
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
        moneyTransaction,
        setGenerateTicket,
        setAdminGenerateTicket,
        adminGenerateTicket,
        startGenerateAdminLotteryTicket,
        setUserSort,
        userSort,
        addLotteryNumber,
        calculateTotalTicketValueById,
        totalWinnings,
        resetGame,
        lottoLutteryNumberStatistics,
        sumByKey,
        adminStatement

    };

    return (
        <LottoContext.Provider value={contextValue}>
            {children}
        </LottoContext.Provider>
    );
}

export default LottoContext;
