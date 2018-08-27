

const { test } = QUnit;
console.log ('QUnit() started');

test( "dateToText", assert => { 
	let date = dateToText();
	assert.equal( date.length, 19, "Длина dateToText() = 19 и = " + date); 
  date = dateToText({setTime: "00:00:00"});
	assert.equal( date.length, 19, "Сегодня начало дня = " + date);
  date = dateToText({date: "2018.02.01"});
	assert.equal( date.length, 19, "Длина dateToText() = 19 и = " + date);
  date = dateToText({date: "2018.02.01", dateLength: 16});
	assert.equal( date.length, 16, "Длина dateToText() = 16 и = " + date);
});