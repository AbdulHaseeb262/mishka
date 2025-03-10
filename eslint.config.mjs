import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

// Filter out any function values (like "parse")
const filteredConfig = eslintConfig.map((config) => {
  return JSON.parse(JSON.stringify(config)); // Removes non-serializable values
});

export default filteredConfig;
