import * as vscode from 'vscode';
import { NS } from './lib/config/config';
import { FragmentFinder } from './lib/services/fragment-finder';
import { PreviewTemplate } from './lib/services/preview-template';
import { AssetsManager } from './lib/services/assets-manager';
// import { ContextManager } from './lib/services/context-manager';
import { ZoomTool } from './lib/tools/zoom';
import { MoveTool } from './lib/tools/move';
import { FragmentPrinter } from './lib/services/fragment-printer';


export function activate(context: vscode.ExtensionContext) {

    const assetsManager = new AssetsManager(context.extensionPath);
    // const contextManager = new ContextManager();

    const zoomTool = new ZoomTool(assetsManager);
    zoomTool.addAssets();

    const moveTool = new MoveTool(assetsManager);
    moveTool.addAssets();

    let panel: vscode.WebviewPanel | null = null;

    const inlineSvgPreview = vscode.commands.registerCommand(`${NS}.preview`, () => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new FragmentFinder(activeTextEditor.document);
            const range = inlineFinder.findRange(activeTextEditor.selection.active);
            if (range) {
                const fragment = (new FragmentPrinter(range, activeTextEditor.document)).toString();
                if (panel) {
                    panel.dispose();
                    panel = null;
                }
                panel = vscode.window.createWebviewPanel(
                    `${NS}Panel`,
                    'Inline SVG Preview',
                    vscode.ViewColumn.Beside,
                    {
                        enableScripts: true,
                    },
                );
                const html = (new PreviewTemplate(fragment, assetsManager)).toString();
                panel.webview.html = html;
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
        if (panel) {
            zoomTool.zoomIn(panel);
        }
    });

    const zoomOut = vscode.commands.registerCommand(`${NS}.zoomOut`, () => {
        if (panel) {
            zoomTool.zoomOut(panel);
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
