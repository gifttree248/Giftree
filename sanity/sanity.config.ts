import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";

export default defineConfig({
  name: "gifttree4-studio",
  title: "GIFTREE Studio",
  projectId: "wnzlt1qo",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
