import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { error } from "console";

/**
 * Sync custom changes to local Shopify theme
 *
 * Accepts no arguments
 * @returns {void} - No return value
 */
const sync = (): void => {
  const configPath: string = path.resolve(process.cwd(), "./shopsync.json");

  if (!fs.existsSync(configPath)) {
    console.log(
      chalk.bgRedBright(
        "It looks like you are not in a shopsync directory. Please `cd` to a directory that contains a shopsync project."
      )
    );
    return;
  }

  try {
    execSync(`npm run sync`);
  } catch (error) {
    chalk.bgRedBright(
      "An error occurred while building the theme. Please review the error below:"
    );
    chalk.white(" ");
    chalk.white("-------");
    chalk.white(" ");
    chalk.white(error);
    chalk.white(" ");
    chalk.white("-------");
    return;
  }
};

export default sync;
