import * as vscode from 'vscode';


export interface InlineSvgContext {
    inlineSvgPanelActive: boolean;
}


export class ContextManager {

    set<K extends keyof InlineSvgContext>(key: K, val: InlineSvgContext[K]) {
        return vscode.commands.executeCommand('setContext', key, val);
    }

}
