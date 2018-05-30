import angular from 'angular';
import navBarMod from './navBar';

const name = 'layout';
const dependencies = [
    navBarMod.name
];
const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    // controller: [Controller],
    bindings: {}
};

export default angular
    .module(name, dependencies)
    .component(name, componentConfig);

