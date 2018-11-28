import up from "./instance_methods/up";
import down from "./instance_methods/down";
import status from "./instance_methods/status";
import database from "./instance_methods/database";

class MigrateMongo {
  constructor(config) {
    this.config = config;

    const statusWithConfig = status(config);
    
    this.up = up(config, statusWithConfig);
    this.down = down(config, statusWithConfig);
    this.status = statusWithConfig;
    this.database = database(config);
  }
}

module.exports = MigrateMongo;
