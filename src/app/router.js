import angular from 'angular';
import uiRouter from 'angular-ui-router';
import layoutMod from './components/layout';
import dashboardState from './components/states/dashboard';
import settingsState from './components/states/settings';

const dependencies = [
    uiRouter,
    layoutMod.name,
    dashboardState.name,
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
        parent: 'rootView',
        component: 'settings',
        url: '/settings',
    },
    {
        name: 'dashboard',
        parent: 'rootView',
        component: 'dashboard',
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
    .module('routeMod', dependencies)
    .config(config);
