const changeF = (val: number): number => {
  return parseFloat(((val * 9) / 5 + 32).toFixed(2));
};
export default changeF;
