import m from 'mithril';
import { getRandom } from './utils';

export class PicsumService {
    static async getImageList(page, amount) {
        const baseUrl = 'https://picsum.photos'
        const url = `${baseUrl}/v2/list?page=${page}&limit=${amount}`;
        const options = {
            method: 'GET',
            url,
        }
        const result = await m.request(options);
        return result;
    }

    // Does not always send amount image
    // Sometimes can't find image at random resolution
    static async getLowResolutionImages(amount) {
        const baseUrl = 'https://picsum.photos';
        const res = [];

        for (let i = 0; i < amount; i++) {
            const width = getRandom(150, 750);
            const height = getRandom(150, 750);
            const seed = width + height;

            res.push({
                download_url: `${baseUrl}/seed/${seed}/${width}/${height}`,
                author: 'Unknown'
            });
        }

        return res;
    }

    static randomizePositions(images, width, height) {
        let x = 0;
        let y = 0;

        // Set container the string of the positions xy
        const positions = new Set();
        const imagesWithPosition = [];

        for (let image of images) {
            const landscape = this.isLandscape(image);
            let xSpan = getRandom(0, 2);
            let ySpan = getRandom(0, 2);

            // Move x and y until a tile is free.
            while (y < height && positions.has(x.toString() + y.toString())) {
                x += 1;
                if (x >= width) {
                    x = 0;
                    y += 1;
                }
            }

            // The grid is filled.
            if (y === height) {
                break;
            }

            // Check if there is not already an image at the current position.
            // Update the xSpan and ySpan accordingly
            for (let row = y; row < height && row <= y + ySpan; row++) {
                for (let column = x; column < width && column <= x + xSpan; column++) {
                    const position = column.toString() + row.toString();
                    
                    // If the a position is taken, we only take the top left rectange in the grid.
                    if (positions.has(position)) {
                        xSpan = Math.max(column - x - 1, 0);
                        ySpan = Math.max(row - y - 1, 0);
                        break;
                    }
                }
            }

            // If the width or the height of the image exceed the grid size.
            if (x + xSpan >= width) xSpan = width - x - 1;
            if (y + ySpan >= height) ySpan = height - y - 1;

            // Block the grid cells
            for (let row = y; row < height && row <= y + ySpan; row++) {
                for (let column = x; column < width && column <= x + xSpan; column++) {
                    const position = column.toString() + row.toString();
                    
                    positions.add(position);
                }
            }

            imagesWithPosition.push({
                ...image,
                width: xSpan + 1,
                height: ySpan + 1,
                x: x + 1,
                y: y + 1
            });
        }
        return imagesWithPosition;
    }

    static isLandscape(image) {
        return parseInt(image.height) < parseInt(image.width);
    }
}