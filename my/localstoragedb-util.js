function ls_sync_GetUsedSpace() {
		return Object.keys(window.localStorage)
		.map(function(key) { 
			return localStorage[key].length;
		})
		.reduce(function(a,b) { 
			return a+b;
		});
}		

function ls_sync_CheckAvailableSpace() {
	let result = '0123456789'.repeat(1000), x = 1, 
		isStorageFull = false,
	  storage = localStorage;
	let lastOkLength = result.length,
		lastWrangLength = 0;
	do {
	  try {
	    storage.setItem('ls_test', result);
			if (lastWrangLength && (lastWrangLength - lastOkLength < 10000)) isStorageFull = true;
	    else {
				if (lastOkLength < result.length) lastOkLength = result.length;
					result += result.slice(0,Math.floor((lastWrangLength+lastOkLength)/(x)));
				if (lastWrangLength && lastWrangLength < result.length) 
					result = result.slice(0,Math.floor((lastWrangLength+lastOkLength)/2));
			}
	  } 
		catch (e) {
			x++;  
			if (!lastWrangLength || lastWrangLength > result.length) lastWrangLength = result.length;
			result = result.slice(0,Math.floor((lastWrangLength+lastOkLength)/2));   
	  }
		console.log("result.length test.length",result.length, lastOkLength, lastWrangLength, (lastWrangLength+lastOkLength)/x);
	} while (!isStorageFull && x < 50);
	storage.removeItem('ls_test');
	return result.length;
}	

function ls_sync_OpenDb(dbConfig) {
	/* Обработка ошибок в промисах
	dbConfig [{ db name: "",
		tables: [{
			name: "",
			fields: [""]}]
	}] */
	let result = {};
	for (let db of dbConfig) {
		result[db.name] = new localStorageDB(db.name, localStorage);
    if (db.tables)	
			for (let table of db.tables) {
//				console.log ("db.tables table", table);
				if ( !result[db.name].tableExists(table.name) ) {
		   	  result[db.name].createTable(table.name, table.fields);
				} else if (table.fields)
				for (let field of table.fields) {
//					console.log ("table.fields field", field);
					if ( !result[db.name].columnExists(table.name, field) ) {
			   	  result[db.name].alterTable(table.name, field);
					  }
					}
				}	
		result[db.name].commit();			
		}		
		return result;
}	

function ls_DoAsync(syncFunction) {
  return new Promise( (resolve, reject) => {
		try {
			const result = syncFunction.body(syncFunction.parameters);
			resolve (result);
		}
		catch (e) {
			reject ({
				error: syncFunction.error,
				details: e
			});
		}		
	});
}
	
function ls_async_OpenDb(dbConfig) {
  return ls_DoAsync({
		body: ls_sync_OpenDb,
		parameters: dbConfig,
		error: "Db configuration is missed or uncorrected"
	})
}	

function ls_sync_WriteTable(request) {
	/* Обработка ошибок в промисах
	request db: db,
	table: "name",
	index: "name",
    data: [ {column: value} ] */
	let result = 0;
	for(let i=0, len_i = request.data.length; i<len_i; i++) { 
		if (request.data[i][request.index] === undefined) throw "Key index or table field is undefined"; // ключ не определен
		result = request.db.insertOrUpdate(
			request.table, 
			{[request.index]:request.data[i][request.index]}, 
			request.data[i]
		);
	}
	if (!request.db.commit()) result = 0;
	// Из-за смены типа данных результата в insertOrUpdate при асинхронном выполнении иногда возвращаются массив
	return (result[0]) ? result[0] : result;
} 

function ls_async_WriteTable(request) {
  return ls_DoAsync({
		body: ls_sync_WriteTable,
		parameters: request,
		error: request.table + ": Data changes cannot be committed"
	});
}	

function ls_sync_ReadTable(request) {
	/* Обработка ошибок в промисах
	request db: db,
	table: "name",
	sort:  [["field2", "DESC"],["field1", "DESC"]] 
	-- обратить внимание, что при сортировке надо указывать поkz в обратном порядке*/
	
	let result = request.db.queryAll(
		request.table, 
		{ sort: request.sort });	
	return result;
} 

function ls_async_ReadTable(request) {
  return ls_DoAsync({
		body: ls_sync_ReadTable,
		parameters: request,
		error: request.table + ": Data cannot be read"
	});
}	

function ls_sync_DeleteFromTable(request) {
	/* Обработка ошибок в промисах
	request db: db,
	table: "name",
	where: {year: 1999}
*/
	
	let result = request.db.deleteRows(
		request.table, request.where);	
	if (!request.db.commit()) result = 0;
	return result;
} 

function ls_async_DeleteFromTable(request) {
  return ls_DoAsync({
		body: ls_sync_DeleteFromTable,
		parameters: request,
		error: request.table + ": Data cannot be deleted"
	});
}
console.log ("localstoragedb-util started");