import { WebviewPanel } from 'vscode';
import { AssetsManager } from '../services/assets-manager';
import { Tool } from '../entities/tool.entity';


export class ZoomTool implements Tool {
    
    registerAssets(assetsManager: AssetsManager) {
        assetsManager.addScript('assets', 'tools', 'zoom', 'zoom.js');
    }

    zoomIn(panel: WebviewPanel) {
        panel.webview.postMessage({scale: 0.1});
    }

    zoomOut(panel: WebviewPanel) {
        panel.webview.postMessage({scale: -0.1});
    }

}
