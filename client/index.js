import m from 'mithril';
import MainView from './components/MainView';

m.route(document.body, '/', {
    '/': MainView
});
