function getISODateFromStamp(param) {
  /* {timestemp: дата в милисекундах, mode: режим отображения}*/
  const date = new Date(+param.timestamp - new Date().getTimezoneOffset() * 60000).toISOString();
  let result = date.slice(0, 19);
  if (param.mode == "hh:mm") result = date.slice(0, 16)
  else if (param.mode == "hh:mm:s0") result = date.slice(0, 18) + "0"
  return result.replace("T", " ");
}

function getNextMoment(param) {
  /* {date: "2018-08-06 17:41:34", mode: "hh:mm"}*/
  let interval = 60;
  if (param.mode == "hh:mm:s0") interval = 10
  else if (param.mode == "hh:mm:ss") interval = 1;
  return getISODateFromStamp({
    timestamp: (1000 * interval + Date.parse(param.date)),
    mode: param.mode
  });
}

function getTimeFromISODate(param) {
  /* {date: "2018-08-06 17:41:34", mode: "hh:mm"}*/
  if (param.mode == "hh:mm") return param.date.slice(11, 16)
  else if (param.mode == "hh:mm:s0") return param.date.slice(11, 18) + "0"
  else if (param.mode == "hh:mm:ss") return param.date.slice(11, 19);
  return param.date;
}