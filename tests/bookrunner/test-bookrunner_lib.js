

const { test } = QUnit;
console.log ('QUnit() started');

test( "getISODateFromStamp", assert => { 
	let date = getISODateFromStamp({
		timestamp: 1533566494965});
	assert.equal( date.length, 19, "Длина " + date + " = 19"); 
	assert.equal( date, "2018-08-06 17:41:34", "Значение " + date + " = 2018-08-06 17:41:34");
	date = getISODateFromStamp({
		timestamp: 1533566494965,
		mode: "hh:mm:s0"
	});
	assert.equal( date, "2018-08-06 17:41:30", "Значение " + date + " = 2018-08-06 17:41:30");
	date = getISODateFromStamp({
		timestamp: 1533566494965,
		mode: "hh:mm"
	});
	assert.equal( date.length, 16, "Длина " + date + " = 16"); 
	assert.equal( date, "2018-08-06 17:41", "Значение " + date + " = 2018-08-06 17:41");
});

test( "getTimeFromISODate", assert => { 
	let time = getTimeFromISODate({
		date: "2018-08-06 17:41:34"});
	assert.equal( time.length, 19, "Длина " + time + " = 19"); 
	time = getTimeFromISODate({
		date: "2018-08-06 17:41:34",
		mode: "hh:mm:s0"
	});
	assert.equal( time, "17:41:30", "Значение " + time + " = 17:41:30");
	time = getTimeFromISODate({
		date: "2018-08-06 17:41:34",
		mode: "hh:mm"
	});
	assert.equal( time.length, 5, "Длина " + time + " = 5"); 
	assert.equal( time, "17:41", "Значение " + time + " = 17:41");
});