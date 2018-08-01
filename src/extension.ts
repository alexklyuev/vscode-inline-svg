import * as vscode from 'vscode';
import { NS } from './lib/config/config';
import { AssetsManager } from './lib/services/assets-manager';
import { ContextManager } from './lib/services/context-manager';
import { ZoomTool } from './lib/tools/zoom';
import { MoveTool } from './lib/tools/move';
import { ToolsManager } from './lib/services/tools-manager';
import { PreviewCommand } from './lib/commands/preview.command';


export function activate(context: vscode.ExtensionContext) {

    const assetsManager = new AssetsManager(context.extensionPath);
    const contextManager = new ContextManager();
    const preview = new PreviewCommand(assetsManager, contextManager);
    const toolsManager = new ToolsManager(assetsManager);
    const zoomTool = toolsManager.registerTool(ZoomTool);
    toolsManager.registerTool(MoveTool);

    const inlineSvgPreview = vscode.commands.registerCommand(`${NS}.preview`, () => {
        return preview.preview();
    });

    const inlineSvgUpdate = vscode.commands.registerCommand(`${NS}.update`, () => {
        return preview.preview();
    });

    const zoomIn = vscode.commands.registerCommand(`${NS}.zoomIn`, () => {
        if (preview.panel) {
            zoomTool.zoomIn(preview.panel);
        }
    });

    const zoomOut = vscode.commands.registerCommand(`${NS}.zoomOut`, () => {
        if (preview.panel) {
            zoomTool.zoomOut(preview.panel);
        }
    });

    const defaultScale = vscode.commands.registerCommand(`${NS}.defaultScale`, () => {
        if (preview.panel) {
            zoomTool.defaultScale(preview.panel);
        }
    });

    context.subscriptions.push(
        inlineSvgPreview,
        inlineSvgUpdate,
        zoomIn,
        zoomOut,
        defaultScale,
    );
}

export function deactivate() {
}
