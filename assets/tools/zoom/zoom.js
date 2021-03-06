// @ts-check

window.addEventListener('load', () => {
    let scale = 1;
    window.addEventListener('message', event => {
        const svg = document.querySelector('svg');
        const { data } = event;
        if ('scale' in data) {
            scale += data.scale;
        }
        if ('scaleAbs' in data) {
            scale = data.scaleAbs;
        }
        svg.style.transform = `scale(${ scale })`;
    });
});
