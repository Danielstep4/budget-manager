export const getSymbol = (currency: string): string => {
  const memo: { [key: string]: string } = {
    ILS: "₪",
  };
  return memo[currency];
};
