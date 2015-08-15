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

        columnVisibilityCtrl.$inject = ['$scope','columnVisibilityStorage'];

        function columnVisibilityCtrl($scope,columnVisibilityStorage) {
            $scope.sayHello = sayHello;

            function sayHello() {
              console.log("HELLO");
              columnVisibilityStorage.saveTest();
            }
        };
})();

(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .directive('colVis', columnVisibility);

        columnVisibility.$inject = ['$parse'];

        function columnVisibility($parse) {
            return {
                link: link,
                restrict: 'A',
                scope: true,
                controller: 'columnVisibilityCtrl'
            };

            function link(scope, element, attrs) {

              console.log("COLUMNS: "+attrs.colVisRows);
              console.log("STORAGE: "+attrs.colVisStorage);
              var cv = {
                generate: function generate(event) {
                  entries(event, element);
                }
              };
              $parse(attrs.colVis).assign(scope.$parent, cv);
            }

            function entries(event, element, dropDown) {
              var target = angular.element(event.target);
              removeEntries(target);

              var dropDown = angular.element('<ul class="dropdown-menu">');
              var rows = element.find('th.header');

              angular.forEach(rows, function (row, key) {
                var rowEntry = angular.element('<li><a>'+ row.textContent.trim() + '</a></li>');
                rowEntry.bind('click',onRowClick(element, key));
                dropDown.append(angular.element(rowEntry));

              });
              dropDown.insertAfter(target);
              console.log(rows);
            }

            function removeEntries(target) {
              var ul = target.find('ul');
              ul.remove();
            }

            function onRowClick(element, key) {
              console.log("CLICK");
              var rows = element.find('tr');
                                                 angular.forEach(rows, function (row, i) {

                                                     var tr = angular.element(row);
                                                     var tds = tr.find('th');
                                                     if (tds.length === 0) {
                                                         tds = tr.find('td');
                                                     }
                                                     angular.forEach(tds, function (td, j) {
                                                         var td = angular.element(td);

                                                         if (key == j) {
                                                             hideShowColumn(td);
                                                         }
                                                     });


                                                 });

            }


            function hideShowColumn(td) {
                if (td.css("display") == "none") {
                    td.show();
                } else {
                    td.hide();
                }
            }
        };
})();
