import { AssetsManager } from './assets-manager';


export class PreviewTemplate {

    constructor(
        private content: string,
        private assetsManager: AssetsManager,
    ) {}

    toString(): string {
        return (
`
<!DOCTYPE html>
<html>
    <head>
        ${ this.assetsManager.getStylesUris().map(uri => `<link rel="stylesheet" href="${ uri }" />`).join('') }
    </head>
    <body>
        ${ this.content }
        ${ this.assetsManager.getScriptsUris().map(uri => `<script src="${ uri }"></script>`).join('') }
    </body>
</html>
`       );
    }

}
