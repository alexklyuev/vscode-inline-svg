import { WebviewPanel } from 'vscode';
import { AssetsManager } from '../services/assets-manager';
import { Tool } from '../entities/tool.entity';


export interface ZoomMessage {
    scale: number;
    scaleAbs: number;
}


export class ZoomTool implements Tool {
    
    registerAssets(assetsManager: AssetsManager) {
        assetsManager.addScript('assets', 'tools', 'zoom', 'zoom.js');
    }

    zoomIn(panel: WebviewPanel) {
        this.postToPanel(panel, {scale: 0.1});
    }

    zoomOut(panel: WebviewPanel) {
        this.postToPanel(panel, {scale: -0.1});
    }

    defaultScale(panel: WebviewPanel) {
        this.postToPanel(panel, {scaleAbs: 1.0});
    }

    private postToPanel(panel: WebviewPanel, message: Partial<ZoomMessage>) {
        panel.webview.postMessage(message);
    }

}
