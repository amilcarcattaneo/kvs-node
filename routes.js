const routes = require("next-routes");

module.exports = routes().add("home", "/:key(key)?/:key?");
