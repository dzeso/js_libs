function getISODateFromStamp(param) {
/* {timestemp: дата в милисекундах, mode: режим отображения}*/
    const date = new Date(+param.timestamp - new Date().getTimezoneOffset() * 60000).toISOString();
    let result = date.slice(0, 19);
    if (param.mode == "hh:mm") result = date.slice(0, 16);
    else if (param.mode == "hh:mm:s0") result = date.slice(0, 18) + "0";
    return result.replace("T", " ");
}

function getNextMoment(param) {
/* {date: "2018-08-06 17:41:34", mode: "hh:mm"}*/
    let interval = 60;
    if (param.mode == "hh:mm:s0") interval = 10;
    else if (param.mode == "hh:mm:ss") interval = 1;
    return getISODateFromStamp({
        timestamp: (1000 * interval + Date.parse(param.date)),
        mode: param.mode
    });
}

function getTimeFromISODate(param) {
    /* {date: "2018-08-06 17:41:34", mode: "hh:mm"}*/
    if (param.mode == "hh:mm") return param.date.slice(11, 16);
    else if (param.mode == "hh:mm:s0") return param.date.slice(11, 18) + "0";
    else if (param.mode == "hh:mm:ss") return param.date.slice(11, 19);
    return param.date;
}

function getDataFromMarketPriceByDate(param) {
/* {data: данные в формате api contractMarketPrice за конкретную дату,
date: дата записи,
instrumentIndex: пордяк значений результурющей строки для массива,
dataKey: название поля чье значение надо в индекс

возвращает массив [дата, dataKey по инстурментам в порядке instrumentIndex]
}*/
    let result = [param.date];
    result[Object.keys(param.instrumentIndex).length] = undefined;
    for (let instrument in param.data[param.date]) {
        result[param.instrumentIndex[instrument]] = param.data[param.date][instrument][param.dataKey];
    }
    return result;
}

function getNewMarketPrices(param) {
    /* {data: данные в формате api contractMarketPrice, 
  currentRecord: текущая запись,
  lastRecord: последняя запись,
  timeMode: режим обработки времени}

  возвращает массив результатаов getDataFromMarketPriceForChart с проставленной датой*/
    let currentRecord = param.currentRecord;
    let newData = [];
    while (currentRecord < param.lastRecord) {
        let nextRecord = getNextMoment({
            date: currentRecord,
            mode: param.timeMode
        });
        if (param.data[currentRecord]) {
            newData.push(getDataFromMarketPriceByDate({
                data: param.data,
                date: currentRecord,
                instrumentIndex: param.instrumentIndex,
                dataKey: "vol",
            }));
        }
        currentRecord = nextRecord;
    }
    return newData;
}