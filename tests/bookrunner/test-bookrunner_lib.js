const { test } = QUnit;
console.log('QUnit() started');

test("getISODateFromStamp", assert => {

	const contractMarketPrice = {
		this_week: {
		  firstRecord: "2018-08-12 07:56",
		  lastRecord: "2018-08-12 08:02",
		  "2018-08-12 07:56": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.982",
			  vol: "3881264",
			  last: "570.31",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6048.47",
			  vol: "3917854",
			  last: "6233.5",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.772",
			  vol: "27147324",
			  last: "4.916",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.565",
			  vol: "27392554",
			  last: "321.26",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.853",
			  vol: "1509624",
			  last: "59.669",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.292",
			  vol: "527904",
			  last: "0.302",
			  low: "0.285",
			},
		  },
		  "2018-08-12 07:57": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.798",
			  vol: "3882098",
			  last: "569.95",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6048.27",
			  vol: "3914708",
			  last: "6232",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.763",
			  vol: "27138112",
			  last: "4.919",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.563",
			  vol: "27389780",
			  last: "321.26",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.86",
			  vol: "1507780",
			  last: "59.669",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.292",
			  vol: "527898",
			  last: "0.302",
			  low: "0.285",
			},
		  },
		  "2018-08-12 07:58": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.986",
			  vol: "3881826",
			  last: "569.718",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6048",
			  vol: "3914248",
			  last: "6231.59",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.767",
			  vol: "27132228",
			  last: "4.918",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.55",
			  vol: "27384238",
			  last: "321.2",
			  low: "303",
			},
		  },
		  "2018-08-12 07:59": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.955",
			  vol: "3880802",
			  last: "569.718",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6047.66",
			  vol: "3909886",
			  last: "6231.59",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.766",
			  vol: "27120140",
			  last: "4.919",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.488",
			  vol: "27406668",
			  last: "321.379",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.874",
			  vol: "1509862",
			  last: "59.61",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.293",
			  vol: "528612",
			  last: "0.302",
			  low: "0.285",
			},
		  },
		  "2018-08-12 08:00": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.593",
			  vol: "3882798",
			  last: "570.111",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6046.25",
			  vol: "3909554",
			  last: "6230.61",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.765",
			  vol: "27116426",
			  last: "4.918",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.439",
			  vol: "27405680",
			  last: "321.397",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.864",
			  vol: "1510110",
			  last: "59.577",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.293",
			  vol: "528686",
			  last: "0.301",
			  low: "0.285",
			},
		  },
		  "2018-08-12 08:01": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.617",
			  vol: "3888172",
			  last: "570.21",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6044.89",
			  vol: "3914870",
			  last: "6236.88",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.765",
			  vol: "27113178",
			  last: "4.92",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.449",
			  vol: "27402488",
			  last: "321.48",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.853",
			  vol: "1510090",
			  last: "59.577",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.293",
			  vol: "527898",
			  last: "0.303",
			  low: "0.285",
			},
		  },
		  "2018-08-12 08:02": {
			BCH: {
			  high: "584.67",
			  limitLow: "552.877",
			  vol: "3887852",
			  last: "570.21",
			  low: "535.61",
			},
			BTC: {
			  high: "6451.97",
			  limitLow: "6044.89",
			  vol: "3914042",
			  last: "6236.88",
			  low: "5970",
			},
			EOS: {
			  high: "5.272",
			  limitLow: "4.765",
			  vol: "27104890",
			  last: "4.92",
			  low: "4.737",
			},
			ETH: {
			  high: "329.833",
			  limitLow: "311.449",
			  vol: "27400022",
			  last: "321.48",
			  low: "303",
			},
			LTC: {
			  high: "60",
			  limitLow: "57.853",
			  vol: "1510090",
			  last: "59.577",
			  low: "55",
			},
			XRP: {
			  high: "0.312",
			  limitLow: "0.293",
			  vol: "527894",
			  last: "0.303",
			  low: "0.285",
			},
		  },
		},
	  };
	  
	  console.log(Object.getOwnPropertyNames(contractMarketPrice.this_week["2018-08-12 07:56"]));
	  
	  const coinsOrder = {
		BTC: 1,
		LTC: 2,
		ETH: 3,
		BCH: 4,
		XRP: 5,
		EOS: 6,
	  };
	  let firstRecord = "",
		lastRecord = "",
		currentRecord = "";
	  
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
	  
	  function getDataFromMarketPriceForChart(param) {
		/* {data: данные в формате api contractMarketPrice за конкретную дату,
		instrumentIndex: пордяк значений результурющей строки для массива,
		dataKey: название поля чье значение надо в индекс
		
		возвращает массив [дата, dataKey по инстурментам в порядке instrumentIndex]
		}*/
		let result = [];
		result[param.instrumentIndex.length - 1] = undefined;
		for (let instrument in param.data) {
		  result[param.instrumentIndex[instrument]] = param.data[instrument][param.dataKey];
		};
		return result;
	  }
	  
	  function getNewMarketPrices(param) {
		/* {data: данные в формате api contractMarketPrice, 
		currentRecord: текущая запись,
		lastRecord: последняя запись,
		dataDepth: глубина,
		timeMode: режим обработки времени}
		возвращает массив результатаов getDataFromMarketPriceForChart с проставленной датой*/
		let currentRecord = param.currentRecord;
		let newData = [];
		while (currentMoment < param.lastRecord) {
		  let nextMoment = getNextMoment({
			date: currentMoment,
			mode: param.timeMode
		  });
		  if (param.data[currentMoment]) {
			console.log("currentMoment", currentMoment);
			console.log("param.data[currentMoment]", param.data[currentMoment]);
			newData.push(getDataFromMarketPriceForChart({
			  data: param.data[currentMoment],
			  instrumentIndex: param.instrumentIndex,
			  dataKey: "vol",
			}));
			newData[newData.length - 1][0] = getTimeFromISODate({
			  date: currentMoment,
			  mode: param.timeMode
			}); // вставляем дату
		  }
		currentMoment = nextMoment;
	   }
	  return;
	  }
	  
	  firstRecord = contractMarketPrice.firstRecord;
	  lastRecord = contractMarketPrice.lastRecord;
	  currentRecord = firstRecord;
	  
	  
	  console.log(getMarketPriceForChart({
		data: contractMarketPrice.this_week,
		currentRecord: currentRecord,
		lastRecord: lastRecord,
		dataDepth: 3,
		timeMode: "hh:mm",
		instrumentIndex: coinsOrder
	  
	  }));

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