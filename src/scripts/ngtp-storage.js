/**
 * ngTablePlugins: angular js + ngTable + plugins
 *
 * @version 0.3
 * @author Christian Behon <christian.behon@knusperleicht.at>
 * @url https://github.com/nucle/ng-table-plugins
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .factory('ngTpStorage', ngTpStorage);

    ngTpStorage.$inject = [];

    function ngTpStorage() {
        var vm = this;
        vm.prefix = '';
        vm.storageType = 0;

        return {
            getValue: getValue,
            setValue: setValue,
            setPrefix: setPrefix,
            setStorageType: setStorageType
        };
        function setPrefix(prefix) {
            vm.prefix = prefix;
        }

        function setStorageType(type) {
            vm.storageType = type;
        }

        function setValue(key, val) {
            if (vm.storageType === 0) {
                sessionStorage.setItem(prefix(key), val);
            } else {
                localStorage.setItem(prefix(key), val);
            }
        }

        function getValue(val) {
            if (vm.storageType === 0) {
                return sessionStorage.getItem(prefix(val));
            } else {
                return localStorage.getItem(prefix(val));
            }
        }

        function prefix(value) {
            return value + vm.prefix;
        }
    }
})();