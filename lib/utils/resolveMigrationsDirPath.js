import path from "path";

const resolveMigrationsDirPath = migrationDir =>
  path.isAbsolute(migrationDir)
    ? migrationDir
    : path.join(process.cwd(), migrationDir);

export default resolveMigrationsDirPath;
