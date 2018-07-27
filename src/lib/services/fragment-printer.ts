import { Position } from 'vscode';
import { SearchableDocument } from '../entities/searchable-document.entity';


export class FragmentPrinter {

    constructor(
        private readonly range: [Position, Position],
        private readonly textDocument: SearchableDocument,
    ) {}

    toString(): string {
        return this.toLines().map(line => line.trim()).join(' ');
    }

    toLines(): string[] {
        const [start, end] = this.range;
        const lines = Array<string>();
        for (let line = start.line; line <= end.line; line++) {
            lines.push(this.textDocument.lineAt(line).text);
        }
        lines[0] = lines[0].slice(start.character);
        lines[lines.length - 1] = lines[lines.length - 1].slice(0, end.character);
        return lines;
    }

}
