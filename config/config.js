var config = {};
var updateEnv = [];

/**
 * Database Configuration
 */

config.dbUserName = process.env.DB_USERNAME;
config.dbPassword = process.env.DB_PASSWORD;
config.host = process.env.DB_HOST;
config.dialect = "mysql"; // Dialect needs to be explicitly supplied as of v4.0.0
config.connectTimeout = 20000;
config.acquireTimeout = 20000;
config.dbDatabase = process.env.DB_DATABASE;
config.environment = process.env.NODE_ENV || "development";
config.privateKey=process.env.SECRET;
config.accessTokenExpire=process.env.accessTokenExpire;
config.issuer =process.env.issuer;
config.audience =process.env.audience
trimmer(config);

if (updateEnv.length > 0) {
    console.error(
        `****************** update the folloing env variable **************`
    );
    console.error(updateEnv);
    console.error(
        `****************** update the folloing env variable **************`
    );
    process.exit(1);
}

module.exports = config;

function trimmer(obj) {
    Object.keys(obj).forEach((item) => {
        if (typeof obj[item] == "object") {
            trimmer(obj[item]);
        } else if (typeof obj[item] == "string") {
            obj[item] = obj[item].trim();
        }
        if (obj[item] == undefined || obj[item] == null || !obj[item]) {
            updateEnv.push(item);
        }
    });
}