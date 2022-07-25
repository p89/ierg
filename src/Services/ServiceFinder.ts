import { ServiceType } from "../Constants/Types/Types";

export function serviceExists(serviceName: ServiceType, collection: ServiceType[]): boolean { return collection.indexOf(serviceName) > -1};