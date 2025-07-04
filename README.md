# Shopsync

A lightweight CLI tool intended to keep premium versioned Shopify themes in sync with updates, without losing, or overwriting theme, style, and functional customizations.

It is primarily intended to be used with **existing** stores, but future enhancements are in the roadmap to consider starting brand new builds using this as a starter.

## Dependencies

- `node` >= `v20.19.0`
- `npm` >= `v10.8.2`
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [theme-check](https://github.com/Shopify/theme-check)

## Installation

`npm i -g @shopsync/cli`

## Usage

### General:

**Help:** `shopsync -h` \
**Version:** `shopsync -V`

### Getting Started:

**Create Shopsync Project** \
`shopsync init [directory]`

**Connect to Shopify** \
`shopsync connect [store] [themeId]`

**Sync customizations to local theme** \
`shopsync sync`

---

## Troubleshooting

If `shopsync connect [store] [themeId]` appears to hang, please ensure you are authenticated to Shopify in your terminal. To validate, you can try a command like `shopify theme pull`. If an error is thrown, you are not authenticated and the CLI will not surface commands to log in to Shopify. Please login before continuing.
