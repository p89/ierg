import { ActionDeselect, ActionSelect, BlurayPackageService, PhotographyService, TwoDayEventService, VideoRecordingService } from "./Constants/Constants";
import { ActionType, ServiceType, ServiceYear } from "./Constants/Types/Types";
import { ICalculator } from "./Interfaces/ICalculator";
import { BasePriceCalculator } from "./Services/Calculator/BasePriceCalculator";
import { DiscountPackageCalculator } from "./Services/Calculator/DiscountPackageCalculator";
import { DiscountWeddingSessionCalculator } from "./Services/Calculator/DiscountWeddingSessionCalculator";
import { serviceExists } from "./Services/ServiceFinder";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: ActionType; service: ServiceType }
) => {

    switch(action.type) {
        case ActionSelect:
            {
                let serviceAlreadySelected = serviceExists(action.service, previouslySelectedServices);

                if (serviceAlreadySelected)
                {
                    return previouslySelectedServices;
                }

                let videoRecordingServiceAlreadySelected = serviceExists(VideoRecordingService, previouslySelectedServices);

                if (action.service === BlurayPackageService) 
                {
                    if (videoRecordingServiceAlreadySelected)
                    {
                        return [...previouslySelectedServices, action.service]
                    }
                    return previouslySelectedServices;
                }
                
                return [...previouslySelectedServices, action.service]  
            };

        case ActionDeselect:
            {
                    let deselectingPhotoVideoPackage = 
                        (action.service === PhotographyService && serviceExists(VideoRecordingService, previouslySelectedServices)) 
                        || action.service === VideoRecordingService && serviceExists(PhotographyService, previouslySelectedServices);

                    let twoDayEventSelected = serviceExists(TwoDayEventService, previouslySelectedServices);
                    
                    if (deselectingPhotoVideoPackage && twoDayEventSelected)
                    {
                        return previouslySelectedServices.filter(el => el !== action.service);
                    }
                    
                    return previouslySelectedServices.filter(el => el !== action.service && el !== TwoDayEventService);
            };

        default:
            return previouslySelectedServices;  
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {

    let basePriceCalculator = new BasePriceCalculator();
    let basePrice = basePriceCalculator.calculate(selectedServices, selectedYear, 0);

    let finalPriceCalculator = initFinalPriceCalculator();
    let finalPrice = finalPriceCalculator.calculate(selectedServices, selectedYear, basePrice);

    return { basePrice, finalPrice }
}

export const initFinalPriceCalculator: () => ICalculator = function() {
    
    let discountPackageCalculator = new DiscountPackageCalculator();
    let discountWeddingSessionCalculator = new DiscountWeddingSessionCalculator();

    discountPackageCalculator.setNext(discountWeddingSessionCalculator);

    return discountPackageCalculator;
}