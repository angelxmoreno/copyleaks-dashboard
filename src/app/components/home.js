import angular from 'angular';

const name = 'home';
const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    // controller: [Controller],
    bindings: {}
};

export default angular
    .module(name, [])
    .component(name, componentConfig);

