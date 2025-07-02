#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { version } from "./package.json";
program
    .name("shopsync")
    .version("1.0.0")
    .description("Sync custom changes to local Shopify theme")
    .action(() => {
    const configPath = path.resolve(process.cwd(), "./.shopsync.config.json");
    if (!fs.existsSync(configPath)) {
        console.log(chalk.bgRedBright("It looks like you are not in a shopsync directory. Please `cd` to a directory that contains a shopsync project."));
        return;
    }
    execSync(`npm run build`);
});
program
    .description("Initialize shopsync directory")
    .argument("[directory]", "The directory name to initialize")
    .action((directory) => {
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
    }
    catch (error) {
        console.log(chalk.bgRedBright(`Error initializing shopsync for ${directory}`));
        return;
    }
    console.log(chalk.whiteBright(" "));
    console.log(chalk.green(`Complete!`));
    console.log(chalk.whiteBright(" "));
    console.log(chalk.whiteBright(`💡 Run this to connect to your store:`));
    console.log(chalk.whiteBright(`$ cd ${directory}`));
    console.log(chalk.whiteBright(`$ shopsync connect [store] [themeId]`));
    console.log(chalk.whiteBright(" "));
});
program
    .command("connect")
    .description("Connect to a Shopify store / theme")
    .argument("[store]", "Shopify .myshopify.com string")
    .argument("[themeId]", "Shopify theme ID")
    .action((store, themeId) => {
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
        fs.writeFileSync(".shopsync.config.json", JSON.stringify({
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
});
program.parse();
