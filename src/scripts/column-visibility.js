/**
 * ngTablePlugins: ngTable + Angular JS
 *
 * @created 08.08.15
 * @author Christian Behon <christian.behon@knusperleicht.at>
 * @url https://github.com/nucle/ng-table-plugins
 * @license Apache License Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>
 */
var ngTablePlugins = angular.module('ngTablePlugins', []);

(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .factory('columnVisibilityStorage', columnVisibilityStorage);

    columnVisibilityStorage.$inject = [];

    function columnVisibilityStorage() {
        return {
            saveTest: saveTest
        };

        function saveTest() {
            console.log("saveTest");
        }


    };
})();

(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .controller('columnVisibilityCtrl', columnVisibilityCtrl);

    columnVisibilityCtrl.$inject = ['$scope', 'columnVisibilityStorage','$cacheFactory','$log'];

    function columnVisibilityCtrl($scope, columnVisibilityStorage,$cacheFactory,$log) {
        $scope.element = null;
        $scope.hideColumn = hideColumn;
        $scope.showColumn = showColumn;
        $scope.isColumnVisible = isColumnVisible;
        $scope.cache = $cacheFactory('hiddenColumns');


        function hideColumn(key) {
            $log.log("Hide column: " + key);
            $scope.cache.put(key, true);
            $log.log("HiddenColumns: " + $scope.cache.info());
        }

        function showColumn(key) {
            $log.log("Show column: " + key);
            $scope.cache.remove(key);
            $log.log("HiddenColumns: " + $scope.cache.info());
        }

        function isColumnVisible(key) {
            return $scope.cache.get(key) !== undefined;
        }

    }
})();

(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .directive('colVis', columnVisibility);

    columnVisibility.$inject = ['$parse', '$document', '$timeout'];

    function columnVisibility($parse, $document, $timeout) {
        return {
            link: link,
            restrict: 'A',
            scope: true,
            controller: 'columnVisibilityCtrl'
        };

        function link(scope, element, attrs) {

            var cv = {

                generate: function generate(event) {
                    entries(event, element, attrs, scope);
                }
            };
            // TODO this is only a work around --> better solution chris
            angular.element($document).ready($timeout(function () {

                    var visibleCols = scope.$eval(attrs.colVisRows);
                    if (angular.isArray(visibleCols)) {
                        angular.forEach(visibleCols, function (colId, k) {
                            console.log("WAHH" + colId);
                            scope.hideColumn(colId);
                            var rows = element.find('tr');
                            angular.forEach(rows, function (row, i) {
                                var tr = angular.element(row);

                                var tds = tr.find('th');
                                if (tds.length === 0) {
                                    tds = tr.find('td');
                                }

                                angular.forEach(tds, function (td, j) {
                                    var element = angular.element(td);
                                    if (colId == j) {
                                        element.hide();
                                    }
                                });
                            });
                        });
                    }
                }, 250
            ));
            console.log("COLUMNS: " + attrs.colVisRows);
            console.log("STORAGE: " + attrs.colVisStorage);


            $parse(attrs.colVis).assign(scope.$parent, cv);
        }


        function entries(event, element, attrs, scope) {
            var target = angular.element(event.target);

            removeEntries(angular.element(event.currentTarget));
            var dropDown = angular.element('<ul class="dropdown-menu">');

            var rows = element.find('th.header');

            angular.forEach(rows, function (row, key) {
                    var rowEntry = angular.element('<li ng-style="myStyle" style="opacity:1.0"><a> ' + row.textContent.trim() + '</a></li>');
                    var isColumnVisible = scope.isColumnVisible(key);

                    if (isColumnVisible) {
                        rowEntry.css("opacity",0.4);
                    }
                    rowEntry.bind('click', function () {
                        if(!scope.isColumnVisible(key)) {
                            scope.hideColumn(key);
                        } else {
                            scope.showColumn(key);
                            rowEntry.css("opacity",1.0);
                        }
                        var rows = element.find('tr');

                        angular.forEach(rows, function (row, i) {
                            var tr = angular.element(row);

                            var tds = tr.find('th');
                            if (tds.length === 0) {
                                tds = tr.find('td');
                            }

                            angular.forEach(tds, function (td, j) {
                                var element = angular.element(td);
                                if (key == j) {
                                    if (element.css("display") == "none") {
                                        element.show();
                                    } else {
                                        element.hide();
                                    }
                                }
                            });
                        });
                    });
                    dropDown.append(angular.element(rowEntry));
                }
            )
            ;
            dropDown.insertAfter(target);
            console.log(rows);
        }


        function removeEntries(target) {
            var ul = target.find('ul');
            ul.remove();
        }
    }
})
    ();