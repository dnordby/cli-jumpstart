import { readdir, readFile, writeFile, stat } from "fs/promises";
import path from "path";

async function fixExtensions(dir: string) {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      await fixExtensions(fullPath);
    } else if (entry.endsWith(".js")) {
      let content = await readFile(fullPath, "utf8");

      // Append `.js` extension to relative imports missing it
      content = content.replace(
        /(from\s+['"](\.\/|\.\.\/)[^'"]+?)(?<!\.js)(?=['"])/g,
        "$1.js"
      );

      await writeFile(fullPath, content, "utf8");
    }
  }
}

async function main() {
  const distDir = path.resolve(process.cwd(), "dist");
  await fixExtensions(distDir);
}

main().catch((err) => {
  process.exit(1);
});
