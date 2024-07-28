import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = __dirname + "/data/cards.json";

const loadData = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }
  return [];
};

const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export { loadData, saveData };