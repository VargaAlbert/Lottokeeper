import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

type LottoProviderProps = {
    children: ReactNode;
};

interface LottoContextProps {

};

const LottoContext = createContext({} as LottoContextProps)

export const useLottoContext = () => {
    return useContext(LottoContext);
};

export const LottoProvider: React.FC<LottoProviderProps> = ({
    children
}) => {

    const contextValue: LottoContextProps = {

    };

    return (
        <LottoContext.Provider value={contextValue}>
            {children}
        </LottoContext.Provider>
    );
}

export default LottoContext;