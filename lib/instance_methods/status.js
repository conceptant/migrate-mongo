import { find } from "lodash";
import getFileNames from "../utils/getFileNames";

const status = config => async db => {
  const fileNames = await getFileNames(config.migrationsDir);

  let collectionName = "changelog";

  if (config.changeLogCollectionName) {
    collectionName = config.changeLogCollectionName;
  } else {
    collectionName = "changelog";
    console.warn(
      'No changeLogCollectionName found in confg - defaulting to "changelog"'
    );
  }

  const collection = db.collection(collectionName);
  const changelog = await collection.find({}).toArray();

  const statusTable = fileNames.map(fileName => {
    const itemInLog = find(changelog, { fileName });
    const appliedAt = itemInLog ? itemInLog.appliedAt.toJSON() : "PENDING";
    return { fileName, appliedAt };
  });

  return statusTable;
};

export default status;
