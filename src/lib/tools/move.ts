import { AssetsManager } from '../services/assets-manager';


export class MoveTool {

    constructor(
        private assetsManager: AssetsManager,
    ) {
    }
    
    addAssets() {
        this.assetsManager.addScript('assets', 'tools', 'move', 'move.js');
        this.assetsManager.addStyle('assets', 'tools', 'move', 'move.css');
    }

}
