import angular from 'angular';
import navBarMod from './navBar';
import sidePanel from './sidePanel';

const name = 'layout';
const dependencies = [
    navBarMod.name,
    sidePanel.name
];
const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    // controller: [Controller],
    bindings: {}
};

export default angular
    .module(name, dependencies)
    .component(name, componentConfig);

