const formatTime = (unix: number) => {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const formatDate = (unix: number) => {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const day = date.getDay();
  const week = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thirsday",
    "friday",
    "saturday",
  ];

  const time = hours + ":" + minutes;

  const result: string[] = [week[day], time];
  return result;
};

export { formatTime, formatDate };
