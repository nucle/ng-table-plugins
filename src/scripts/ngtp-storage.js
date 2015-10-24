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

        var prefix = '';
        var storageType = 0;

        return {
            getValue: getValue,
            setValue: setValue,
            setPrefix: setPrefix,
            setStorageType: setStorageType
        };
        function setPrefix(value) {
            prefix = value;
        }

        function setStorageType(type) {
            storageType = type;
        }

        function setValue(key, val) {
            if (storageType === 0) {
                sessionStorage.setItem(addPrefix(key), val);
            } else {
                localStorage.setItem(addPrefix(key), val);
            }
        }

        function getValue(val) {
            if (storageType === 0) {
                return sessionStorage.getItem(addPrefix(val));
            } else {
                return localStorage.getItem(addPrefix(val));
            }
        }

        function addPrefix(value) {
            return value + prefix;
        }
    }
})();