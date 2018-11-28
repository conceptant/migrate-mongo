import path from "path";
import resolveMigrationsDirPath from "./resolveMigrationsDirPath";

const loadMigration = (migrationsDirPath, fileName) => {
  if (!migrationsDirPath) {
    throw new Error("No migrations path found");
  }

  const filePath = path.join(
    resolveMigrationsDirPath(migrationsDirPath),
    fileName
  );

  return require(filePath);
};

export default loadMigration;
