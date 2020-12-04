import m from 'mithril';

const Image = {
    view: (vnode) => {
        const {
            column,
            row,
            imgUrl, 
            author,
            onClick
        } = vnode.attrs;

        return m('.grid-square', {
            style: {
                gridColumn: column,
                gridRow: row,
            },
            onclick: (event) => onClick(event)
        }, [
            m('img', {
                src: imgUrl
            }),
            m('.author', [
                m('p', author)
            ])
        ])
    }
}

export default Image;