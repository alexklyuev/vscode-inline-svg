import * as vscode from 'vscode';


export interface InlineSvgContext {
    inlineSvgPanelActive: boolean;
    inlineSvgPanelOpen: boolean;
}


export class ContextManager {

    set<K extends keyof InlineSvgContext>(key: K, val: InlineSvgContext[K]) {
        return vscode.commands.executeCommand('setContext', key, val);
    }

    setMulti(keyvals: Partial<InlineSvgContext>) {
        return Promise.all(Object.keys(keyvals).map(key => {
            const val = keyvals[key as keyof InlineSvgContext];
            return vscode.commands.executeCommand('setContext', key, val);
        }));
    }


}
