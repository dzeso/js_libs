const { test } = QUnit;
console.log ('QUnit() started');


test( "Тест времени исполнения (см. console.log)", assert => { 
					
	assert.ok( showIndexedDbSize(), "все ок" );
});
