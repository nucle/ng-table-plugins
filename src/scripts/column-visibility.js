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
        .directive('colVisibility', columnVisibility);

        columnVisibility.$inject = ['$parse'];

        function columnVisibility($parse) {
            return {
                link: link,
                restrict: 'EA',
                scope: true,
                controller: 'columnVisibilityCtrl'
            };

            function link(scope, element, attrs) {
                scope.sayHello();
            }

            function generateDropDownEntries(rows) {
              angular.forEach(rows, function (row, key) {

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
