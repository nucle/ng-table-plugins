/**
 * ngTablePlugins: Table + Angular JS + Plugin
 *
 * @author Christian Behon <christian.behon@knusperleicht.at>
 * @url https://github.com/nucle/ng-table-plugins
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function () {
    "use strict";

    angular.module('ngTablePlugins', ['ngTablePluginsTemplates'])
        .directive('ngTableColumnsVisibility', columnVisibility);

    columnVisibility.$inject = [];

    function columnVisibility() {
        return {
            restrict: 'E',
            scope: {
                columns: '=',
                config: '@'
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
            var hasStorage = false;

            if (attrs.config !== undefined) {
                var config = angular.fromJson(attrs.config);
                hasStorage = true;
                scope.ctrl.setTablePrefix(config.prefix);
            }

            scope.$watch('columns', function (columns, oldValue) {
                angular.forEach(columns, function (column) {
                    if (hasStorage) {
                        var visible = sessionStorage.getItem(scope.ctrl.key(column.title()));
                        if (visible != null) {
                            column.show(Boolean(visible == 0));
                        }
                    } else {
                        column.show(true);
                    }
                    console.log(column.title());
                    console.log(visible);

                });
                console.log(element);
            });
        }
    }

    VisibilityCtrl.$inject = [];

    function VisibilityCtrl() {
        var vm = this;
        vm.prefix = '';
        vm.onColumnClicked = onColumnClicked;
        vm.setTablePrefix = setTablePrefix;
        vm.key = key;

        function setTablePrefix(prefix) {
            vm.prefix = prefix;
        }

        function onColumnClicked(column) {
            if (column.show()) {
                column.show(false);
                sessionStorage.setItem(key(column.title()), 1);
            } else {
                column.show(true);
                sessionStorage.setItem(key(column.title()), 0);
            }
            console.log(column.title());
        }

        function key(value) {
            return value + vm.prefix;
        }
    }
})();
