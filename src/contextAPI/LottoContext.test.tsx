import React from 'react';
import { render } from '@testing-library/react';
import {
    LottoProvider,
    useLottoContext,
    MIN_NUMBER,
    MAX_NUMBER,
    LOTTERY_NUMBER
} from "./LottoContext";

test.each(Array.from({ length: 100 }, (_, index) => index))(
    "Lottery valide numbers",
    () => {
        const TestComponent: React.FC = () => {

            const { addLotteryNumber } = useLottoContext();

            const testLottoNumbers = addLotteryNumber();

            // We check that there is a LOTTERY_NUMBER element in the numbers array
            expect(testLottoNumbers.length).toBe(LOTTERY_NUMBER);

            // Check that all numbers are between MIN_NUMBER and MAX_NUMBER
            testLottoNumbers.map((testLottoNumbers) => {
                expect(testLottoNumbers).toBeGreaterThanOrEqual(MIN_NUMBER);
                expect(testLottoNumbers).toBeLessThanOrEqual(MAX_NUMBER);
            });

            //Check that all numbers are different in the array
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
