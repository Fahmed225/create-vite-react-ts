# Create Vite React TypeScript Project

This is a command-line tool that creates a new Vite project with React, TypeScript, and Tailwind CSS, all set up and ready to go. The project is created in a specific directory on your machine.

## Features

- Creates a Vite project with React and TypeScript using SWC
- Sets up Tailwind CSS
- Installs additional npm packages as specified
- Creates projects in a specific directory
- Sets up VSCode settings for the project
- Opens the project in VSCode after creation

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/create-vite-react-ts.git
   ```
   Replace `yourusername` with your actual GitHub username.

2. Navigate to the cloned directory:
   ```
   cd create-vite-react-ts
   ```

3. Make sure you have Node.js and npm installed on your system.

4. Make the script executable:
   ```
   chmod +x create-vite-react-ts.js
   ```

5. Install the script globally:
   ```
   npm install -g .
   ```

## Usage

After installation, you can use the script from anywhere in your terminal:

```
create-vite-react-ts <project-name> [additional-packages]
```

For example:

```
create-vite-react-ts my-awesome-project redux react-router-dom
```

This will:

1. Create a new project named "my-awesome-project" in the directory `/Users/ahmedf1/Documents/sourcecode/my-awesome-project`
2. Set up Vite with React, TypeScript, and SWC
3. Install and configure Tailwind CSS
4. Install Redux and React Router DOM
5. Create a `.vscode/settings.json` file with some basic settings
6. Update `App.tsx` with a Tailwind CSS example
7. Open the project in VSCode

## Customization

The base directory where projects are created is set to `/Users/ahmedf1/Documents/sourcecode`. If you want to change this, you can modify the `BASE_DIR` constant at the top of the `create-vite-react-ts.js` file.

## Requirements

- Node.js
- npm
- VSCode (for automatic project opening)

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements or encounter any problems.

## License

This project is open source and available under the [MIT License](LICENSE).
