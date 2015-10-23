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
        var exclude = {};

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
            scope.$watch('columns', function (columns, oldValue) {
                angular.forEach(columns, function (column) {
                    if (hasStorage === 'true') {
                        var visible = ngTpStorage.getValue(column.title());
                        if (visible != null) {
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
