import angular from 'angular';

const settings = require('electron').remote.require('electron-settings');

function Factory() {
    return settings;
}

const name = 'config';
const deps = [];
const module = angular.module(name, deps);
module.factory('Settings', [Factory]);
export default module;

