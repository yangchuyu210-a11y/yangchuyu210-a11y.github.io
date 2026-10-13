import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [{
    name: "github-pages-entries",
    apply: "build",
    writeBundle() {
      for (const route of ["work", "video", "contact", "yangchuyu", "work/lovel", "work/soni", "work/pine-valley", "work/kyrosai", "work/delane"]) {
        const directory = join("dist", route);
        mkdirSync(directory, { recursive: true });
        copyFileSync("dist/index.html", join(directory, "index.html"));
      }
    },
  }],
});
