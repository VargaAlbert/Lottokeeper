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

    lottoLutteryNumber: lotteryTicket[];
    userResult: lotteryTicket[];

    setAdminGenerateTicket: React.Dispatch<React.SetStateAction<string>>;
    setUserSort: React.Dispatch<React.SetStateAction<boolean>>;

    generateUniqueRandomNumbers: (counter: number, min: number, max: number) => number[];
    handleInputChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleBlurChange: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    setGenerateTicket: (e: ChangeEvent<HTMLInputElement>) => void;
    setLottoObject: (owner: string, LotteryNumbers: number[]) => void;
    formatPrice: (price: number) => string;
    setValue: (id: string) => string;
    getMoney: (id: string) => number;
    moneyTransaction: (sender: string, money: number, beneficiary: string) => void;

    startGenerateAdminLotteryTicket: () => void;
    startLottery: () => void;

    lottoNumbers: number[];
    LotteryTicketGridNumbers: number[];
    dataBase: dataBase[];

    adminGenerateTicket: string;
    userSort: boolean;
};

const LottoContext = createContext({} as LottoContextProps)
/* -------------------------------------------------type-end-interface----------------------------------------- */



/* ------------------lotto-contanst-------------------- */
export const MIN_NUMBER: number = 1;
export const MAX_NUMBER: number = 39;
export const LOTTERY_NUMBER: number = 5;
export const TICKET_PRICE = 500;
/* -----------------totto contanst--------------------- */


export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {

    const [lottoLutteryNumber, setlottoLutteryNumber] = useState<lotteryTicket[]>(
        [{
            owner: "",
            lottoId: 0,
            LotteryNumbers: [],
            hits: [],
            ticketValue: 0,
        }]);

    const [dataBase, setDataBase] = useLocalStorage<dataBase[]>("dataBase",
        [
            { id: "collector", name: "prize_fund", usd: 0 },
            { id: "profit", name: "profit", usd: 0 },

            { id: "admin", name: "admin", usd: 0 },
            { id: "user", name: "user", usd: 10_000 }
        ]
    )




    const [lottoNumbers, setlottoNumbers] = useLocalStorage<number[]>("lottoNumbers", []);
    const [userResult, setUserResult] = useState<lotteryTicket[]>([]);

    const [adminGenerateTicket, setAdminGenerateTicket] = useState("")
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

    //set database hits number
    const checkAndStoreHits = (numbersToCheck: number[], data: lotteryTicket[]): lotteryTicket[] => {
        const updatedLotto = data.map((ticket) => {
            const hits = numbersToCheck.filter((number) => ticket.LotteryNumbers.includes(number));
            return {
                ...ticket,
                hits: hits.length > 0 ? [...ticket.hits, ...hits] : ticket.hits,
            };
        });

        return updatedLotto;
    };




    // console.log("Admin pénze", prizeDistribution) 

    /* -------------NYEREMÉNY MEGHATÁROZÁSA------------ */
    // lottoLutteryNumber
    //const hitsTicketList = lottoLutteryNumber.map((ticket) => (ticket))

    type HitsCount = {
        [key: number]: number
    };





    type divideNumber = {
        hit5: number;
        hit4: number;
        hit3: number;
        hit2: number;
    };


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

        const distributedHits = {
            hit5: hitsCounts[5] > 0 ? Math.round(hit5 / hitsCounts[5]) : 0,
            hit4: hitsCounts[4] > 0 ? Math.round(hit4 / hitsCounts[4]) : 0,
            hit3: hitsCounts[3] > 0 ? Math.round(hit3 / hitsCounts[3]) : 0,
            hit2: hitsCounts[2] > 0 ? Math.round(hit2 / hitsCounts[2]) : 0
        };
        return distributedHits;
    };


    const sumDivideNumbers = (obj: divideNumber): number => {
        return Object.values(obj).reduce((acc, curr) => acc + curr, 0);
    };

    /*      const result = divideAndDistribute(10_000, hitsCounts);
        console.log("Eredmények", result);
     
        const sum = sumDivideNumbers(result);
        console.log("Divide Number értékek összege:", sum);
     */

    //set database lotto ticket
    const setLottoObjectTicketValue = (result: divideNumber, data: lotteryTicket[]): lotteryTicket[] => {

        const updatedLotto = data.map((ticket) => {
            switch (ticket.hits.length) {
                case 2:
                    return { ...ticket, ticketValue: result.hit2 };
                case 3:
                    return { ...ticket, ticketValue: result.hit3 };
                case 4:
                    return { ...ticket, ticketValue: result.hit4 };
                case 5:
                    return { ...ticket, ticketValue: result.hit5 };
                default:
                    return ticket;
            }
        });

        return updatedLotto;
    };

    //console.log(hitsCounts);

    /* --------------------user------------------------- */

    //deep coopy database, sorting user
    useEffect(() => {
        const sortedTickets: lotteryTicket[] = JSON.parse(JSON.stringify(lottoLutteryNumber));
        if (userSort) {
            sortedTickets.sort((a, b) => a.hits.length - b.hits.length);
        } else {
            sortedTickets.sort((b, a) => a.hits.length - b.hits.length);
        }
        setUserResult(sortedTickets);

    }, [lottoLutteryNumber, userSort]);


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
            setLottoObject("admin", generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER))
            return generateAdminLotteryTicket(counter, adminTicket);
        }
    }

    //setting database random ticket & admin akcse
    const startGenerateAdminLotteryTicket = () => {
        generateAdminLotteryTicket(Number(adminGenerateTicket), generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER))
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === "collector") {
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

    const prizeDistribution = () => {
        const adminUser = dataBase.find(user => user.id === "collector");
        return adminUser ? adminUser.usd : 0; // Visszaadja az admin felhasználó usd értékét, vagy 0-t, ha nincs ilyen felhasználó az adatbázisban
    }


    //START LOTTERY
    const startLottery = (): void => {
        const winNumbers = generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER)

        const data = [...lottoLutteryNumber]


        const collector = dataBase.find((user) => user.id === "collector");
        const prizePool: number = collector ? collector.usd : 0; // Alapértelmezett érték, ha nincs találat

        console.log(prizePool)


        setlottoNumbers(winNumbers);

        const fasff = checkAndStoreHits(winNumbers, data);
        /* ------ */

        setlottoLutteryNumber(setLottoObjectTicketValue(divideAndDistribute(prizePool, checkAndStoreHits(winNumbers, data)), checkAndStoreHits(winNumbers, data)));


    }
    //console.warn(lottoLutteryNumber);


    //console.warn(hitsCounts);
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
        moneyTransaction,
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
