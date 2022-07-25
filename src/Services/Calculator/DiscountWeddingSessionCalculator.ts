
import { PhotographyService, VideoRecordingService, WeddingSessionService } from "../../Constants/Constants";
import { ServiceType, ServiceYear } from "../../Constants/Types/Types";
import { prices } from "../../Data/TextDb";
import { AbstractCalculator } from "../../Interfaces/ICalculator";
import { serviceExists } from "../ServiceFinder";

export class DiscountWeddingSessionCalculator extends AbstractCalculator {
    public calculate(selectedServices: ServiceType[], selectedYear: ServiceYear, price: number): number {
        let priceBook = prices.find(x => x.Year === selectedYear);

        if (serviceExists(WeddingSessionService, selectedServices)) {

            if (serviceExists(PhotographyService, selectedServices) && selectedYear === 2022)
            {
                price -= priceBook?.WeddingSession;
            }
            else if (serviceExists(PhotographyService, selectedServices) || serviceExists(VideoRecordingService, selectedServices))
            {
                price -= priceBook.WeddingSession - priceBook.WeddingSessionDiscounted;
            }
        }
        return super.calculate(selectedServices, selectedYear, price);
    }
}