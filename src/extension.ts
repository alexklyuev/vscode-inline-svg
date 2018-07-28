import * as vscode from 'vscode';
import { NS } from './lib/config/config';
import { FragmentFinder } from './lib/services/fragment-finder';
import { PreviewTemplate } from './lib/services/preview-template';
import { AssetsManager } from './lib/services/assets-manager';
import { ContextManager } from './lib/services/context-manager';
import { ZoomTool } from './lib/tools/zoom';
import { MoveTool } from './lib/tools/move';
import { FragmentPrinter } from './lib/services/fragment-printer';
import { ToolsManager } from './lib/services/tools-manager';


export function activate(context: vscode.ExtensionContext) {

    const assetsManager = new AssetsManager(context.extensionPath);
    const contextManager = new ContextManager();
    const toolsManager = new ToolsManager(assetsManager);
    const zoomTool = toolsManager.registerTool(ZoomTool);
    toolsManager.registerTool(MoveTool);

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
                contextManager.set('inlineSvgPanelActive', true);
                panel.onDidDispose(() => {
                    contextManager.set('inlineSvgPanelActive', false);
                    panel = null;
                });
                panel.onDidChangeViewState(_event => {
                    contextManager.set('inlineSvgPanelActive', panel ? panel.active : false);
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
