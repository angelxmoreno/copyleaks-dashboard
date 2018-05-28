import angular from 'angular';
import uiRouter from 'angular-ui-router';
import layoutMod from './components/layout';
import homeMod from './components/home';

const deps = [
    uiRouter,
    layoutMod.name,
    homeMod.name
];
const Routes = [
    {
        name: 'rootView',
        component: 'layout',
        abstract: true
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
