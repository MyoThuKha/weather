import _ from "lodash";
const changeF = (val: number) => {
  return _.ceil((val * 9) / 5 + 32, 2);
};
export default changeF;
