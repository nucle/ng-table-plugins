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

    angular.module('ngTablePlugins', ['ngTablePluginsTemplates']);

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
        .directive('ngTableColumnsVisibility', ColumnVisibility);

    ColumnVisibility.$inject = [];

    function ColumnVisibility() {

        var hasStorage = false;
        var tableId = '';

        return {
            restrict: 'E',
            scope: {
                columns: '=',
                id: '@',
                storage: '@'
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
            scope.$watch('columns', function (columns, oldValue) {
                angular.forEach(columns, function (column) {
                    if (hasStorage === 'true') {
                        var visible = scope.ctrl.getValue(column.title());
                        if (visible != null) {
                            column.show(visible == 0);
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
                scope.ctrl.setTableId(tableId);
            }
            if ("saveState" in attrs) {
                hasStorage = attrs.saveState;
            }
            if ("storageType" in attrs) {
                scope.ctrl.setStorageType(attrs.storageType);
            }
        }
    }

    VisibilityCtrl.$inject = [];

    function VisibilityCtrl() {
        var vm = this;

        vm.id = '';
        vm.storageType = 0;
        vm.getValue = getValue;
        vm.onColumnClicked = onColumnClicked;
        vm.setTableId = setTableId;
        vm.setStorageType = setStorageType;

        function setTableId(id) {
            vm.id = id;
        }

        function setStorageType(type) {
            vm.storageType = type;
        }

        function onColumnClicked(column) {
            if (column.show()) {
                column.show(false);
                if (vm.storageType === 0) {
                    sessionStorage.setItem(key(column.title()), 1);
                } else {
                    localStorage.setItem(key(column.title()), 1);
                }
            } else {
                column.show(true);
                if (vm.storageType == 0) {
                    sessionStorage.setItem(key(column.title()), 0);
                } else {
                    localStorage.setItem(key(column.title()), 0);
                }
            }
        }

        function getValue(val) {
            if (vm.storageType === 0) {
                return sessionStorage.getItem(key(val));
            } else {
                return localStorage.getItem(key(val));
            }
        }

        function key(value) {
            return value + vm.id;
        }
    }
})();

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

    angular.module('ngTablePlugins')
        .directive('ngTableExporter', Exporter);

    Exporter.$inject = [];

    function Exporter() {
        return {
            restrict: 'E',
            scope: {
                columns: '=',
                data: '=',
                id: '@',
                storage: '@'
            },
            replace: true,
            templateUrl: 'templates/column-visibility.html',
            link: link
        };

        function link(scope, element, attrs) {

            scope.$watch('data', function (c, oldValue) {
                console.log(c.getData);
                angular.forEach(c.getData, function (row) {
                    console.log(row.name);
                });
            });

        }
    }
})();
angular.module('ngTablePluginsTemplates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("templates/column-visibility.html",
    "<div class=btn-group><div class=dropwon><button class=\"ngtp-dropdown-btn btn dropdown-toggle\" type=button data-toggle=dropdown>Hide/show columns <span class=caret></span></button><ul class=dropdown-menu><li data-ng-repeat=\"column in columns\" data-ng-click=ctrl.onColumnClicked(column);$event.stopPropagation(); class=ngtp-noselect><div class=checkbox data-ng-if=!column.show()><label class=ngtp-checkbox-label-disabled><input data-ng-if=!column.show() type=checkbox class=ngtp-checkbox-disabled> <span class=ngtp-checkbox-text-disabled>{{column.title()}}</span></label></div><div class=checkbox data-ng-if=column.show()><label class=ngtp-checkbox-label-enabled><input data-ng-if=column.show() class=ngtp-checkbox-enabled type=checkbox checked> <span class=ngtp-checkbox-text-enabled>{{column.title()}}</span></label></div></li></ul></div></div>");
}]);
