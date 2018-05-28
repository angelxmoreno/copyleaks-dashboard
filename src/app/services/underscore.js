import angular from 'angular';
import underscore from 'underscore';
import underscoreString from 'underscore.string';

function Factory() {
    return underscore.extend(underscore,underscoreString);
}

const name = 'underscore';
const deps = [];
const module = angular.module(name, deps);
module.factory('_', [Factory]);
export default module;

