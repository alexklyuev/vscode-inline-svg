import * as vscode from 'vscode';

export class ContextManager {

    set<T>(key: string, val: T) {
        return vscode.commands.executeCommand('setContext', key, val);
    }

}
