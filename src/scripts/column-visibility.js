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
                columns: '='
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
            scope.$watch('columns', function (columns, oldValue) {
                angular.forEach(columns, function (column) {
                    var visible = sessionStorage.getItem(column.title());
                    if (visible != null) {
                        column.show(Boolean(visible == 0));
                        console.log(column.title());
                        console.log(visible);
                    }

                });
                console.log(element);
            });
        }
    }

    VisibilityCtrl.$inject = [];

    function VisibilityCtrl() {
        var vm = this;

        vm.onColumnClicked = onColumnClicked;

        function onColumnClicked(column) {
            if (column.show()) {
                column.show(false);
                sessionStorage.setItem(column.title(), 1);
            } else {
                column.show(true);
                sessionStorage.setItem(column.title(), 0);
            }
            console.log(column.title());
        }
    }
})();