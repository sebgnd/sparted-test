import m from 'mithril';
import Image from './Image';

const Grid = () => {
    return {
        view: (vnode) => {
            const { onImageClick, width, images } = vnode.attrs;

            return m('.grid', { style: {
                    gridTemplateColumns: `repeat(${width}, ${100 / width}%)`
                }
            }, images.map((image, index) => {
                return m(Image, {
                    column: `${image.x} / span ${image.width}`,
                    row: `${image.y} / span ${image.height}`,
                    imgUrl: image.download_url,
                    author: image.author,
                    onClick: () => onImageClick(index)
                })
            }))
        }
    }
}

export default Grid;