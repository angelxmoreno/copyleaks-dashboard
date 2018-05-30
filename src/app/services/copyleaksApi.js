import angular from 'angular';
import moment from 'moment';
import configMod from './config';
import CopyleaksCloud from 'plagiarism-checker';

const SETTINGS_KEY = 'API';

function Factory($q, Settings) {
    const clCloud = new CopyleaksCloud();
    let self = this;
    let headers = {};

    self.init = function () {
        if (self.isAuthorized()) {
            console.log('token exists');
            let config = self.getConfig();
            clCloud.loginToken = config.token;
            clCloud.typeOfService = config.product;
        } else {
            console.log('token DOES NOT exists');
        }
    };
    self.saveConfig = function (config) {
        Settings.set(SETTINGS_KEY, config);
    };
    self.getConfig = function () {
        return Settings.get(SETTINGS_KEY) || {};
    };
    self.delConfig = function () {
        return Settings.delete(SETTINGS_KEY);
    };
    self.isAuthorized = function () {
        return Settings.has(SETTINGS_KEY + '.token');
    };
    self.login = function (config) {
        return $q(function (resolve, reject) {
            clCloud.login(config.email, config.access_key, config.product, function (resp, err) {
                if (resp) {
                    config.token = clCloud.loginToken;
                    self.isLoggedIn = true;
                    self.saveConfig(config);
                    resolve(resp);
                } else {
                    self.isLoggedIn = false;
                    reject(err);
                }
            });
        });
    };
    self.list = function () {
        return $q(function (resolve, reject) {
            clCloud.getProcessList(function (resp, err) {
                if (resp) {
                    let structured = resp.map(function(row){
                        row.CreationTimeUTC = moment.utc(row.CreationTimeUTC, 'DD/MM/YYY H:m:s').toDate();
                        return row;
                    });
                    resolve(structured);
                } else {
                    reject(err);
                }
            });
        });
    };
    self.credits = function (product) {
        product = product || self.getConfig().product;
        clCloud.typeOfService = product;
        return $q(function (resolve, reject) {
            clCloud.getCreditBalance(function (resp, err) {
                clCloud.typeOfService = self.getConfig().product;
                if (resp) {
                    resolve(resp.Amount);
                } else {
                    reject(err);
                }
            });
        });
    };
    self.init();
    return self;
}

const name = 'copyleaksApi';
const deps = [
    configMod.name,
];
const module = angular.module(name, deps);
module.factory('CopyLeaks', ['$q', 'Settings', Factory]);
export default module;

