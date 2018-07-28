import { Tool } from '../entities/tool.entity';
import { AssetsManager } from './assets-manager';


export class ToolsManager {

    constructor(
        private assetsManager: AssetsManager,
    ) {}

    registerTool<T extends Tool>(ToolContstructor: {new (): T}): T {
        const tool = new ToolContstructor();
        tool.registerAssets(this.assetsManager);
        return tool;
    }

}
