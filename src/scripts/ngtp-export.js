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
        .directive('ngTpExporter', ngTpExporter);

    ngTpExporter.$inject = [];

    function ngTpExporter() {
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