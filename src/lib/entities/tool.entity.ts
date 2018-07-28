import { AssetsManager } from '../services/assets-manager';


export interface Tool {
    registerAssets(assetsManager: AssetsManager): void;
}
