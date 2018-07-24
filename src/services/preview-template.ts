export class PreviewTemplate {

    constructor(
        private content: string,
    ) {}

    toString(): string {
        return (
`
<!DOCTYPE html>
<html>
    <body style="">
        ${this.content}
    </body>
</html>
`       );
    }

}
