function setArrayToIndexedObjest(array) {
	let result = {};
	for (let data of array) {
	  result[data.id] = data;
	  console.log ('result[data.id] = source', result[data.id]);
	}
  return result;
}

function dateToText(param) {
  let dateLength = 19,
      date = new Date(Date.now()-(new Date()).getTimezoneOffset() * 60000),
			result = date.toISOString();
  if (param) {
    if (param.dateLength) dateLength = param.dateLength;
    if (param.date) date = new Date (new Date(param.date)-(new Date()).getTimezoneOffset() * 60000);
		if (param.setTime) result = date.toISOString().slice(0, 11) + param.setTime;
  }
  return result.slice(0, dateLength);
}