/**
 * ngTablePlugins: angular js + ngTable + plugins
 *
 * @version 0.1
 * @author Christian Behon <christian.behon@knusperleicht.at>
 * @url https://github.com/nucle/ng-table-plugins
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function () {
    "use strict";

    angular.module('ngTablePlugins', ['ngTpTemplates']);

})();
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
        .directive('ngTpColumnVisibility', ngTpColumnVisibility);

    ngTpColumnVisibility.$inject = ['ngTpStorage'];

    function ngTpColumnVisibility(ngTpStorage) {

        var hasStorage = false;
        var tableId = '';

        return {
            restrict: 'E',
            scope: {
                columns: '=',
                id: '@',
                storage: '@',
                exclude: '@'
            },
            replace: true,
            templateUrl: 'templates/column-visibility.html',
            link: link,
            controller: VisibilityCtrl,
            controllerAs: 'ctrl',
            bindToController: {
                onColumnClicked: '&'
            }
        };

        function link(scope, element, attrs) {
            checkAttributes(attrs, scope);
            scope.$watch('columns', function (columns) {
                angular.forEach(columns, function (column) {
                    if (hasStorage === 'true') {
                        var visible = ngTpStorage.getValue(column.title());
                        if (visible !== null) {
                            column.show(visible === 'true');
                        }
                    } else {
                        column.show(true);
                    }
                });
            });
        }

        function checkAttributes(attrs, scope) {
            if ("id" in attrs) {
                tableId = attrs.id;
                ngTpStorage.setPrefix(tableId);
            }
            if ("saveState" in attrs) {
                hasStorage = attrs.saveState;
            }
            if ("storageType" in attrs) {
                ngTpStorage.setStorageType(attrs.storageType);
            }
            if ("exclude" in attrs) {
                scope.ctrl.setExcludedColumns(scope.$eval(attrs.exclude));
            }
        }
    }

    VisibilityCtrl.$inject = ['ngTpStorage'];

    function VisibilityCtrl(ngTpStorage) {

        var vm = this;
        vm.onColumnClicked = onColumnClicked;
        vm.isRowVisible = isRowVisible;
        vm.setExcludedColumns = setExcludedColumns;
        vm.excludedColumns = {};

        function setExcludedColumns(excludedColumns) {
            vm.excludedColumns = excludedColumns;
        }

        function isRowVisible(index) {
            return vm.excludedColumns.indexOf(index) <= -1;
        }

        function onColumnClicked(column) {
            if (column.show()) {
                column.show(false);
                ngTpStorage.setValue(column.title(), false);
            } else {
                column.show(true);
                ngTpStorage.setValue(column.title(), true);
            }
        }
    }
})();

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
        function setPrefix(pref) {
            prefix = pref;
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
angular.module('ngTpTemplates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("templates/column-visibility.html",
    "<div class=btn-group><div class=dropwon><button class=\"ngtp-dropdown-btn btn dropdown-toggle\" type=button data-toggle=dropdown>Hide/show columns <span class=caret></span></button><ul class=dropdown-menu><li data-ng-repeat=\"column in columns\" data-ng-click=ctrl.onColumnClicked(column);$event.stopPropagation(); data-ng-if=ctrl.isRowVisible($index) class=ngtp-noselect><div class=checkbox data-ng-if=!column.show()><label class=ngtp-checkbox-label-disabled><input data-ng-if=!column.show() type=checkbox class=ngtp-checkbox-disabled> <span class=ngtp-checkbox-text-disabled>{{column.title()}}</span></label></div><div class=checkbox data-ng-if=column.show()><label class=ngtp-checkbox-label-enabled><input data-ng-if=column.show() class=ngtp-checkbox-enabled type=checkbox checked> <span class=ngtp-checkbox-text-enabled>{{column.title()}}</span></label></div></li></ul></div></div>");
  $templateCache.put("templates/export.html",
    "");
}]);
