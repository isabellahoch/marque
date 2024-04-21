import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('marque is now active!');

	let watermark = vscode.commands.registerCommand('marque.watermarkCode', () => {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// Get the document and its content
			const document = editor.document;
			const content = document.getText();

			// Generate a custom whitespace hash - TBD!
			// const whitespaceHash = generateWhitespaceHash();

			// Replace all whitespace with invisible whitespace characters
			const invisibleWhitespace = '\u200B'; // Invisible whitespace character

			// Insert invisible whitespace after every individual regex \s
			// const modifiedContent = content.replace(/\s/g, '$&' + invisibleWhitespace);

			// Insert invisible whitespace randomly
			const modifiedContentWithRandomWhitespace = insertRandomWhitespace(content);

			// Function to insert invisible whitespace randomly
			function insertRandomWhitespace(content: string): string {
				const contentArray = content.split('');
				for (let i = 0; i < contentArray.length; i++) {
					if (contentArray[i] === ' ') {
						contentArray[i] = Math.random() < 0.5 ? ' ' : ` ${invisibleWhitespace}${invisibleWhitespace}`;
					}
				}
				return contentArray.join('');
			}

			// Replace the existing code with the modified content with random whitespace
			editor.edit((editBuilder) => {
				const startPosition = new vscode.Position(0, 0);
				const endPosition = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
				const range = new vscode.Range(startPosition, endPosition);
				editBuilder.replace(range, modifiedContentWithRandomWhitespace);
			});

			// Display a message box to the user
			vscode.window.showInformationMessage('marque: File successfully watermarked!');
		}

		function generateWhitespaceHash() {
			// Generate a unique hash using a combination of current timestamp and a random number
			const timestamp = Date.now();
			const randomNumber = Math.floor(Math.random() * 1000);
			return `WHITESPACE_HASH_${timestamp}_${randomNumber}`; // need to ensure that this is somehow unique to the current user
		}
	});

	context.subscriptions.push(watermark);
}

// This method is called when your extension is deactivated
export function deactivate() {}
