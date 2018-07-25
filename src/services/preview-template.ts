export class PreviewTemplate {

    constructor(
        private content: string,
        private scale: number,
    ) {}

    toString(): string {
        return (
`
<!DOCTYPE html>
<html>
    <body style="
        transform: scale(${ this.scale });
    ">
        ${ this.content }
    </body>
</html>
`       );
    }

}
