import { Tool } from '../entities/tool.entity';


export class ToolsManager {
    private tools = Array<Tool>();

    addTool(tool: Tool) {
        return this.tools.push(tool);
    }

}