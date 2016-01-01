module.exports = {
    mysqldiscovery: function (ds, schema, model) {
        var path = require('path');
        var fs = require('fs');
        var app = require(path.resolve(__dirname, '../server'));
        var outputPath = path.resolve(__dirname, '../../common/models');
        var dataSource = app.dataSources.INDATASOURCE;

        function schemaCB(err, schema) {
            if (schema) {
                console.log("Auto discovery success: " + schema.name);
                var outputName = outputPath + '/' + schema.name + '.json';
                fs.writeFile(outputName, JSON.stringify(schema, null, 2), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("JSON saved to " + outputName);
                    }
                });
            }
            if (err) {
                console.error(err);
                return;
            }
            return;
        };
        dataSource.discoverSchema('INTABLE', {
            schema: dataSource.settings.database
        }, schemaCB);
    },
    schemaDiscovery: function (ds, schema) {
        var path = require('path');
        var fs = require('fs');
        var app = require(path.resolve(__dirname, '../server'));
        var outputPath = path.resolve(__dirname, '../../common/models');
        var dataSource = app.dataSources.mysqlDS;

        function schemaCB(err, models) {
            console.log("models");
            console.log(models[0].schema);
            var outputName = outputPath + '/' + dataSource.settings.database + '.json';
            fs.writeFile(outputName, JSON.stringify(models, null, 2), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + outputName);
                }
            });
            return;
        };
        dataSource.discoverModelDefinitions({
            schema: dataSource.settings.database
        }, schemaCB);
    }
}