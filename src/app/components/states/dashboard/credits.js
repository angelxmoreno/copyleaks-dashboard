import angular from 'angular';
import copyleaksApiMod from '../../../services/copyleaksApi';

const name = 'credits';
const dependencies = [
    copyleaksApiMod.name
];
const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    controller: ['CopyLeaks', Controller],
    bindings: {
        product: '<'
    }
};


function Controller(CopyLeaks) {
    this.$onInit = () => {
        CopyLeaks.credits(this.product)
            .then((resp) => {
                this.credits = resp;
            });
    };
}

export default angular
    .module(name, dependencies)
    .component(name, componentConfig);

