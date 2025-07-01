# Shopsync
A lightweight CLI tool intended to keep premium versioned themes in sync with updates, without losing, or overwriting theme, style, and functional customizations.

It is primarily intended to be used with **existing** stores, but future enhancements are in the roadmap to consider starting brand new builds using this as a starter.

## Dependencies
 - `node` >= `v20.19.0`
 - `npm` >= `v10.8.2`
 - [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)

## Installation
`npm i -g @shopsync/cli`


## Usage

### Usage help:

`shopsync -h`

### Getting Started:
In the directory you want to start a new project, or pull in an existing store:

- `shopsync [directory]` 
  - Replace `[directory]` with your project name.
- `cd` into the newly created `[directory]`
- `shopsync connect [store] [themeId]`
  - `[store]` accepts a string: the store's `.myshopify.com` URL. Include the full URL.
    - Example: `test.myshopify.com`
    - Invalid: `test` (implied `.myshopify.com` does not work)
  - `themeId` accepts a string: the theme ID as found in Shopify

Once complete, the CLI will connect to the store and theme specified, pull in the latest code from that instance, and output success messages. If there is an error, these will be displayed instead.

---

## Troubleshooting
If `shopsync connect [store] [themeId]` appears to hang, please ensure you are authenticated to Shopify in your terminal. To validate, you can try a command like `shopify theme pull`. If an error is thrown, you are not authenticated and the CLI will not surface commands to log in to Shopify. Please login before continuing.