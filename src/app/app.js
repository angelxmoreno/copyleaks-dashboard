import angular from 'angular';
import router from './router';

const dependencies = [
    router.name
];
const runFunc = function () {
    console.info('app started');
};
const module = angular.module('app', dependencies).run(runFunc);
export default module;