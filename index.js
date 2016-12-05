var given = (function(){
	var evalValue = function(value){
		if(typeof value === 'function'){
			return value();
		}

		return value;
	};

	var given = function(value, message){
		var receivedValue;
		try{
			receivedValue = evalValue(value);	
		}catch(ex){
			console.log(ex);
			throw 'Given function failed ' + (message || '');
		}

		return {
			when : getWhen(receivedValue),
			then : getThen(receivedValue)
		};
	};

	var getWhen = function(value){
		return function(whenFunc, message){		

			var whenValue;
			try{
				whenValue = whenFunc(value);	
			}catch(ex){
				throw 'When function failed ' + (message || '');
			}

			return {
				when : getWhen(whenValue),
				then : getThen(whenValue)
			};
		};	
	};

	var getThen = function(value) {
		return function(thenFunc, message){			
			var thenValue;
			try{
				thenValue = thenFunc(value);	
			}catch(ex){
				throw 'Then function failed ' + (message || '');
			}			
			
			if(thenValue === false){
				throw 'Then condition failed ' + (message || '');
			}
		};
	};

	return given;
})();

exports.given = given;