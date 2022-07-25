import { ServiceType, ServiceYear } from "../../Constants/Types/Types";
import { prices } from "../../Data/TextDb";
import { AbstractCalculator } from "../../Interfaces/ICalculator";

export class BasePriceCalculator extends AbstractCalculator {
    public calculate(selectedServices: ServiceType[], selectedYear: ServiceYear, price: number): number {

        let priceBook = prices.find(x => x.Year === selectedYear);

        for (var key in selectedServices) {
            if (priceBook.hasOwnProperty(selectedServices[key])) {
                price += priceBook[selectedServices[key]]
            }
        }
        return super.calculate(selectedServices, selectedYear, price);
    }
}