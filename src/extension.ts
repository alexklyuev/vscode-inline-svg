import * as vscode from 'vscode';
import { NS } from './config/config';
import { InlineFinder } from './services/inline-finder';
import { PreviewTemplate } from './services/preview-template';


export function activate(context: vscode.ExtensionContext) {

    let panel: vscode.WebviewPanel | null = null;
    let html: string | null = null;
    let scale = 1;

    const inlineSvgPreview = vscode.commands.registerCommand(`${NS}.preview`, () => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new InlineFinder(activeTextEditor.document);
            const fragment = inlineFinder.getFragment(activeTextEditor.selection.active);
            if (fragment) {
                if (panel) {
                    panel.dispose();
                    panel = null;
                }
                html = fragment;
                scale = 1;
                panel = vscode.window.createWebviewPanel(
                    `${NS}Panel`,
                    'Inline SVG Preview',
                    vscode.ViewColumn.Beside,
                    {
                        enableScripts: true,
                    },
                );
                panel.webview.html = (new PreviewTemplate(html, scale)).toString();
                vscode.commands.executeCommand('setContext', 'inlineSvgPanelActive', true);
                panel.onDidDispose(() => {
                    vscode.commands.executeCommand('setContext', 'inlineSvgPanelActive', false);
                    panel = null;
                });
                panel.onDidChangeViewState(_event => {
                    vscode.commands.executeCommand('setContext', 'inlineSvgPanelActive', panel!.active);
                });
            }
        }
    });

    const zoomIn = vscode.commands.registerCommand(`${NS}.zoomIn`, () => {
        if (panel && html) {
            scale += 0.1;
            panel.webview.html = (new PreviewTemplate(html, scale)).toString();
        }
    });

    const zoomOut = vscode.commands.registerCommand(`${NS}.zoomOut`, () => {
        if (panel && html) {
            scale -= 0.1;
            panel.webview.html = (new PreviewTemplate(html, scale)).toString();
        }
    });

    context.subscriptions.push(
        inlineSvgPreview,
        zoomIn,
        zoomOut,
    );
}

export function deactivate() {
}
