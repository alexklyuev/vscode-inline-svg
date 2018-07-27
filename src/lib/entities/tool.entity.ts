import { ContextManager } from '../services/context-manager';
import { AssetsManager } from '../services/assets-manager';


export interface Tool {
    constructor(
        contextManager: ContextManager,
        assetsManager: AssetsManager,
    ): any;
}