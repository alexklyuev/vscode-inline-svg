import * as vscode from 'vscode';
import { NS } from './config/config';
import { InlineFinder } from './services/inline-finder';
import { PreviewTemplate } from './services/preview-template';


export function activate(context: vscode.ExtensionContext) {

    const inlineSvgPreview = vscode.commands.registerCommand(`${NS}.preview`, () => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new InlineFinder(activeTextEditor.document);
            const fragment = inlineFinder.getFragment(activeTextEditor.selection.active);
            if (fragment) {
                const panel = vscode.window.createWebviewPanel(`${NS}Panel`, 'Inline SVG Preview', vscode.ViewColumn.Beside, {});
                panel.webview.html = (new PreviewTemplate(fragment)).toString();
            }
        }
    });

    const zoomIn = vscode.commands.registerCommand(`${NS}.zoomIn`, () => {
        console.info('zoom in');
    });

    const zoomOut = vscode.commands.registerCommand(`${NS}.zoomOut`, () => {
        console.info('zoom out');
    });

    context.subscriptions.push(
        inlineSvgPreview,
        zoomIn,
        zoomOut,
    );
}

export function deactivate() {
}
