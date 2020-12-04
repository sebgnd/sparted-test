import m from 'mithril';

const ImageViewer = {
    view: (vnode) => {
        const {
            imgSrc,
            onClose
        } = vnode.attrs;

        if (imgSrc) {
            return m('.viewer', [
                m('img', { src: imgSrc }),
                m('i', {
                    class: 'fas fa-times-circle close',
                    onclick: onClose
                })
            ])
        }
    }
}

export default ImageViewer;