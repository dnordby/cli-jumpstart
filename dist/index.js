#!/usr/bin/env node
import { program } from "commander";
import init from "./actions/init";
import sync from "./actions/sync";
import connect from "./actions/connect";
// Base program
program
    .name("shopsync")
    .version("1.1.3");
// Initialize command
program
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
