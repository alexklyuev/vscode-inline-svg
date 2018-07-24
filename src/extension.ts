import * as vscode from 'vscode';
import { InlineFinder } from './services/inline-finder';
import { PreviewTemplate } from './services/preview-template';


export function activate(context: vscode.ExtensionContext) {

    const inlineSvgPreview = vscode.commands.registerCommand('inlineSvg.preview', () => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new InlineFinder(activeTextEditor.document);
            const fragment = inlineFinder.getFragment(activeTextEditor.selection.active);
            if (fragment) {
                const panel = vscode.window.createWebviewPanel('inlineSvg', 'Inline SVG Preview', vscode.ViewColumn.Beside, {});
                panel.webview.html = (new PreviewTemplate(fragment)).toString();
            }
        }
    });

    context.subscriptions.push(
        inlineSvgPreview,
    );
}

export function deactivate() {
}
