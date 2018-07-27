import { WebviewPanel } from 'vscode';
import { AssetsManager } from '../services/assets-manager';


export class ZoomTool {

    constructor(
        private assetsManager: AssetsManager,
    ) {
    }
    
    addAssets() {
        this.assetsManager.addScript('assets', 'tools', 'zoom', 'zoom.js');
    }

    zoomIn(panel: WebviewPanel) {
        panel.webview.postMessage({scale: 0.1});
    }

    zoomOut(panel: WebviewPanel) {
        panel.webview.postMessage({scale: -0.1});
    }

}
