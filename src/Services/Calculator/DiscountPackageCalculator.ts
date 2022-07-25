
import { PhotographyService, VideoRecordingService } from "../../Constants/Constants";
import { ServiceType, ServiceYear } from "../../Constants/Types/Types";
import { prices } from "../../Data/TextDb";
import { AbstractCalculator } from "../../Interfaces/ICalculator";
import { serviceExists } from "../ServiceFinder";

export class DiscountPackageCalculator extends AbstractCalculator {
    public calculate(selectedServices: ServiceType[], selectedYear: ServiceYear, price: number): number {
        let priceBook = prices.find(x => x.Year === selectedYear);
        if (serviceExists(VideoRecordingService, selectedServices) && serviceExists(PhotographyService, selectedServices)) {
            price = price - priceBook.VideoRecording - priceBook.Photography + priceBook.PhotoVideoPackage;
        }
        return super.calculate(selectedServices, selectedYear, price);
    }
}