import React from "react";
interface buttonProps {
  children: string;
  curr: boolean;
  isC: boolean;
  handleChange: () => void;
}
const ChangeUnit: React.FC<buttonProps> = ({
  children,
  curr,
  isC,
  handleChange,
}) => {
  const style =
    curr === isC ? "bg-black text-white circle-btn" : "bg-white circle-btn";
  return (
    <button
      onClick={() => {
        handleChange();
      }}
      className={style}
    >
      {children}
    </button>
  );
};
export default ChangeUnit;
