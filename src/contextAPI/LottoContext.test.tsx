import React from 'react';
import { render } from '@testing-library/react';
import {
    LottoProvider,
    useLottoContext,
    MIN_NUMBER,
    MAX_NUMBER,
    LOTTERY_NUMBER
} from "./LottoContext";

test.each(Array.from({ length: 1 }, (_, index) => index))(
    'numbers',
    () => {
        const TestComponent: React.FC = () => {
            const { lottoNumbers } = useLottoContext();
            // Ellenőrizzük, hogy a numbers tömbben LOTTERY_NUMBER elem van
            expect(lottoNumbers.length).toBe(LOTTERY_NUMBER);

            // Ellenőrizzük, hogy minden szám MIN_NUMBER és MAX_NUMBER között van
            lottoNumbers.map((lottoNumbers) => {
                expect(lottoNumbers).toBeGreaterThanOrEqual(MIN_NUMBER);
                expect(lottoNumbers).toBeLessThanOrEqual(MAX_NUMBER);
            });

            // Ellenőrizzük, hogy minden szám különböző a tömbben
            const uniqueNumbers = new Set(lottoNumbers);
            expect(uniqueNumbers.size).toBe(lottoNumbers.length);

            return null;
        };

        render(
            <LottoProvider>
                <TestComponent />
            </LottoProvider>
        );
    });
