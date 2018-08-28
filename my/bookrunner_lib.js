function getEmptyChartArray(param) {
    /*  colsNumber: заголовок для данных,
        rowsNumver: количество строк отображаемые на экране,
        firstRowVal: { - инициализация первой строки данных
          f: значение первой колонки,
          a: значение прочих колонок
          },
        rowsVal: { - инициализация значений остальных строк
          f: "",
          a: undefined}
    */
    let result = [[param.firstRowVal.f]];    
    for (let i=1; i<param.colsNumber; i++) { 
        result[0][i] = param.firstRowVal.a;
    }
    for (let i=1; i<param.rowsNumber; i++) { 
        result[i]=[];
        result[i][0]=param.rowsVal.f;
        result[i][param.colsNumber - 1]=param.rowsVal.a;
    }
    return result;
}

 
function getNormalizedValue(param) {
/*  value: исходное значение,
    base: база для нормализации,
    k: множетель
*/
    return (param.value/(param.base || param.value) - 1)*(param.k || 1);
}

function getFilteredValue(param) {
    /*  "n-1": отфильтрованное значения,
        "n": фильтруемые значения,
        "n+1": последнее значения,
        k: порог шума
    */
    return ((param["n-1"] + param["n+1"]) < param["n"]/param.k) ? (param["n-1"] + param["n+1"]) : param.n;
}


function getIndexAsArray(index) {
    /* index - справочник в формате 
    { значение: порядковый номер, ...
    }
    [0] значение - undefined, 
*/
    let result = [];    
    for (let item in index) {
        result[index[item]] = item;
    } 
    return result;
}

function getISODateFromStamp(param) {
/* {timestemp: дата в милисекундах, mode: режим отображения}*/
    const date = new Date(+param.timestamp - new Date().getTimezoneOffset() * 60000).toISOString();
    let result = date.slice(0, 19);
    if (param.mode == "hh:mm") result = date.slice(0, 16);
    else if (param.mode == "hh:mm:s0") result = date.slice(0, 18) + "0";
    return result.replace("T", " ");
}

function getNextRecord(param) {
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

function getDataFromObjectByDate(param) {
/* {data: данные в формате 
    "date": 
      {инструмент: 
        {ключ: значение}} за конкретную дату,
date:   дата записи, нужна для того, чтоб сохранить значение в массив, из ppsckrb на объект
        нельзя получить его название
instrumentIndex: пордяк значений результурющей строки для массива,
dataKey: название поля чье значение надо в индекс, если параметр отсутсвует -
         возвращается значение целиком 

возвращает массив [дата, dataKey по инстурментам в порядке instrumentIndex]
}*/
    let result = [param.date];
    result[Object.keys(param.instrumentIndex).length] = undefined;
    for (let instrument in param.data[param.date]) {
        result[param.instrumentIndex[instrument]] = param.dataKey ? param.data[param.date][instrument][param.dataKey] : param.data[param.date][instrument];
    }
    return result;
}

function getNewDataArrayFromObjectByDate(param) {
/* {data: данные в формате
    "date": 
        {инструмент: 
            {ключ: значение}} за конкретную дату, 
currentRecord: текущая запись,
lastRecord: последняя запись,
timeMode: режим обработки времени,
dataKey: ключ, или ничего если нужно все значение}

возвращает массив результатаов getDataFromObjectByDate с проставленной датой*/
    let currentRecord = param.currentRecord;
    let newData = [];
    while (currentRecord < param.lastRecord) {
        let nextRecord = getNextRecord({
            date: currentRecord,
            mode: param.timeMode
        });
        if (param.data[currentRecord]) {
            newData.push(getDataFromObjectByDate({
                data: param.data,
                date: currentRecord,
                instrumentIndex: param.instrumentIndex,
                dataKey: param.dataKey,
            }));
        }
        currentRecord = nextRecord;
    }
    return newData;
}