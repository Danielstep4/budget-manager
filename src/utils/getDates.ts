const monthsTable = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonth = (date: number | Date) => {
  const monthIdx = new Date(date).getMonth();
  return monthsTable[monthIdx];
};
export const getYear = (date: number | Date) => {
  return typeof date === "number"
    ? new Date(date).getFullYear().toString()
    : date.getFullYear().toString();
};

export const getCurrentMonth = (): string => {
  const currentDate = new Date().getMonth();
  return monthsTable[currentDate];
};

export const getCurrentYear = (): string => new Date().getFullYear().toString();
