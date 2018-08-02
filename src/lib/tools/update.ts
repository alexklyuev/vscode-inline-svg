import { Tool } from '../entities/tool.entity';
import { AssetsManager } from '../services/assets-manager';

export class UpdateTool implements Tool {

    registerAssets(
        assetsManager: AssetsManager,
    ) {
        assetsManager.addScript('assets', 'tools', 'update', 'update.js');
    }

}