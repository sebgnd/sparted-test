import m from 'mithril';

const Spinner = {
    view: (vnodes) => {
        const { centerAbsolute } = vnodes.attrs;

        return m('.spinner-container', { class: centerAbsolute ? 'spinner-center ': '' }, [
            m('.spinner')
        ])
    }
}

export default Spinner;