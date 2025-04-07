const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function activate(context) {
    // Existing command: Create multiple C++ files
    let createFilesCommand = vscode.commands.registerCommand('themzway.createFiles', async () => {
        const numFilesInput = await vscode.window.showInputBox({ 
            prompt: 'Enter the number of files to create', 
            value: '' 
        });

        const numFiles = numFilesInput && !isNaN(Number(numFilesInput)) ? Number(numFilesInput) : 1;

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;

            for (let i = 1; i <= numFiles; ++i) {
                const fileName = path.join(rootPath, `Ques_${i}.java`);
                const fileContent = `#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`;

                fs.writeFileSync(fileName, fileContent);
            }

            vscode.window.showInformationMessage(`${numFiles} file(s) created successfully.`);
        } else {
            vscode.window.showErrorMessage('No workspace folder is open.');
        }
    });

    // Renamed command: Practice (previously ama)
    let practiceCommand = vscode.commands.registerCommand('themzway.practice', async () => {
        const levels = ['Beginner', 'Intermediate', 'Expert'];
        const selectedLevel = await vscode.window.showQuickPick(levels, {
            placeHolder: 'Select the difficulty level'
        });

        if (!selectedLevel) {
            vscode.window.showErrorMessage('Please select a difficulty level.');
            return;
        }

        const numQuestionsInput = await vscode.window.showInputBox({
            prompt: `Enter the number of ${selectedLevel} questions to generate`,
            value: ''
        });

        const numQuestions = numQuestionsInput && !isNaN(Number(numQuestionsInput)) ? Number(numQuestionsInput) : 1;

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const rootPath = workspaceFolders[0].uri.fsPath;

            for (let i = 1; i <= numQuestions; ++i) {
                const prompt = `Generate ${selectedLevel} level programming question in C++ ${i}`;
                const response = execSync(`curl http://localhost:11434/api/generate -d '{"model": "llama3.2", "prompt": "${prompt}", "stream": false}'`, { encoding: 'utf8' });
                const responseObject = JSON.parse(response);
                const question = responseObject.response;

                const fileName = path.join(rootPath, `${selectedLevel}_Ques_${i}.cpp`);
                const fileContent = `// ${question}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`;

                fs.writeFileSync(fileName, fileContent);
            }

            vscode.window.showInformationMessage(`${numQuestions} ${selectedLevel} question file(s) created successfully.`);
        } else {
            vscode.window.showErrorMessage('No workspace folder is open.');
        }
    });

    // New command: Ask Me Anything
    let amaCommand = vscode.commands.registerCommand('themzway.ama', async () => {
        const prompt = await vscode.window.showInputBox({
            prompt: 'Enter your programming question/prompt',
            placeHolder: 'e.g., Write a program to find factorial of a number'
        });

        if (!prompt) {
            vscode.window.showErrorMessage('Please provide a prompt.');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            try {
                // Get summary for folder name
                const summaryPrompt = `Give a 3 word summary of this, separated by underscores: ${prompt}`;
                const summaryResponse = execSync(`curl http://localhost:11434/api/generate -d '{"model": "llama3.2", "prompt": "${summaryPrompt}", "stream": false}'`, { encoding: 'utf8' });
                const summaryObject = JSON.parse(summaryResponse);
                const folderName = summaryObject.response.trim().replace(/[^a-zA-Z_]/g, '');

                // Get code solution
                const codePrompt = `Write a complete code solution for this problem: ${prompt}`;
                const codeResponse = execSync(`curl http://localhost:11434/api/generate -d '{"model": "llama3.2", "prompt": "${codePrompt}", "stream": false}'`, { encoding: 'utf8' });
                const codeObject = JSON.parse(codeResponse);
                const code = codeObject.response;

                // Create folder and file
                const folderPath = path.join(workspaceFolders[0].uri.fsPath, folderName);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                const fileName = path.join(folderPath, 'solution.java');
                const fileContent = `/*
Problem Statement:
${prompt}
*/

${code}`;

                fs.writeFileSync(fileName, fileContent);
                vscode.window.showInformationMessage('Solution created successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        } else {
            vscode.window.showErrorMessage('No workspace folder is open.');
        }
    });

    context.subscriptions.push(createFilesCommand);
    context.subscriptions.push(practiceCommand);
    context.subscriptions.push(amaCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
