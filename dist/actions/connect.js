import fs from "fs";
import chalk from "chalk";
import { execSync } from "child_process";
/**
 * Connect a Shopsync project to a Shopify store and theme
 *
 * @param {string} store - The Shopify store to connect to
 * @param {string} themeId - The Shopify theme ID to connect to
 * @returns {void} - No return value
 */
const connect = (store, themeId, version) => {
    console.log(chalk.green(" Connecting to Shopify store... "));
    console.log(chalk.whiteBright(" "));
    console.log(chalk.whiteBright(`Store: ${store}`));
    console.log(chalk.whiteBright(`Theme: ${themeId}`));
    console.log(chalk.whiteBright(" "));
    const storeConfig = `STORE="${store}"`;
    const themeConfig = `THEME_ID=${themeId}`;
    try {
        fs.writeFileSync(".env", `${storeConfig}\n${themeConfig}`);
        execSync(`cd theme && shopify theme pull --theme ${themeId} --store ${store} --force`);
        fs.writeFileSync("shopsync.json", JSON.stringify({
            cliVersion: `${version}`,
            themeId: themeId,
            store: store,
        }));
        console.log(chalk.green(`Complete!`));
        console.log(chalk.whiteBright(" "));
        console.log(chalk.whiteBright(`💡 Run this to get started:`));
        console.log(chalk.whiteBright(`$ npm run dev`));
        console.log(chalk.whiteBright(" "));
        console.log(chalk.whiteBright("ℹ️  Connected to Theme ID " +
            themeId +
            "...if you want to test another theme, modify the " +
            chalk.bgBlack("shopify-cli.yml") +
            " file."));
        console.log(chalk.whiteBright(" "));
    }
    catch (error) {
        console.log(chalk.bgRedBright(`Error writing .env file`));
        return;
    }
};
export default connect;
