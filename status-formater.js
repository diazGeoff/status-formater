var fs = require("fs");

var JSONStatusFormat = function JSONStatusFormat(jsonModule, jsonReport, stacktraceReport, filePath) {
    var statusFormat = {};
    statusFormat.packageName = jsonModule.packageName;
    statusFormat.fileName = jsonModule.fileName;
    statusFormat.moduleName = jsonModule.moduleName;
    statusFormat.functionName = jsonModule.moduleName;
    statusFormat.rawFunctionData = require(filePath)[statusFormat.functionName].toString();
    statusFormat.rawFileData  = fs.readFileSync(filePath, { encoding: 'utf-8' });
    statusFormat.result = [];
    jsonReport.failures.forEach(function ( failure ) {
        failure.stackTrace = stacktraceReport.shift();
        statusFormat.result.push( failure );
    });
    jsonReport.passes.forEach(function ( pass ) {
        statusFormat.result.push( pass );
    });
    return statusFormat;
};

( module || {} ).exports = JSONStatusFormat;