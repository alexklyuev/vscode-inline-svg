import { AssetsManager } from '../services/assets-manager';
import { Tool } from '../entities/tool.entity';


export class MoveTool implements Tool {
    
    registerAssets(assetsManager: AssetsManager) {
        assetsManager.addScript('assets', 'tools', 'move', 'move.js');
        assetsManager.addStyle('assets', 'tools', 'move', 'move.css');
    }

}
