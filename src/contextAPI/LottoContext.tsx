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

type dataBaseAkcse = {
    id: string,
    name: string,
    akcse: number,
};

export type lotteryTicket = {
    owner: string,
    lottoId: number,
    LotteryNumbers: number[],
    hits: number[],
    ticketValue: number,
};

type drawingResults = {
    hitsCounts: number[],
    priceHit: number[],
    priceTicket: number[],
    priceHitPaid: number[],
    profitValue: number,
    ticketIncomeSum: number,
};

type winningNumbert = {
    winningNumbers: number[],
    lottery: number,
};

interface LottoContextProps {

    sumByKey: <T extends Record<string, any>>(inputArray: T[], objKey: keyof T) => number;

    lottoLotteryNumber: lotteryTicket[];
    lottoLotteryNumberStatistics: lotteryTicket[];
    dataBaseAkcse: dataBaseAkcse[];
    adminStatement: drawingResults;
    winningNumbers: winningNumbert;

    setAdminGenerateTicket: React.Dispatch<React.SetStateAction<string>>;

    handleInputChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleBlurChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    setGenerateTicket: (e: ChangeEvent<HTMLInputElement>) => void;
    setLottoObject: (owner: string, LotteryNumbers: number[]) => void;
    formatPrice: (price: number) => string;
    setInputValue: (id: string) => string;
    getMoney: (id: string) => number;
    moneyTransaction: (sender: string, money: number, beneficiary: string) => void;
    calculateTotalTicketValueById: (data: lotteryTicket[], ownerId: string) => number;
    addLotteryNumber: () => number[];
    startGenerateAdminLotteryTicket: () => void;
    startLottery: () => void;
    resetGame: () => void;

    LotteryTicketGridNumbers: number[];
    totalWinnings: number;
    adminGenerateTicket: string;
};

const LottoContext = createContext({} as LottoContextProps)
/* -type-end-interface- */

/* ---lotto-contanst--- */
export const MIN_NUMBER: number = 1;
export const MAX_NUMBER: number = 39;
export const LOTTERY_NUMBER: number = 5;
export const TICKET_PRICE: number = 500;

const MAX_GENERATE_TICKET: number = 5_000;

export const USER_ID: string = "user";
export const ADMIN_ID: string = "admin";
const PROFIT_ID: string = "profit";
export const COLLECTOR_ID: string = "collector";

const START_AKCSE_USER: number = 10_000;
const START_AKCSE_ADMIN: number = 0;
const START_PRIZE_FUND: number = 0;

export const ADMIN_STATEMENT_MIN_HIT_NUMBER = 2;
/* --hit-price%-- */
//! (HIT_ALL + PROFIT)SUM === 100 //!
const PRIZE_FUND_DISTRIBUTION = {
    PROFIT: 2,//%
    PAYOUT_PERCENTAGES: {
        HIT_0: 0,//%
        HIT_1: 0,//%
        HIT_2: 6,//%
        HIT_3: 12,//%
        HIT_4: 28,//%
        HIT_5: 50,//%
    }
}

/* ---init-data--- */

//name, akcse, money movement
const initialDataBasee: dataBaseAkcse[] = [
    { id: COLLECTOR_ID, name: "prize_fund", akcse: START_PRIZE_FUND },
    { id: PROFIT_ID, name: "profit", akcse: 0 },
    { id: ADMIN_ID, name: "admin", akcse: START_AKCSE_ADMIN },
    { id: USER_ID, name: "user", akcse: START_AKCSE_USER }
];

//lotto slip data
const initialLottoDatabase: lotteryTicket = {
    owner: "",
    lottoId: 0,
    LotteryNumbers: [],
    hits: [],
    ticketValue: 0,
};

//lottery results
const initZeroArrsy = Array(LOTTERY_NUMBER + 1).fill(0)
const initialdrawingResultsState: drawingResults = {
    hitsCounts: initZeroArrsy,
    priceHit: initZeroArrsy,
    priceTicket: initZeroArrsy,
    priceHitPaid: initZeroArrsy, //paiDoutPriceHit
    profitValue: 0,
    ticketIncomeSum: 0,
};

//winning Number
const initialWinningNumber: winningNumbert = {
    winningNumbers: [],
    lottery: 0,
}

