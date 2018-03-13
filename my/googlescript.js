// var execAsPromise = scriptRunPromise();
// вызов из клиентской части, генерируемой GAS execAsPromise.getNews(news.id)

function callGasSriptAsPromise() {
  var gs = {};
  var ks = Object.keys(google.script.run);
  for (var i=0; i < ks.length; i++) {
    gs[ks[i]] = (function(k) {
      return function() {
        var args = arguments;
        return new Promise(function(resolve, reject) {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            [k].apply(google.script.run, args);
        });
      }
    })(ks[i])
  }
  return gs;
}

/*function callGapiScriptAsPromise() {
  var scriptId = "<ENTER_YOUR_SCRIPT_ID_HERE>";

  // Call the Apps Script API run method
  //   'scriptId' is the URL parameter that states what script to run
  //   'resource' describes the run request body (with the function name
  //              to execute)
  gapi.client.script.scripts.run({
    'scriptId': scriptId,
    'resource': {
      'function': 'getFoldersUnderRoot'
    }
  }).then(function(resp) {
    var result = resp.result;
    if (result.error && result.error.status) {
      // The API encountered a problem before the script
      // started executing.
      appendPre('Error calling API:');
      appendPre(JSON.stringify(result, null, 2));
    } else if (result.error) {
      // The API executed, but the script returned an error.

      // Extract the first (and only) set of error details.
      // The values of this object are the script's 'errorMessage' and
      // 'errorType', and an array of stack trace elements.
      var error = result.error.details[0];
      appendPre('Script error message: ' + error.errorMessage);

      if (error.scriptStackTraceElements) {
        // There may not be a stacktrace if the script didn't start
        // executing.
        appendPre('Script error stacktrace:');
        for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
          var trace = error.scriptStackTraceElements[i];
          appendPre('\t' + trace.function + ':' + trace.lineNumber);
        }
      }
    } else {
      // The structure of the result will depend upon what the Apps
      // Script function returns. Here, the function returns an Apps
      // Script Object with String keys and values, and so the result
      // is treated as a JavaScript object (folderSet).

      var folderSet = result.response.result;
      if (Object.keys(folderSet).length == 0) {
          appendPre('No folders returned!');
      } else {
        appendPre('Folders under your root folder:');
        Object.keys(folderSet).forEach(function(id){
          appendPre('\t' + folderSet[id] + ' (' + id  + ')');
        });
      }
    }
  });
}

function callScriptFunction() {
  var scriptId = "<ENTER_YOUR_SCRIPT_ID_HERE>";

  // Call the Apps Script API run method
  //   'scriptId' is the URL parameter that states what script to run
  //   'resource' describes the run request body (with the function name
  //              to execute)
  gapi.client.script.scripts.run({
    'scriptId': scriptId,
    'resource': {
      'function': 'getFoldersUnderRoot'
    }
  }).then(function(resp) {
    var result = resp.result;
    if (result.error && result.error.status) {
      // The API encountered a problem before the script
      // started executing.
      appendPre('Error calling API:');
      appendPre(JSON.stringify(result, null, 2));
    } else if (result.error) {
      // The API executed, but the script returned an error.

      // Extract the first (and only) set of error details.
      // The values of this object are the script's 'errorMessage' and
      // 'errorType', and an array of stack trace elements.
      var error = result.error.details[0];
      appendPre('Script error message: ' + error.errorMessage);

      if (error.scriptStackTraceElements) {
        // There may not be a stacktrace if the script didn't start
        // executing.
        appendPre('Script error stacktrace:');
        for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
          var trace = error.scriptStackTraceElements[i];
          appendPre('\t' + trace.function + ':' + trace.lineNumber);
        }
      }
    } else {
      // The structure of the result will depend upon what the Apps
      // Script function returns. Here, the function returns an Apps
      // Script Object with String keys and values, and so the result
      // is treated as a JavaScript object (folderSet).

      var folderSet = result.response.result;
      if (Object.keys(folderSet).length == 0) {
          appendPre('No folders returned!');
      } else {
        appendPre('Folders under your root folder:');
        Object.keys(folderSet).forEach(function(id){
          appendPre('\t' + folderSet[id] + ' (' + id  + ')');
        });
      }
    }
  });
}*/