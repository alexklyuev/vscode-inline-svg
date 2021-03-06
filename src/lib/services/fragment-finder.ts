import { Position} from 'vscode';
import { SearchableDocument } from '../entities/searchable-document.entity';


export class FragmentFinder {

    constructor(
        private readonly textDocument: SearchableDocument,
    ) {}

    findRange(position: Position): [Position, Position] | undefined {
        const startPosition = this.findHalfRange(
            position,
            '<svg',
            -1,
            cursor => cursor > -1,
        );
        if (startPosition) {
            const endPosition = this.findHalfRange(
                position,
                '</svg',
                1,
                cursor => cursor <= this.textDocument.lineCount - 1,
            );
            if (endPosition) {
                const endPositionExpanded = this.getExpandedPosition(endPosition, '>');
                if (endPositionExpanded) {
                    return [startPosition, endPositionExpanded];
                } else {
                    return void 0;
                }
            } else {
                return void 0;
            }
        } else {
            return void 0;
        }
    }

    findHalfRange(
        position: Position,
        search: string,
        direction: 1 | -1,
        edgeCase: (lineNumber: number) => boolean, 
    ): Position | undefined {
        const { line } = position;
        let cursor = line;
        let targetLine = -1;
        let targetColumn = -1;
        do {
            const index = this.searchAtLine(cursor, search, position, direction);
            if (index > -1) {
                targetLine = cursor;
                targetColumn = index;
                break;
            } else {
                cursor += direction;
            }
        } while (edgeCase(cursor));
        if (targetLine > -1 && targetColumn > -1) {
            return new Position(targetLine, targetColumn);
        } else {
            return void 0;
        }
    }

    searchAtLine(line: number, search: string, position: Position, direction: 1 | -1): number {
        const { text } = this.textDocument.lineAt(line);
        let searchTarget = text;
        if (line === position.line) {
            if (direction === -1) {
                searchTarget = text.slice(0, position.character + search.length);
            }
            if (direction === 1) {
                let start = position.character - search.length - 1;
                start = start < 0 ? 0 : start;
                searchTarget = text.slice(start);
            }
        }
        return searchTarget.toLowerCase().indexOf(search.toLowerCase());
    }

    getExpandedPosition(position: Position, search: string): Position | undefined {
        const { line, character } = position;
        const { text: lineText } = this.textDocument.lineAt(line);
        const fromCharText = lineText.slice(character);
        const expandedChar = fromCharText.indexOf(search);
        if (expandedChar > -1) {
            return new Position(line, character + expandedChar + search.length);
        } else {
            return void 0;
        }
    }

}
