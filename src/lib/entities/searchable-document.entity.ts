import { TextDocument } from 'vscode';


export type SearchableDocument = Pick<TextDocument, 'lineCount' | 'lineAt'>;
