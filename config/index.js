/*
  NOTE: Config settings are in:

  config.default.js -> inside git repo
  config.local.js -> outside of git
  config.env.js -> ENV variables

  No need to change this file for config settings
*/
function fromEnvironment(mapping) {
  var envMap = {};
  for (var key in mapping) {
    if (mapping[key] in process.env) {
      envMap[key] = process.env[mapping[key]];
    }
  }
  return envMap;
}

// updates values to known whitelisted or validated settings
function realizeConfig(config) {
  var result = Object.assign({}, config);

  if ((typeof(result.debug) === "string") && (result.debug.toLowerCase() === "true")) {
    result.debug = true;
  }

  if (result.debug !== true) {
    result.debug = false;
  }

  return result;
}

// load local config settings
var configLocal = {};
try {
  configLocal = require("./config.local.js");
} catch (e) {
  console.log("WARNING: Local config missing.");
}

// load environment settings
var envMappings = {};
try {
  envMappings = require("./config.env.js");
} catch(e) {
  console.log("WARNING: No environment mappings");
}

var configEnvironment = fromEnvironment(envMappings);

// load default settings
var configDefault = require("./config.default.js");

// compose final
var finalConfig = realizeConfig(Object.assign({}, configDefault, configLocal, configEnvironment));

if (require.main === module) {
  console.log(finalConfig);
}

module.exports = finalConfig;
