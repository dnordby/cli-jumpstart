#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
program
    .name("jumpstart")
    .description("Initialize a jumpstart watcher for a Shopify theme")
    .version("1.0.0");
program
    .description("Initialize jumpstart directory")
    .argument("[directory]", "The directory name to initialize")
    .action((directory) => {
    console.log(chalk.bgGreenBright("Initializing jumpstart directory..."));
    console.log(chalk.white(" "));
    const jumpstartUrl = `https://github.com/dnordby/jumpstart.git`;
    const fullPath = path.resolve(process.cwd(), directory);
    if (fs.existsSync(fullPath)) {
        console.log(chalk.bgRedBright(`Directory ${directory} already exists`));
        return;
    }
    try {
        execSync(`git clone ${jumpstartUrl}`, { stdio: "inherit" });
        execSync(`mv jumpstart ${directory}`, { stdio: "inherit" });
        execSync(`cd ${directory} && npm install`, { stdio: "inherit" });
        execSync(`cd ${directory} && touch .env`, { stdio: "inherit" });
    }
    catch (error) {
        console.log(chalk.bgRedBright(`Error initializing jumpstart for ${directory}`));
        return;
    }
    console.log(chalk.white(" "));
    console.log(chalk.bgGreenBright(`Complete!`));
    console.log(chalk.white(" "));
    console.log(chalk.whiteBright(`💡 Run this to connect to your store:`));
    console.log(chalk.white.bgBlack(`$ cd ${directory}`));
    console.log(chalk.white.bgBlack(`$ jumpstart connect [store] [themeId]`));
    console.log(chalk.white(" "));
});
program
    .command("connect")
    .description("Connect to a Shopify store / theme")
    .argument("[store]", "Shopify .myshopify.com string")
    .argument("[themeId]", "Shopify theme ID")
    .action((store, themeId) => {
    console.log(chalk.bgGreenBright(" Connecting to Shopify store... "));
    console.log(chalk.white(" "));
    console.log(chalk.whiteBright(`Store: ${store}`));
    console.log(chalk.whiteBright(`Theme: ${themeId}`));
    console.log(chalk.white(" "));
    const storeConfig = `STORE="${store}"`;
    const themeConfig = `THEME_ID=${themeId}`;
    try {
        fs.writeFileSync(".env", `${storeConfig}\n${themeConfig}`);
        execSync(`cd theme && shopify theme pull --theme ${themeId} --store ${store} --force`);
        console.log(chalk.bgGreenBright(`Complete!`));
        console.log(chalk.white(" "));
        console.log(chalk.whiteBright(`💡 Run this to get started:`));
        console.log(chalk.white.bgBlack(`$ npm run dev`));
        console.log(chalk.white(" "));
        console.log(chalk.whiteBright("ℹ️  Connected to Theme ID " +
            themeId +
            "...if you want to test another theme, modify the " +
            chalk.bgBlack("shopify-cli.yml") +
            " file."));
        console.log(chalk.white(" "));
    }
    catch (error) {
        console.log(chalk.bgRedBright(`Error writing .env file`));
        return;
    }
});
program.parse();
// console.log(chalk.red(program.args[0].split(options.separator, limit)));
