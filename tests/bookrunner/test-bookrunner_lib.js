const { test } = QUnit;
console.log("QUnit() started");


test("getNewMarketPrices", assert => {

    let firstRecord = contractMarketPrice.this_week.firstRecord,
        lastRecord = contractMarketPrice.this_week.lastRecord,
        currentRecord = contractMarketPrice.this_week.firstRecord;

    
    let result = getDataFromMarketPriceByDate({
        data: contractMarketPrice.this_week,
        date: currentRecord,
        instrumentIndex: coinsOrder,
        dataKey: "vol",
    });

    assert.equal(result[0], "2018-08-12 07:56", "Метка времени правильная");
    assert.equal(result[5], "527904", "Значение Vol для риплов правильное");

    result = getDataFromMarketPriceByDate({
        data: contractMarketPrice.this_week,
        date: lastRecord,
        instrumentIndex: coinsOrder,
        dataKey: "low",
    });
    assert.equal(result[0], "2018-08-12 08:02", "Метка времени правильная");
    assert.equal(result[5], "0.285", "Значение low для риплов правильное");
    console.log("result", result);

});


test("getISODateFromStamp", assert => {
    let date = getISODateFromStamp({
        timestamp: 1533566494965
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

test("getNextMoment", assert => {
    let time = getNextMoment({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm"
    });
    assert.equal(time.length, 16, "Длина " + time + " = 16");
    assert.equal(time, "2018-08-06 17:42", "Значение " + time + " = 2018-08-06 17:42");
    time = getNextMoment({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm:s0"
    });
    assert.equal(time, "2018-08-06 17:41:40", "Значение " + time + " = 2018-08-06 17:41:40");
    time = getNextMoment({
        date: "2018-08-06 17:41:34",
        mode: "hh:mm:ss"
    });
    assert.equal(time, "2018-08-06 17:41:35", "Значение " + time + " = 2018-08-06 17:41:35");
});