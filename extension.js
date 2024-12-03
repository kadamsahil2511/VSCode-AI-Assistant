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
                const fileName = path.join(rootPath, `Ques_${i}.cpp`);
                const fileContent = `#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`;

                fs.writeFileSync(fileName, fileContent);
            }

            vscode.window.showInformationMessage(`${numFiles} file(s) created successfully.`);
        } else {
            vscode.window.showErrorMessage('No workspace folder is open.');
        }
    });

    // New command: Ask Me Anything (ama)
    let amaCommand = vscode.commands.registerCommand('themzway.ama', async () => {
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
                const prompt = `Generate ${selectedLevel} level pogamming question in C++ ${i}`;
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

    context.subscriptions.push(createFilesCommand);
    context.subscriptions.push(amaCommand);
}

function deactivate() {
    // Perform any cleanup necessary when the extension is deactivated
}

module.exports = {
    activate,
    deactivate
};
