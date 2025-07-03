import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

/**
 * Initialize a Shopsync project
 *
 * @param {string} directory - The directory name to initialize
 * @returns {void} - No return value
 */
const init = (directory: string): void => {
  console.log(chalk.green("Initializing shopsync directory..."));
  console.log(chalk.whiteBright(" "));

  const shopsyncUrl = `https://github.com/dnordby/shopsync.git`;
  const fullPath = path.resolve(process.cwd(), directory);
  if (fs.existsSync(fullPath)) {
    console.log(chalk.bgRed(`Directory ${directory} already exists`));
    return;
  }
  try {
    execSync(`git clone ${shopsyncUrl}`, { stdio: "inherit" });
    execSync(`mv shopsync ${directory}`, { stdio: "inherit" });
    execSync(`cd ${directory} && npm install`, { stdio: "inherit" });
    execSync(`cd ${directory} && touch .env`, { stdio: "inherit" });
  } catch (error) {
    console.log(
      chalk.bgRedBright(`Error initializing shopsync for ${directory}`)
    );
    return;
  }

  console.log(chalk.whiteBright(" "));
  console.log(chalk.green(`Complete!`));
  console.log(chalk.whiteBright(" "));
  console.log(chalk.whiteBright(`💡 Run this to connect to your store:`));
  console.log(chalk.whiteBright(`$ cd ${directory}`));
  console.log(chalk.whiteBright(`$ shopsync connect [store] [themeId]`));
  console.log(chalk.whiteBright(" "));
};

export default init;
