export interface Train {
  id: number;
  name: string;
  number: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
}

export const stations = [
  "Addis Ababa",
  "Adama",
  "Dire Dawa",
  "Hawassa",
  "Bahir Dar",
  "Mekelle",
  "Djibouti",
  "Gondar",
];

export const mockTrains: Train[] = [
  { id: 1, name: "Sheger Express", number: "TR-101", from: "Addis Ababa", to: "Adama", departureTime: "06:00", arrivalTime: "08:00", duration: "2h 0m", price: 150, availableSeats: 32 },
  { id: 2, name: "Awash Runner", number: "TR-102", from: "Addis Ababa", to: "Adama", departureTime: "09:30", arrivalTime: "11:30", duration: "2h 0m", price: 180, availableSeats: 18 },
  { id: 3, name: "Rift Valley Line", number: "TR-103", from: "Addis Ababa", to: "Adama", departureTime: "14:00", arrivalTime: "16:15", duration: "2h 15m", price: 160, availableSeats: 24 },
  { id: 4, name: "Eastern Star", number: "TR-201", from: "Addis Ababa", to: "Dire Dawa", departureTime: "07:00", arrivalTime: "16:00", duration: "9h 0m", price: 720, availableSeats: 40 },
  { id: 5, name: "Djibouti Express", number: "TR-202", from: "Addis Ababa", to: "Djibouti", departureTime: "08:00", arrivalTime: "20:00", duration: "12h 0m", price: 1200, availableSeats: 28 },
  { id: 6, name: "Lake Liner", number: "TR-301", from: "Addis Ababa", to: "Hawassa", departureTime: "07:30", arrivalTime: "11:30", duration: "4h 0m", price: 380, availableSeats: 22 },
  { id: 7, name: "Tana Express", number: "TR-401", from: "Addis Ababa", to: "Bahir Dar", departureTime: "06:30", arrivalTime: "13:30", duration: "7h 0m", price: 650, availableSeats: 30 },
  { id: 8, name: "Northern Light", number: "TR-501", from: "Addis Ababa", to: "Mekelle", departureTime: "05:00", arrivalTime: "16:00", duration: "11h 0m", price: 980, availableSeats: 15 },
  { id: 9, name: "Castle Route", number: "TR-402", from: "Bahir Dar", to: "Gondar", departureTime: "10:00", arrivalTime: "13:00", duration: "3h 0m", price: 280, availableSeats: 26 },
  { id: 10, name: "Adama Shuttle", number: "TR-104", from: "Adama", to: "Addis Ababa", departureTime: "17:00", arrivalTime: "19:00", duration: "2h 0m", price: 150, availableSeats: 35 },
];

export function searchTrains(from: string, to: string): Train[] {
  return mockTrains.filter(
    (t) => t.from.toLowerCase() === from.toLowerCase() && t.to.toLowerCase() === to.toLowerCase()
  );
}

export function getTrainById(id: number): Train | undefined {
  return mockTrains.find((t) => t.id === id);
}
