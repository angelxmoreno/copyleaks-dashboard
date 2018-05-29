import angular from 'angular';
import uiRouter from 'angular-ui-router';
import layoutMod from './components/layout';
import homeState from './components/states/home';
import settingsState from './components/states/settings';

const deps = [
    uiRouter,
    layoutMod.name,
    homeState.name,
    settingsState.name
];
const Routes = [
    {
        name: 'rootView',
        component: 'layout',
        abstract: true
    },
    {
        name: 'settings',
        parent:'rootView',
        component: 'settings',
        url: '/settings',
    },
    {
        name: 'home',
        parent:'rootView',
        component: 'home',
        url: '/',
    },
];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    Routes.forEach(function (route) {
        $stateProvider.state(route);
    });
}

export default angular
    .module('routeMod', deps)
    .config(config);
