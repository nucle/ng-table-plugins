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

    angular.module('ngTablePlugins', [])
        .directive('ngTableExporter', Exporter);

    Exporter.$inject = [];

    function Exporter() {
        return {
            restrict: 'E',
            scope: {
                columns: '=',
                id: '@',
                storage: '@'
            },
            replace: true,
            templateUrl: 'templates/column-visibility.html',
            link: link
        };

        function link(scope, element, attrs) {

        }
    }
})();