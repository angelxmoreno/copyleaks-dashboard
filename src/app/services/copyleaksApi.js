import angular from 'angular';
import configMod from './config';
import CopyleaksCloud from 'plagiarism-checker';

function Factory($q, Settings) {
    const clCloud = new CopyleaksCloud();
    const config = clCloud.getConfig();
    let isLoggedIn = false;
    let headers = {};
    headers[config.SANDBOX_MODE_HEADER] = true;

    return {
        isAuthorized: function () {
            return isLoggedIn;
        },
        checkAccess: function (config) {
            return $q(function (resolve, reject) {
                clCloud.login(config.email, config.access_key, config.product, function (resp, err) {
                    if (resp) {
                        isLoggedIn = true;
                        resolve(resp);
                    } else {
                        isLoggedIn = false;
                        reject(err);
                    }
                });
            });
        },
    };
}

const name = 'copyleaksApi';
const deps = [
    configMod.name,
];
const module = angular.module(name, deps);
module.factory('CopyLeaks', ['$q', 'Settings', Factory]);
export default module;

