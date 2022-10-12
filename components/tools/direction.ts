//this is just temporary algo (need better approacch)
const degreeConvert = (degree: number): string => {
  let result = "";
  const deg = {
    n: 0,
    e: 90,
    s: 180,
    w: 270,
  };

  if ((degree = deg.n)) result = "n";
  if ((degree = deg.e)) result = "e";
  if ((degree = deg.s)) result = "s";
  if ((degree = deg.w)) result = "w";

  if (degree > deg.w) result = "nw";
  if (degree > deg.s) result = "sw";
  if (degree > deg.e) result = "se";
  if (degree > deg.n) result = "ne";

  return result;
};

export default degreeConvert;
