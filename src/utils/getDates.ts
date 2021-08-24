export const getCurrentMonth = (): string => {
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
  const currentDate = new Date(Date.now()).getMonth();
  return monthsTable[currentDate];
};
export const getCurrentYear = (): number => new Date(Date.now()).getFullYear();
