import React from "react";

const FullInfoBar: React.FC<FullInfoBarProps> = ({
  id,
  title,
  seconds,
  category,
  amount,
}) => {
  const DATE = new Date(seconds * 1000).toDateString();
  return <div>{title + DATE + category + amount}</div>;
};

export default FullInfoBar;

interface FullInfoBarProps {
  id: string;
  title: string;
  seconds: number;
  category: string;
  amount: number;
}
