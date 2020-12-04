import m from 'mithril';
import { PicsumService } from '../services/picsum-service';
import Grid from './Grid';
import ImageViewer from './ImageViewer';
import Spinner from './Spinner';

const MainView = () => {
    const width = 5;
    const height = 3;
    const waitTimeBetweenRandomize = 3000; // In ms
    let images = [];
    let selectedImage = null;
    let loading = false;
    let disableButton = false;

    const setSelected = (index) => {
        selectedImage = { ...images[index] }
    }

    const removeSelected = () => {
        selectedImage = null;
    }

    const loadImages = async (page) => {
        if (disableButton) {
            return;
        };

        // Show loading
        // Disable the randomize button for 2s to not spam it
        setLoading(true);
        toggleRandomize();
        images = [];

        const data = await PicsumService.getImageList(page, width * height);
        const imagesWithPosition = PicsumService.randomizePositions(data, width, height);

        images = imagesWithPosition;
        setLoading(false);
        setTimeout(toggleRandomize, waitTimeBetweenRandomize);
    }

    const toggleRandomize = () => {
        disableButton = !disableButton;
        m.redraw();
    }

    const setLoading = async (value) => {
        if (value) {
            loading = true;
        } else {
            loading = false;
        }
        m.redraw();
    }

    const loadRandomImages = async () => {
        const page = Math.floor(Math.random() * Math.floor(40));
        await loadImages(page);
    }

    return {
        oncreate: () => {
            loadRandomImages();
        },
    
        view: () => {
            const imgSrc = selectedImage ? selectedImage.download_url : null;

            if (loading) {
                return m('.content', [
                    m(Spinner)
                ])
            }

            return m('.content', [
                m('h1', { class: 'title' }, 'Image Viewer'),
                m(Grid, { images, onImageClick: setSelected }),
                m(ImageViewer, { imgSrc, onClose: removeSelected }),
                m('.randomize-button-container', [
                    m('button', { onclick: loadRandomImages, disabled: disableButton }, "Randomize")
                ])
            ])
        }
    }
}

export default MainView;