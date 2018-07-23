'use strict';
import * as vscode from 'vscode';
import { InlineFinder } from './services/inline-finder';

export function activate(context: vscode.ExtensionContext) {

    const inlineSvgPreview = vscode.commands.registerCommand('inlineSvg.preview', () => {
        // vscode.window.showInformationMessage('Hello World!');
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new InlineFinder(activeTextEditor);
            console.info('!found!', inlineFinder.findAtActiveLine());
        }
    });

    const inlineSvgScan = vscode.commands.registerCommand('inlineSvg.scan', () => {
        const { workspaceFolders } = vscode.workspace;
        if (workspaceFolders) {
            // scan all workspace forlders
            console.info('workspaceFolders', workspaceFolders.length, workspaceFolders);
        }
    });

    context.subscriptions.push(
        inlineSvgPreview,
        inlineSvgScan,
    );
}

export function deactivate() {
}
