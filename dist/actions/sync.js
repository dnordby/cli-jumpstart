import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
/**
 * Sync custom changes to local Shopify theme
 *
 * Accepts no arguments
 * @returns {void} - No return value
 */
const sync = () => {
    const configPath = path.resolve(process.cwd(), "./shopsync.json");
    if (!fs.existsSync(configPath)) {
        console.log(chalk.bgRedBright("It looks like you are not in a shopsync directory. Please `cd` to a directory that contains a shopsync project."));
        return;
    }
    execSync(`npm run build`);
};
export default sync;
