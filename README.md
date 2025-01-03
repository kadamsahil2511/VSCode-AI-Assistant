# ThemzWay - Programming Practice Extension

A VS Code extension that helps developers practice programming by generating questions and providing AI-powered solutions using local LLMs through Ollama. [Get it from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=themzway.themzway)

## Features

### 1. Create Practice Files
- Quickly create multiple C++ template files for practice
- Files are created in your current workspace
- Each file comes with a basic C++ structure

### 2. Practice Programming Questions
- Generate programming questions based on difficulty levels:
  - Beginner
  - Intermediate
  - Expert
- Choose the number of questions you want to generate
- Questions are saved as C++ files with problem statements in comments

### 3. Ask Me Anything (AMA)
- Ask any programming-related question
- Get AI-generated solutions using your local Ollama model
- Solutions are organized in folders named after the question
- Each solution includes:
  - Original problem statement
  - Complete code implementation

## Requirements

- VS Code 1.95.0 or higher
- Node.js
- [Ollama](https://ollama.ai/) installed and running locally
- Any Ollama-compatible LLM model (e.g., Llama2, CodeLlama, Mistral)

## Installation

1. Install the extension from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=themzway.themzway)
2. Install Ollama on your system
3. Pull your preferred LLM model using Ollama
4. Make sure Ollama is running locally on port 11434 (default port)

## Usage

### Creating Practice Files
1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Create Files"
3. Enter the number of files you want to create

### Generating Practice Questions
1. Open Command Palette
2. Type "Practice Programming Questions"
3. Select difficulty level
4. Enter the number of questions
5. Questions will be generated as C++ files in your workspace

### Using Ask Me Anything
1. Open Command Palette
2. Type "Ask Me Anything"
3. Enter your programming question
4. A new folder will be created with the solution

## Extension Settings

This extension contributes the following commands:
- `themzway.createFiles`: Create multiple practice files
- `themzway.practice`: Generate practice questions
- `themzway.ama`: Ask programming questions and get solutions

## Release Notes

### Version 3.2.3
- Added local LLM support through Ollama
- Improved error handling
- Enhanced question generation
- Better folder organization for solutions

## Contributing

Feel free to submit issues and enhancement requests on our GitHub repository.

## License

This extension is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Powered by Ollama and your choice of local LLM models
- Built with VS Code Extension API

---

**Note**: Make sure Ollama is running before using the extension. You can check by visiting `http://localhost:11434` in your browser.