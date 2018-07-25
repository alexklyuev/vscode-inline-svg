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
        position: relative;
        transform: scale(${ this.scale });
    ">
        ${ this.content }
    </body>
    <script>
        const { body } = document;
        body.style.cursor = 'move';
        const svg = document.querySelector('svg');
        let x = 0;
        let y = 0;
        const scale = 1;
        const onMousemove = event => {
            const {clientX, clientY} = event;
            const diffX = clientX - x;
            const diffY = clientY - y;
            body.style.top = diffY + 'px';
            body.style.left = diffX + 'px';
        };
        const onMousedown = event => {
            const {clientX, clientY} = event;
            x = clientX;
            y = clientY;
            body.addEventListener('mousemove', onMousemove, false);
        };
        const onMouseup = event => {
            const {clientX, clientY} = event;
            const diffX = clientX - x;
            const diffY = clientY - y;
            x = diffX;
            y = diffY;
            body.removeEventListener('mousemove', onMousemove, false);
        };
        svg.addEventListener('mousedown', onMousedown, false);
        body.addEventListener('mouseup', onMouseup, false);
        window.onload = () => {
            body.style.width = window.innerWidth + 'px';
            body.style.height = window.innerHeight + 'px';
        };
    </script>
</html>
`       );
    }

}
