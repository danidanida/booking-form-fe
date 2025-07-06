export const stations = [
  { label: 'Bangkok Central', value: 'BKK' },
  { label: 'Chiang Mai Terminal', value: 'CNX' },
  { label: 'Phuket Main Station', value: 'HKT' },
  { label: 'Pattaya Station', value: 'PTY' },
  { label: 'Hat Yai Junction', value: 'HDY' },
];

export const mockToStations = {
  BKK: [
    { label: 'Chiang Mai Terminal', value: 'CNX' },
    { label: 'Phuket Main Station', value: 'HKT' },
    { label: 'Pattaya Station', value: 'PTY' },
  ],
  CNX: [
    { label: 'Bangkok Central', value: 'BKK' },
    { label: 'Hat Yai Junction', value: 'HDY' },
  ],
  HKT: [
    { label: 'Bangkok Central', value: 'BKK' },
  ],
  PTY: [
    { label: 'Chiang Mai Terminal', value: 'CNX' },
  ],
  HDY: [
    { label: 'Phuket Main Station', value: 'HKT' },
    { label: 'Bangkok Central', value: 'BKK' },
  ],
};