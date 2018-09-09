const { test } = QUnit;
console.log("QUnit() started");

test("getRoundToExponentOfNumber", assert => {

    assert.equal(getRoundToExponentOfNumber(), 0, "Пустое значение обрабатывает верно");  
    assert.equal(getRoundToExponentOfNumber(1234.23), 1000, "Порядок из числа верный");  
    assert.equal(getRoundToExponentOfNumber("1234"), 1000, "Порядок из строки верный");  
    assert.equal(getRoundToExponentOfNumber("-1234"), -1000, "Порядок из отрицательной строки верный");  

});

test("getMedian", assert => {

    let values = [2, 56, 3, 41, 0, 4, 100, 23];
    assert.equal(getMedian(values), 13.5, "Медиана верна");  
    assert.equal(getMedian([0]), 0, "Медиана от [0] = 0");  

});

test("getAverage", assert => {

    let values = [2, 56, 3, 41, 0, 4, 100, 23];
    assert.equal(getAverage(values), 28.625, "Среднее верно");  
    assert.equal(getAverage([0]), 0, "Среднее от [0] = 0");  

});

test("getMode", assert => {

    let values = [3, 5, 4, 4, 1, 1, 2, 3];
    assert.deepEqual(getMode(values), [1, 3, 4], "Мода верна");  
    assert.deepEqual(getMode([0]), [0], "Мода от [0] = 0");  

});

test("getRange", assert => {

    let values = [3, 5, 4, 4, 1, 1, 2, 3];
    assert.deepEqual(getRange(values), [1, 5], "Мода верна");  
    assert.deepEqual(getRange([0]), [0, 0], "Мода от [0] = 0");  

});

// test("getAverage vs mean", assert => {

//     let values = [];
//     for (let i = 0; i < 10000; i++ ) {
//         values[i] = Math.random()*1000;
//     }
//     assert.equal(mean(values), 28.625, "Среднее верно");  
//     assert.equal(getAverage(values), 0, "Среднее от [0] = 0");  

// });	

test("getFilteredValue", assert => {

    assert.equal(getFilteredValue({ "n-1": 2,  n: 13, "n+1": 1, k: 4 }), 3, "2-13-1 -> 2-3-1");  
    assert.equal(getFilteredValue({ "n-1": 2,  n: 12, "n+1": 1, k: 4 }), 12, "2-12-1 -> 2-12-1");  
    assert.equal(getFilteredValue({ "n-1": 0,  n: 0, "n+1": 0, k: 4 }), 0, "0-0-0 -> 0-0-0");  

});

test("getNormalizedValue", assert => {

    assert.equal(getNormalizedValue({ value: "20.0",  base: "10.0", k: 1 }), 1, "(20.0/10.0-1)*1 = 1");  
    assert.equal(getNormalizedValue({ value: 20,  base: 10, k: 1 }), 1, "(20/10-1)*1 = 1");  
    assert.equal(getNormalizedValue({ value: "20",  base: "10", k: "1" }), 1, "В строковых значениях (20/10-1)*1 = 1");    
    assert.equal(getNormalizedValue({ value: "20",  base: "10"}), 1, "без к все ок");   

});

test("getEmptyChartArray", assert => {

    let result = getEmptyChartArray({
        colsNumber: 2,
        rowsNumber: 2,
        firstRowVal: { 
            f: "1",
            a: 1
        },
        rowsVal: {
            f: "",
            a: undefined}
    });

    assert.equal(result[0].length, 2, "Количество колонок - корректно");    
    assert.equal(result.length, 2, "Длинна массива - корректна");    
    assert.equal(result[0][0], "1", "Значение firstRowVal.f корректно"); 
    assert.equal(result[0][1], 1, "Значение firstRowVal.a корректно"); 
    assert.equal(result[1][0], "", "Значение rowsVal.f корректно"); 
    assert.equal(result[1][1], undefined, "Значение rowsVal.a корректно"); 


});

test("getIndexAsArray", assert => {

    let result = getIndexAsArray(coinsOrder);

    assert.equal(result.length, 7, "Длинна массива - корректна");    
    assert.equal(result[1], "BTC", "Возвращаемое значение корректно");  

});

