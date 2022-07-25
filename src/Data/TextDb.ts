export type yearlyPriceList = {
    Year: number;
    Photography: number;
    VideoRecording: number;
    PhotoVideoPackage: number;
    BlurayPackage: number;
    TwoDayEvent: number;
    WeddingSession: number;
    WeddingSessionDiscounted: number;
}
export type priceBook = yearlyPriceList[];

export const prices:priceBook = [{
    Year: 2020,
    Photography: 1700,
    VideoRecording: 1700,
    PhotoVideoPackage: 2200,
    BlurayPackage: 300,
    WeddingSession: 600,
    WeddingSessionDiscounted: 300,
    TwoDayEvent: 400
},
{
    Year: 2021,
    Photography: 1800,
    VideoRecording: 1800,
    PhotoVideoPackage: 2300,
    BlurayPackage: 300,
    WeddingSession: 600,
    WeddingSessionDiscounted: 300,
    TwoDayEvent: 400
},
{
    Year: 2022,
    Photography: 1900,
    VideoRecording: 1900,
    PhotoVideoPackage: 2500,
    BlurayPackage: 300,
    WeddingSession: 600,
    WeddingSessionDiscounted: 300,
    TwoDayEvent: 400
}]