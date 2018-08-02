// @ts-check

window.addEventListener('message', event => {
    if ('svg' in event.data) {
        const svgOldEl = document.querySelector('svg');
        const { top, left, transform } = svgOldEl.style;
        document.body.removeChild(svgOldEl);
        const div = document.createElement('div');
        div.innerHTML = event.data.svg;
        const newSvg = div.firstChild;
        if (newSvg instanceof SVGElement) {
            Object.assign(newSvg.style, {transform});
            Object.assign(newSvg.style, {top, left});
            document.body.appendChild(newSvg);
        }
    }
});