test("getNewDataArrayFromObjectByDate", assert => {

    let firstRecord = contractMarketPrice.this_week.firstRecord,
        lastRecord = contractMarketPrice.this_week.lastRecord,
        currentRecord = contractMarketPrice.this_week.firstRecord;

    
    let result = getNewDataArrayFromObjectByDate({
        data: contractMarketPrice.this_week,
        currentRecord,
        lastRecord,
        instrumentIndex: coinsOrder,
        timeMode: "hh:mm",
        dataKey: "vol",
    });

    assert.equal(result.length, 6, "Длинна массива - корректна");    
    assert.equal(result[3][1], "3909886", "Возвращаемое значение корректно");  

    result = getNewDataArrayFromObjectByDate({
        data: contractMarketPrice.this_week,
        lastRecord: firstRecord,
        currentRecord
    });

    assert.equal(result.length, 0, "если последняя и текущая записи совпадают, то массив пуст"); 

    result = getNewDataArrayFromObjectByDate({
        data: index,
        instrumentIndex: coinsOrder,
        lastRecord: "2018-08-16 10:54",
        currentRecord: "2018-08-16 10:52",
        timeMode: "hh:mm",
    });

    assert.equal(result.length, 2, "Из index если lastRecord: 2018-08-16 10:54, а currentRecord: 2018-08-16 10:52 вовзращаются две записи: 52 и 53 минуты");
    assert.equal(result[1][0], "2018-08-16 10:53", "Из index последняя строка возвращается за 2018-08-16 10:53"); 
    assert.equal(result[1][1], "6394.14", "Из index BTC в строке за 2018-08-16 10:53 равен 6394.14");
});

test("getDataFromObjectByDate", assert => {

    let firstRecord = contractMarketPrice.this_week.firstRecord,
        lastRecord = contractMarketPrice.this_week.lastRecord,
        currentRecord = contractMarketPrice.this_week.firstRecord;

    
    let result = getDataFromObjectByDate({
        data: contractMarketPrice.this_week,
        date: currentRecord,
        instrumentIndex: coinsOrder,
        dataKey: "vol",
        timeMode: "hh:mm",
    });

    assert.equal(result[0], "2018-08-12 07:56", "Метка времени правильная");
    assert.equal(result[5], "527904", "Значение Vol для риплов правильное");

    result = getDataFromObjectByDate({
        data: contractMarketPrice.this_week,
        date: lastRecord,
        instrumentIndex: coinsOrder,
        dataKey: "low",
    });
    assert.equal(result[0], "2018-08-12 08:02", "Метка времени правильная");
    assert.equal(result[5], "0.285", "Значение low для риплов правильное");

    result = getDataFromObjectByDate({
        data: index,
        date: "2018-08-16 10:54",
        instrumentIndex: coinsOrder,
    });

    assert.equal(result[0], "2018-08-16 10:54", "Метка времени для данных без dataKey правильнoe");
    assert.equal(result[1], "6388.21", "Значение BTC для данных без dataKey правильное");

});


test("getISODateFromStamp", assert => {
    let date = getISODateFromStamp({
        timestamp: "1533566494965"
    });
    assert.equal(date.length, 19, "Длина " + date + " = 19");
    assert.equal(date, "2018-08-06 17:41:34", "Значение " + date + " = 2018-08-06 17:41:34");
    date = getISODateFromStamp({
        timestamp: 1533566494965,
        mode: "hh:mm:s0"
    });
    assert.equal(date, "2018-08-06 17:41:30", "Значение " + date + " = 2018-08-06 17:41:30");
    date = getISODateFromStamp({
        timestamp: 1533566494965,
        mode: "hh:mm"
    });
    assert.equal(date.length, 16, "Длина " + date + " = 16");
    assert.equal(date, "2018-08-06 17:41", "Значение " + date + " = 2018-08-06 17:41");
});

test("getTimeFromISODate", assert => {
    let time = getTimeFromISODate({
        date: "2018-08-06 17:41:34"
    });
    assert.equal(time.length, 19, "Длина " + time + " = 19");
    time = getTimeFromISODate({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm:s0"
    });
    assert.equal(time, "17:41:30", "Значение " + time + " = 17:41:30");
    time = getTimeFromISODate({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm"
    });
    assert.equal(time.length, 5, "Длина " + time + " = 5");
    assert.equal(time, "17:41", "Значение " + time + " = 17:41");
});

test("getNextRecord", assert => {
    let time = getNextRecord({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm"
    });
    assert.equal(time.length, 16, "Длина " + time + " = 16");
    assert.equal(time, "2018-08-06 17:42", "Значение " + time + " = 2018-08-06 17:42");
    time = getNextRecord({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm:s0"
    });
    assert.equal(time, "2018-08-06 17:41:40", "Значение " + time + " = 2018-08-06 17:41:40");
    time = getNextRecord({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm:ss"
    });
    assert.equal(time, "2018-08-06 17:41:35", "Значение " + time + " = 2018-08-06 17:41:35");
});