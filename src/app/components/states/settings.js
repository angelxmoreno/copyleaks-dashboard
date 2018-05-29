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

    this.ApiSettings = {
        email: Settings.get('Api.email'),
        access_key: Settings.get('Api.access_key'),
        product: Settings.get('Api.product'),
    };

    this.updateApiCredentials = (form) => {
        console.log('this.ApiSettings', this.ApiSettings);
        if (form.$valid) {
            CopyLeaks.checkAccess(this.ApiSettings).then(() => {
                Dialog.successMsg('API Credentials are good', false, () => {
                    Settings.set('Api', this.ApiSettings);
                });
            }).catch((err) => {
                Dialog.errorMsg(err.error);
            });
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

