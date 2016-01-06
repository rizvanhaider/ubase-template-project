var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server'));
var outputPath = path.resolve(__dirname, '../schemas');
var dataSource = app.dataSources.REPLACE_WITH_DATASOURCE;
function schemaCB(err, schema) {
  if(schema) {
    console.log("Auto discovery success: " + dataSource.settings.database);
    var outputName = outputPath + '/' +dataSource.settings.database + '.json';
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
};
dataSource.discoverModelDefinitions({schema:dataSource.settings.database},schemaCB);