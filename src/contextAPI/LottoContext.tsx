import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { type } from "os";
import { Console } from "console";

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
    setMoney: (id: string) => void;

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

    //money setting
    const setMoney = (id: string) => {
        setDataBase((prevDatabase) => {
            const updatedDatabase = prevDatabase.map((item) => {
                if (item.id === id && item.usd >= TICKET_PRICE) {
                    return {
                        ...item,
                        usd: item.usd - TICKET_PRICE,
                    };
                } else if (item.id === "admin") {
                    return {
                        ...item,
                        usd: item.usd + TICKET_PRICE,
                    };
                } else {
                    return item;
                }
            });

            return updatedDatabase;
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

    const prizeDistribution = () => {
        const adminUsd = dataBase.find(user => user.id === "admin")?.usd;
    }
    /* -------------NYEREMÉNY MEGHATÁROZÁSA------------ */
    // lottoLutteryNumber
    //const hitsTicketList = lottoLutteryNumber.map((ticket) => (ticket))

    type HitsCount = {
        [key: number]: number
    };

    //találatok darabszámának kigyüjtése.
    const hitsCounts: number[] = lottoLutteryNumber.reduce((acc, ticket) => {
        const hits = ticket.hits.length;
        acc[hits] = (acc[hits] || 0) + 1;
        return acc;
    }, new Array(6).fill(0));


    console.log("4444", hitsCounts);


    type divideNumber = {
        hit5: number;
        hit4: number;
        hit3: number;
        hit2: number;
        profit: number
    }

    //nyeremény meghatározása 
    const divideNumber = (number: number, hitsCounts: HitsCount): divideNumber => {
        const ratioSum = 50 + 24 + 12 + 4 + 10;
        const hit5: number = Math.round((number * 50) / (hitsCounts[5] > 0 ? ratioSum / hitsCounts[5] : ratioSum));
        const hit4: number = Math.round((number * 24) / (hitsCounts[4] > 0 ? ratioSum / hitsCounts[4] : ratioSum));
        const hit3: number = Math.round((number * 12) / (hitsCounts[3] > 0 ? ratioSum / hitsCounts[3] : ratioSum));
        const hit2: number = Math.round((number * 4) / (hitsCounts[2] > 0 ? ratioSum / hitsCounts[2] : ratioSum));
        const profit = number - (hit5 + hit4 + hit3 + hit2);

        return { hit2, hit3, hit4, hit5, profit };
    };

    const result = divideNumber(100, hitsCounts);
    console.log(result);

    //set database lotto ticket
    const setLottoObjectTicketValue = (divideNumber: divideNumber): void => {
        setlottoLutteryNumber((existingLotto) => {
            const updatedLotto = existingLotto.map((ticket) => {
                switch (ticket.hits.length) {
                    case 2:
                        return { ...ticket, ticketValue: ticket.ticketValue + divideNumber.hit2 };
                    case 3:
                        return { ...ticket, ticketValue: ticket.ticketValue + divideNumber.hit3 };
                    case 4:
                        return { ...ticket, ticketValue: ticket.ticketValue + divideNumber.hit4 };
                    case 5:
                        return { ...ticket, ticketValue: ticket.ticketValue + divideNumber.hit5 };
                    default:
                        return ticket;
                }
            });
            return updatedLotto;
        });
    };



    //const inputNumber = 7350; // Példa bemeneti szám
    //const dividedNumbers = divideNumber(inputNumber);
    //console.log(dividedNumbers.hit4); // Az arányok szerint szétosztott számok tömbje */

    console.log(hitsCounts);



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
                if (item.id === "admin") {
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

    //START LOTTERY
    const startLottery = (): void => {

        const winNumbers = generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER)
        setlottoNumbers(winNumbers);
        checkAndStoreHits(winNumbers);
        setLottoObjectTicketValue(divideNumber(100000, hitsCounts));
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
