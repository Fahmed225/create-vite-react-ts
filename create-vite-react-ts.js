#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const BASE_DIR = "/Users/ahmedf1/Documents/sourcecode";

function runCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    process.exit(1);
  }
}

function setupTailwindCSS() {
  console.log("Setting up Tailwind CSS...");

  runCommand(
    "npm install -D tailwindcss@latest postcss@latest autoprefixer@latest"
  );
  runCommand("npx tailwindcss init -p");

  const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  fs.writeFileSync("tailwind.config.js", tailwindConfig);

  const tailwindCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;`;
  fs.writeFileSync("src/index.css", tailwindCSS);
}

function createViteReactTS() {
  const projectName = process.argv[2];
  if (!projectName) {
    console.error("Please provide a project name.");
    process.exit(1);
  }

  const additionalPackages = process.argv.slice(3);
  const projectPath = path.join(BASE_DIR, projectName);

  console.log(
    `Creating a new Vite React TypeScript project with Tailwind CSS: ${projectName}`
  );
  console.log(`Project will be created in: ${projectPath}`);

  // Create base directory if it doesn't exist
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  // Create Vite project
  runCommand(
    `npm create vite@latest ${projectName} -- --template react-swc-ts`,
    BASE_DIR
  );

  // Change to project directory
  process.chdir(projectPath);

  // Install dependencies
  console.log("Installing dependencies...");
  runCommand("npm install");

  // Setup Tailwind CSS
  setupTailwindCSS();

  // Install additional packages if specified
  if (additionalPackages.length > 0) {
    console.log("Installing additional packages...");
    runCommand(`npm install ${additionalPackages.join(" ")}`);
  }

  // Create a .vscode folder and settings.json file
  const vscodeDir = path.join(projectPath, ".vscode");
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir);
  }

  const settingsPath = path.join(vscodeDir, "settings.json");
  const settings = {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  };

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

  // Update App.tsx to include Tailwind classes
  const appTsxPath = path.join(projectPath, "src", "App.tsx");
  let appTsxContent = fs.readFileSync(appTsxPath, "utf8");
  appTsxContent = appTsxContent.replace(
    "<h1>Vite + React</h1>",
    '<h1 className="text-3xl font-bold underline">Vite + React + Tailwind CSS</h1>'
  );
  fs.writeFileSync(appTsxPath, appTsxContent);

  console.log("Project created successfully with Tailwind CSS!");

  // Open VSCode
  console.log("Opening VSCode...");
  runCommand("code .", projectPath);
}

createViteReactTS();
