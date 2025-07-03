#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import { fileURLToPath } from "url";
import init from "./actions/init";
import sync from "./actions/sync";
import connect from "./actions/connect";

// Determine version
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const version = packageJson.version;

// Base program
program
  .name("shopsync")
  .version(`${version}`)
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
