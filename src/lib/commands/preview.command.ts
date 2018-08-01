import * as vscode from 'vscode';
import { NS } from '../config/config';
import { AssetsManager } from '../services/assets-manager';
import { FragmentFinder } from '../services/fragment-finder';
import { FragmentPrinter } from '../services/fragment-printer';
import { PreviewTemplate } from '../services/preview-template';
import { ContextManager } from '../services/context-manager';


export class PreviewCommand {
    private webviewPanel: vscode.WebviewPanel | null = null;

    constructor(
        private assetsManager: AssetsManager,
        private contextManager: ContextManager,
    ) {}

    get panel() {
        return this.webviewPanel;
    }

    preview() {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor) {
            const inlineFinder = new FragmentFinder(activeTextEditor.document);
            const range = inlineFinder.findRange(activeTextEditor.selection.active);
            if (range) {
                const fragment = (new FragmentPrinter(range, activeTextEditor.document)).toString();
                if (this.webviewPanel) {
                    this.webviewPanel.dispose();
                    this.webviewPanel = null;
                }
                this.webviewPanel = vscode.window.createWebviewPanel(
                    `${NS}Panel`,
                    'Inline SVG Preview',
                    vscode.ViewColumn.Beside,
                    {
                        enableScripts: true,
                    },
                );
                const html = (new PreviewTemplate(fragment, this.assetsManager)).toString();
                this.webviewPanel.webview.html = html;
                this.contextManager.set('inlineSvgPanelOpen', true);
                this.contextManager.set('inlineSvgPanelActive', true);
                this.webviewPanel.onDidDispose(() => {
                    this.contextManager.set('inlineSvgPanelOpen', false);
                    this.contextManager.set('inlineSvgPanelActive', false);
                    this.webviewPanel = null;
                });
                this.webviewPanel.onDidChangeViewState(_event => {
                    this.contextManager.set(
                        'inlineSvgPanelActive',
                        this.webviewPanel ? this.webviewPanel.active : false,
                    );
                });
            }
        }
        return Promise.resolve(this.panel);
    }

    update() {
        // TODO: implement
    }

}
