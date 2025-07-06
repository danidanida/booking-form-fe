import { mockToStations } from '../data/stations';

export const getToStations = async (fromStationValue) => {
    const stationId = fromStationValue?.value;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockToStations[stationId] || []);
        }, 500); // simulate API delay
    });
};