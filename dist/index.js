#!/usr/bin/env node
import { program } from "commander";
import init from "./actions/init.js";
import sync from "./actions/sync.js";
import connect from "./actions/connect.js";
// Base program
program
    .name("shopsync")
    .version("1.2.0")
    .showHelpAfterError();
// Initialize command
program
    .command("init")
    .description("Initialize shopsync directory")
    .argument("[directory]", "The directory name to initialize")
    .action(init);
// Connect command
program
    .command("connect")
    .description("Connect to a Shopify store / theme")
    .argument("[store]", "Shopify .myshopify.com string")
    .argument("[themeId]", "Shopify theme ID")
    .action(connect);
// Sync command
program
    .command("sync")
    .description("Sync custom changes to local Shopify theme")
    .action(sync);
// Parse arguments and complete program
program.parse();
