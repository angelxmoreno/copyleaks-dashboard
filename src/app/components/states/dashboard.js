import angular from 'angular';
import configMod from '../../services/config';
import copyleaksApiMod from '../../services/copyleaksApi';
import dialogMod from '../../services/dialog';
import creditsMod from './dashboard/credits';

const name = 'dashboard';
const dependencies = [
    configMod.name,
    copyleaksApiMod.name,
    dialogMod.name,
    creditsMod.name
];
const componentConfig = {
    templateUrl: 'views/' + name + '.html',
    controller: ['Settings', 'CopyLeaks', 'Dialog', Controller],
    bindings: {}
};

function Controller(Settings, CopyLeaks, Dialog) {
    let self = this;
    self.processList = [];
    self.customFields = [];
    self.credits = 0;
    self.isAuthorized = CopyLeaks.isAuthorized();
    if (CopyLeaks.isAuthorized()) {
        CopyLeaks.list()
            .then(handleListResponse)
            .catch(handleError);

        CopyLeaks.credits()
            .then((resp) => {
                self.credits = resp;
            })
            .catch(handleError);
    }

    function extractCustomFields(resp) {
        let fields = {};
        angular.forEach(resp,function (row) {
            let custom_fields = row.CustomFields;
            Object.keys(custom_fields).forEach(function (custom_field) {
                fields[custom_field] = custom_field;
            });
        });

        return Object.keys(fields);
    }

    function handleListResponse(resp) {
        self.customFields = extractCustomFields(resp);
        self.processList = resp;
    }

    function handleError(err) {
        console.error(err);
        Dialog.errorMsg(err.error);
    }
}

export default angular
    .module(name, dependencies)
    .component(name, componentConfig);

