import angular from 'angular';
import configMod from '../../services/config';
import copyleaksApiMod from '../../services/copyleaksApi';
import dialogMod from '../../services/dialog';

const name = 'settings';
const dependencies = [
    configMod.name,
    copyleaksApiMod.name,
    dialogMod.name
];

function Controller(Settings, CopyLeaks, Dialog) {
    this.ApiProducts = [
        {
            label: 'Businesses',
            value: 'businesses'
        },
        {
            label: 'Education',
            value: 'education'
        },
        {
            label: 'Websites',
            value: 'websites'
        },
    ];

    let APIConfig = CopyLeaks.getConfig();
    this.ApiSettings = {
        email: APIConfig.email,
        access_key: APIConfig.access_key,
        product: APIConfig.product,
    };

    this.updateApiCredentials = (form) => {
        if (form.$valid) {
            CopyLeaks.login(this.ApiSettings).then(() => {
                Dialog.successMsg('API Credentials are good');
            }).catch((err) => {
                Dialog.errorMsg(err.error);
            });
        } else {
            Dialog.errorMsg('Form is invalid');
        }
    };
}

const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    controller: ['Settings', 'CopyLeaks', 'Dialog', Controller],
    bindings: {}
};

export default angular
    .module(name, dependencies)
    .component(name, componentConfig);

