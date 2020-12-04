import m from 'mithril';
import Spinner from './Spinner';

const Image = () => {
    let loading = true;

    const toggleLoading = () => {
        loading = !loading;
        m.redraw();
    }

    return {
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
                    src: imgUrl,
                    style: {
                        opacity: loading ? '0' : '1'
                    },
                    onload: toggleLoading
                }),
                m('.author', [
                    m('p', author)
                ]),

                // Show loading inside grid square
                loading
                    ? m(Spinner, { centerAbsolute: true })
                    : null
            ])
        }
    }
}

export default Image;