export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {

    /* --state -- */
    const [dataBaseAkcse, setDataBaseAkcse] = useLocalStorage<dataBaseAkcse[]>(
        "dataBaseAkcse", initialDataBasee
    );
    const [lottoLotteryNumber, setlottoLotteryNumber] = useLocalStorage<lotteryTicket[]>(
        "lottoLotteryNumber", [initialLottoDatabase]
    );
    const [lottoLotteryNumberStatistics, setlottoLotteryNumberStatistics] = useLocalStorage<lotteryTicket[]>(
        "lottoLotteryNumberStatistics", []
    ); //lottoLotteryNumber copy
    const [winningNumbers, setWinningNumbers] = useLocalStorage<winningNumbert>(
        "winningNumbers", initialWinningNumber
    ); //setWinningNumbers
    const [adminStatement, setAdminStatement] = useLocalStorage<drawingResults>(
        "adminStatement", initialdrawingResultsState
    );

    const [adminGenerateTicket, setAdminGenerateTicket] = useState("");
    const [totalWinnings, setTotalWinnings] = useState<number>(0);
    /* --state end-- */

    /* --random-number-gener-generation-- */
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
    /* -random-number-gener-generation-end- */


    /* --dataBaseAkcse-money-function-- */

    //money setting
    const getMoney = (id: string) => {
        const foundItem = dataBaseAkcse?.find((item) => item.id === id);
        return foundItem ? foundItem.akcse : 0;
    }


    //money setting sending / receiving
    const moneyTransaction = (sender: string, money: number, beneficiary: string) => {
        setDataBaseAkcse((prevDatabase) => {

            const payingUser = prevDatabase.find((item) => item.id === sender);
            const receivingUser = prevDatabase.find((item) => item.id === beneficiary);

            if (payingUser && receivingUser && payingUser.akcse >= money) {
                const updatedDatabase = prevDatabase.map((item) => {
                    if (item.id === sender) {
                        return {
                            ...item,
                            akcse: item.akcse - money
                        };
                    } else if (item.id === beneficiary) {
                        return {
                            ...item,
                            akcse: item.akcse + money
                        };
                    } else {
                        return item;
                    }
                });
                return updatedDatabase;
            } else {
                return prevDatabase;
            }
        });
    };

    //money formatting
    const formatPrice = (price: number): string => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    /* --dataBaseAkcse-money-function--end-- */


    /* --lotteryTicket-data-base-operations--*/

    //set lotteryTicket, lotto ticket
    const setLottoObject = (owner: string, LotteryNumbers: number[]): void => {
        setlottoLotteryNumber((existingLotto) => {
            const newLottoId = existingLotto[existingLotto.length - 1].lottoId + 1;
            const newTicket: lotteryTicket = {
                owner,
                lottoId: newLottoId,
                LotteryNumbers,
                hits: [],
                ticketValue: 0,
            };
            return [...existingLotto, newTicket];
        });
    };

    //generate db input admin
    const setGenerateTicket = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ?
            (setAdminGenerateTicket(""))
            : (setAdminGenerateTicket(String(Math.floor(Math.abs(limitValue(Number(e.target.value)))))));
    }

    //max limit input
    const limitValue = (db: number): number => {
        return db > MAX_GENERATE_TICKET ? MAX_GENERATE_TICKET : db;
    };

    //generate random ticket
    const generateAdminLotteryTicket = (counter: number): number => {
        if (counter === 0) {
            return 0;
        } else {
            counter--;
            setLottoObject(ADMIN_ID, addLotteryNumber())
            return generateAdminLotteryTicket(counter);
        }
    }

    //setting database random ticket & admin akcse
    const startGenerateAdminLotteryTicket = () => {
        generateAdminLotteryTicket(Number(adminGenerateTicket))

        setDataBaseAkcse((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === COLLECTOR_ID) {
                    return {
                        ...item, akcse: item.akcse + Number(adminGenerateTicket) * TICKET_PRICE
                    };
                } else {
                    return item;
                }
            });
            return updatedDatabase;
        });
    }

    //lotteryTicket sum ticket value, by id
    function calculateTotalTicketValueById(data: lotteryTicket[], ownerId: string) {
        const filteredData = data.filter((ticket) => ticket.owner === ownerId);
        const totalTicketValue = filteredData.reduce((acc, ticket) => acc + (ticket.ticketValue || 0), 0);
        return totalTicketValue;
    }

    /* --lotteryTicket-data-base-operations-end--*/


    /* --drawingResults-operations-- */

    const divideAndDistribute = (prizeFund: number, data: lotteryTicket[]): drawingResults => {

        const winningPercentages: number[] = Object.values(PRIZE_FUND_DISTRIBUTION.PAYOUT_PERCENTAGES);

        const hitsCounts: number[] = new Array(LOTTERY_NUMBER + 1).fill(0);

        data.reduce((total, ticket) => {
            const hits = ticket.hits.length;
            hitsCounts[hits]++;
            return total + hits;
        }, 0);

        const priceHit: number[] = winningPercentages.map((percentage) =>
            Math.round((prizeFund * percentage) / 100)
        );

        const priceTicket: number[] = hitsCounts.map((count, index) => {
            if (index !== 0 && count !== 0) {
                return Math.round(priceHit[index] / count);
            } else {
                return 0;
            }
        });

        const priceHitPaid: number[] = hitsCounts.map((count, index) => {
            return count ? priceTicket[index] * count : 0;
        });

        const profitValue: number = Math.round((prizeFund * PRIZE_FUND_DISTRIBUTION.PROFIT) / 100);
        moneyTransaction(COLLECTOR_ID, profitValue, PROFIT_ID);

        const ticketIncomeSum = (data.length - 1) * TICKET_PRICE

        const distributedHits: drawingResults = {
            hitsCounts,
            priceHit,
            priceTicket,
            priceHitPaid,
            profitValue,
            ticketIncomeSum
        };

        return distributedHits;
    };

    /* --drawingResults-operations-end-- */

    //winning pool setting
    const prizePool = getMoney(COLLECTOR_ID);
    useEffect(() => {
        setTotalWinnings(prizePool);
    }, [prizePool]);


    //START LOTTERY
    const startLottery = (): void => {

        const winNumbers = addLotteryNumber();

        const winNumbersRender: winningNumbert = {
            winningNumbers: winNumbers,
            lottery: winningNumbers.lottery + 1
        }

        setWinningNumbers(winNumbersRender);

        setTotalWinnings(prizePool);

        const data = [...lottoLotteryNumber]

        const updatedLotto = data.map((ticket) => {
            const hits: number[] = winNumbers.filter((number) => ticket.LotteryNumbers.includes(number));
            return {
                ...ticket,
                hits: hits.length > 0 ? [...ticket.hits, ...hits] : ticket.hits,
            };
        });

        const distributedHits = divideAndDistribute(prizePool, updatedLotto)

        setAdminStatement(distributedHits);

        const updatedLottoValue = updatedLotto.map((ticket) => {
            return { ...ticket, ticketValue: distributedHits.priceTicket[ticket.hits.length] };
        });

        moneyTransaction(COLLECTOR_ID, calculateTotalTicketValueById(updatedLottoValue, ADMIN_ID), ADMIN_ID)
        moneyTransaction(COLLECTOR_ID, calculateTotalTicketValueById(updatedLottoValue, USER_ID), USER_ID)

        setlottoLotteryNumberStatistics(updatedLottoValue)
        setlottoLotteryNumber([initialLottoDatabase]);
    }

    //GAME RESET
    const resetGame = () => {
        setWinningNumbers(initialWinningNumber)
        setlottoLotteryNumber([initialLottoDatabase]);
        setlottoLotteryNumberStatistics([])
        setDataBaseAkcse(initialDataBasee);
        setAdminStatement(initialdrawingResultsState);
    }


    /* ------ */
    function sumByKey<T extends Record<string, any>>(inputArray: T[], objKey: keyof T): number {
        return inputArray.reduce((acc, ticket) => acc + (ticket[objKey] || 0), 0);
    }

    //userlottoTicked Grid
    const LotteryTicketGridNumbers = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);

    //name setting
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        setDataBaseAkcse((prevDatabase) => {
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
        setDataBaseAkcse((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id) {
                    if (event.target.value !== "") {
                        return { ...item, name: event.target.value };
                    } else {
                        return { ...item, name: item.id };
                    }
                } else {
                    return item;
                }
            });
            return updatedDatabase;
        });
    }

    // name value setting
    const setInputValue = (id: string) => {
        const foundItem = dataBaseAkcse?.find((item) => item.id === id);
        if (foundItem) {
            return foundItem.name
        }
        return "no name";
    }

    const contextValue: LottoContextProps = {
        winningNumbers,
        startLottery,
        LotteryTicketGridNumbers,
        setLottoObject,
        lottoLotteryNumber,
        formatPrice,
        handleInputChange,
        handleBlurChange,
        dataBaseAkcse,
        setInputValue,
        getMoney,
        moneyTransaction,
        setGenerateTicket,
        setAdminGenerateTicket,
        adminGenerateTicket,
        startGenerateAdminLotteryTicket,
        addLotteryNumber,
        calculateTotalTicketValueById,
        totalWinnings,
        resetGame,
        lottoLotteryNumberStatistics,
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
