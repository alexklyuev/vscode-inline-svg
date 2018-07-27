// @ts-check

window.addEventListener('load', () => {
    const svg = document.querySelector('svg');
    let x = 0;
    let y = 0;
    const onMousemove = event => {
        const { clientX, clientY } = event;
        Object.assign(svg.style, {
            top: clientY - y + 'px',
            left: clientX - x + 'px',
        });
    };
    const onMousedown = event => {
        const { clientX, clientY } = event;
        x = clientX - (parseInt(svg.style.left) || 0);
        y = clientY - (parseInt(svg.style.top) || 0);
        window.addEventListener('mousemove', onMousemove, false);
    };
    const onMouseup = event => {
        window.removeEventListener('mousemove', onMousemove, false);
    };
    window.addEventListener('mousedown', onMousedown, false);
    window.addEventListener('mouseup', onMouseup, false);
});
