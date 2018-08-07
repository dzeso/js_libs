/*var res;
console.log ('lsGetUsedSpace() started');
lsGetUsedSpace()
	.then ( (result) => {
		console.log ('lsGetUsedSpace()', result);
		window.res = result;
		return result
	})
	.then ( (used) => {
		console.log ('lsCheckAvailableSpace() result in', used);	
		lsCheckAvailableSpace()
			.then ( (result) => {
				console.log ('lsCheckAvailableSpace()', result);
			})
	})*/

const { test } = QUnit;
console.log ('QUnit() started');
//test( "ls_sync_GetUsedSpace", assert => { assert.ok( ls_sync_GetUsedSpace(), "ls_sync_GetUsedSpace" ); });
//test( "ls_sync_CheckAvailableSpace", assert => { assert.ok( ls_sync_CheckAvailableSpace(), "ls_sync_CheckAvailableSpace" ); });
test( "ls_sync_OpenDb", assert => { 
	localStorage.removeItem("db_test");
	localStorage.removeItem("db_test1");
	localStorage.removeItem("db_test12");
	assert.ok( ls_sync_OpenDb([
		{name: "test",
			tables: [
				{	name: "test_table",
					fields: ["id","name","data"]
				},	
				{
					name: "test_table1",
					fields: ["id","name","data"]
				}]
		},
	{name: "test1",
		tables: [{
			name: "test_table",
			fields: ["id","name","data"]
		}]
	}
	]), "Создаем test (test_table, test_table1) и test1 (test_table)" );
	assert.ok(ls_sync_OpenDb([
	  {name: "test1",
			tables: [{
				name: "test_table1",
				fields: ["id","name","data"]
			}]
		}
  ]), "Создаем новую таблицу");
	assert.ok(ls_sync_OpenDb([{name: "test1",
		tables: [{
			name: "test_table1",
			fields: ["id","name","data","string","string1"]
		}]
	}]
  ), "Создаем новую колонку");
//	assert.ok( ls_sync_OpenDb([	{ name: "test1"	}, { name: "test"	}]), "Две БД" );
});

