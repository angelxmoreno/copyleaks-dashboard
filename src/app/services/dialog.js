import angular from 'angular';

const {dialog} = require('electron').remote;

function Factory() {
    dialog.successMsg = function (message, title, cb) {
        title = title || 'Success';
        cb = cb || angular.noop;
        dialog.showMessageBox({
            type: 'info',
            title: title,
            message: title,
            detail: message
        }, cb);
    };

    dialog.errorMsg = function (message, title, cb) {
        title = title || 'Error';
        cb = cb || angular.noop;
        dialog.showMessageBox({
            type: 'error',
            title: title,
            message: title,
            detail: message
        }, cb);
    };

    return dialog;
}

const name = 'dialog';
const deps = [];
const module = angular.module(name, deps);
module.factory('Dialog', [Factory]);
export default module;

