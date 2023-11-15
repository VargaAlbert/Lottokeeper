import React from 'react';
import { render } from '@testing-library/react';
import {
    LottoProvider,
    useLottoContext,
    MIN_NUMBER,
    MAX_NUMBER,
    LOTTERY_NUMBER
} from "./LottoContext";

test.each(Array.from({ length: 1000 }, (_, index) => index))(
    "Lottery valide numbers",
    () => {
        const TestComponent: React.FC = () => {

            const { generateUniqueRandomNumbers } = useLottoContext();

            const testLottoNumbers = generateUniqueRandomNumbers(LOTTERY_NUMBER, MIN_NUMBER, MAX_NUMBER)

            // Ellenőrizzük, hogy a numbers tömbben LOTTERY_NUMBER elem van
            expect(testLottoNumbers.length).toBe(5);

            // Ellenőrizzük, hogy minden szám MIN_NUMBER és MAX_NUMBER között van
            testLottoNumbers.map((testLottoNumbers) => {
                expect(testLottoNumbers).toBeGreaterThanOrEqual(MIN_NUMBER);
                expect(testLottoNumbers).toBeLessThanOrEqual(MAX_NUMBER);
            });

            // Ellenőrizzük, hogy minden szám különböző a tömbben
            const uniqueNumbers = Array.from(new Set(testLottoNumbers));
            expect(uniqueNumbers.length).toBe(testLottoNumbers.length);

            return null;
        };

        render(
            <LottoProvider>
                <TestComponent />
            </LottoProvider>
        );
    });