/*test( "ls_async_OpenDb", async assert => { 
	assert.ok(await ls_async_OpenDb([{name: "test1"}]), "Открытие БД");
	assert.ok(await ls_async_OpenDb([{name: "test12"}]).catch((result) => {return true;}), "Открытие БД которой нет");
	assert.ok(await ls_async_OpenDb([{}]).catch((result) => {return true;}), "Пустая конфигурация");
	assert.ok(await ls_async_OpenDb().catch((result) => {return true;}), "Undefined");
	assert.ok(await ls_async_OpenDb(10).catch((result) => {return true;}), "Не верный тип данных");
});

test( "ls_sync_WriteTable", assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
	assert.strictEqual( ls_sync_WriteTable (
		{db: db["test"],
		table: "test_table",
		index: "name",
		  data: [{id: 1, name: "ф1"},
						{id: 2, name: "ф2"},
						{id: 3, name: "ф3"}]
	 	}), 3, "Запись нескольких строк");

});

test( "ls_async_WriteTable", async assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
	assert.ok(await ls_async_WriteTable (
		{db: db["test"], table: "test_table", index: "field", data: [{id: 1, name: "1"},]
		}).catch((result) => {return true;}), "Запись с неверным ключом");
	assert.ok(await ls_async_WriteTable (
		{db: db["test"], table: "test_table", index: "id", data: [{data: 1, name: "1"},]
		}).catch((result) => {return true;}), "Запись с неверным полем");
	assert.ok(await ls_async_WriteTable (
		{db: db["test"], table: "test_table1", index: "id", data: [{id: 1, name: "1"},]
		}).catch((result) => {return true;}), "Запись таблицу которой нет");
	assert.ok(await ls_async_WriteTable (
		{db: db["test1"], table: "test_table", index: "id", data: [{id: 1, name: "1"},]
		}).catch((result) => {return true;}), "Запись базу, которая не открыта");
				
	assert.ok(await ls_async_WriteTable (
		{db: db["test"],
		table: "test_table",
		index: "id",
		  data: [{id: 1, name: "1", data: "1"},
						{id: 2, name: "2", data: "2"},
						{id: 3, name: "3", data: "1"}]
	 	}), "Запись нескольких строк");
});

test( "ls_sync_ReadTable", assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
			console.table(db);	
	assert.strictEqual( ls_sync_ReadTable (
			{db: db["test"],
			table: "test_table",
			sort: [["name", "DESC"], ["data", "DESC"]]
		 	}).length, 3, "Чтение тестовой таблицы");

});

test( "ls_async_ReadTable", async assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
	assert.ok(await ls_async_ReadTable (
		{db: db["test"], table: "test_table"}), "Чтение тестовой таблицы");
});

test( "ls_sync_DeleteFromTable", assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
	assert.strictEqual( ls_sync_DeleteFromTable (
			{db: db["test"],
			table: "test_table",
			where: {id: 1}
		 	}), 1, "Удаление данных");

});

test( "ls_async_DeleteFromTable", async assert => { 
	let db = ls_sync_OpenDb([{name: "test"}]);
	assert.ok(await ls_async_DeleteFromTable (
		{db: db["test"], table: "test_table", where: {id: 2}}), "Чтение тестовой таблицы");
});

/*test( "Тест времени исполнения (см. console.log)", assert => { 
	localStorage.removeItem("db_test");
	let db = ls_sync_OpenDb([{name: "test",
			tables: [
				{	name: "test_table",
					fields: ["id","name","data"]
				}]
			}]);
	let dbSize = 2000,
			dbDataArr = [];		
	console.log("------- Тест времени исполнения");	
	console.time("");
	console.timeEnd("");
	console.time("Генерация данных");
	for(let i=0; i<dbSize; i++) {
		dbDataArr[i] = {
			id: _.random(dbSize*3), name: "name" + _.random(dbSize/10), data: (_.random(dbSize) + "слово ").repeat(_.random(50, 500))
		}
	}
	console.log(dbDataArr);	
	console.timeEnd("Генерация данных");
	
	console.time("Запись данных");
	ls_async_WriteTable (
			{db: db["test"],
			table: "test_table",
			index: "id",
			  data: dbDataArr
		 	})
	.then (result => {
		console.timeEnd("Запись данных");
		console.time("Чтение таблицы");
		return ls_async_ReadTable (
				{db: db["test"],
				table: "test_table"
			 	});
	})
	.then (result => {
		console.timeEnd("Чтение таблицы");
		console.log("Исходная таблица", result);	
		console.time("Чтение таблицы с сортировкой");
		return ls_async_ReadTable (
				{db: db["test"],
				table: "test_table",
				sort: [["id", "DESC"]]
			 	})
		})	
		.then (result => {
			console.timeEnd("Чтение таблицы с сортировкой");
			console.time("Чтение таблицы и 2 сортировки");
			return ls_async_ReadTable (
					{db: db["test"],
					table: "test_table",
					sort: [["id", "DESC"],["name", "DESC"]]
		 	    })
		})	
		.then (result => {
			console.timeEnd("Чтение таблицы и 2 сортировки");	
			console.time("Чтение таблицы с сортировкой lodash");
			return ls_async_ReadTable (
				{db: db["test"],
				table: "test_table"
			 	})
		})			
		.then (result => {
				let res = _.sortBy(result, 'id');
				console.timeEnd("Чтение таблицы с сортировкой lodash");
				console.log(res);
				console.time("Чтение таблицы с сортировкой 2 lodash");
				return ls_async_ReadTable (
					{db: db["test"],
					table: "test_table"
				 	})
		})					
		.then (result => {
				let res = _.reverse(_.sortBy(result, ["name", 'id']));
				console.timeEnd("Чтение таблицы с сортировкой 2 lodash");			
				let newData = _.times(20, () => {
					return {
						id: _.random(dbSize), 
						name: "name" + _.random(dbSize/10), 
						data: (_.random(dbSize) + "слово ").repeat(_.random(50, 500))
						}
				})
				console.lognewData;
				let diff = _.differenceBy(newData, dbDataArr, 'id');
				console.log(_.sortBy(diff, 'id'));				
				console.log(`Обновление данных (${newData.length}/${diff.length})`);				
				console.time(`Обновление данных`);
				return ls_async_WriteTable (
					{db: db["test"],
					table: "test_table",
					index: "id",
					  data: newData
				 	})
		})
		.then (result => {
			console.timeEnd(`Обновление данных`);
			console.time("Чтение обновленной таблицы");
			return ls_async_ReadTable (
					{db: db["test"],
					table: "test_table"
				 	});
			})
		.then (result => {
			console.timeEnd("Чтение обновленной таблицы");
			console.log("Obновленная таблица", result)
			})
		.then (result => {console.log("------- Завершение теста времени исполнения")
			});
				
	assert.ok( ls_sync_OpenDb([{ name: "test"	}]), "все ок" );
});*/
