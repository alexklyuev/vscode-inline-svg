import * as vscode from 'vscode';


export class InlineFinder {

    constructor(
        private readonly activeTextEditor: vscode.TextEditor,
    ) {}

    findAtActiveLine(): [number, number, number, number] | undefined {
        const line = this.activeTextEditor.selection.active.line;
        return this.findAtLine(line);
    }

    findAtLine(line: number): [number, number, number, number] | undefined {
        const [startLine, startColumn] = this.findHalfRange(line, '<svg', -1, cursor => cursor > -1);
        if (startLine > -1) {
            const [endLine, endColumn] = this.findHalfRange(line, '</svg', 1, cursor => cursor <= this.activeTextEditor.document.lineCount - 1);
            if (endLine > -1) {
                return [startLine, startColumn, endLine, endColumn];
            } else {
                return void 0;
            }
        } else {
            return void 0;
        }
    }

    private findHalfRange(
        line: number,
        search: string,
        direction: 1 | -1,
        edgeCase: (lineNumber: number) => boolean, 
    ): [number, number] {
        let cursor = line;
        let targetLine = -1;
        let targetColumn = -1;
        do {
            const index = this.searchAtLine(cursor, search);
            if (index > -1) {
                targetLine = cursor;
                targetColumn = index;
                break;
            } else {
                cursor += direction;
            }
        } while (edgeCase(cursor));
        return [targetLine, targetColumn];
    }

    private searchAtLine(line: number, search: string): number {
        const { text } = this.activeTextEditor.document.lineAt(line);
        return text.toLowerCase().indexOf(search.toLowerCase());
    }

}
