import { ServiceType, ServiceYear } from "../Constants/Types/Types";

export interface ICalculator {
    setNext(calculator: ICalculator): ICalculator;

    calculate(selectedServices: ServiceType[], selectedYear: ServiceYear, price: number): number;
}

export abstract class AbstractCalculator implements ICalculator
{
    private nextCalculator: ICalculator;

    public setNext(calculator: ICalculator): ICalculator {
        this.nextCalculator = calculator;
        return calculator;
    }

    public calculate(selectedServices: ServiceType[], selectedYear: ServiceYear, price: number): number {
        if (this.nextCalculator) {
            return this.nextCalculator.calculate(selectedServices, selectedYear, price);
        }

        return price;
    }
}