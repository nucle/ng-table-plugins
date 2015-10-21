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

    angular.module('ngTablePlugins', ['ngTablePluginsTemplates'])
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
