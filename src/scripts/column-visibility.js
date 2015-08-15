/**
 * Created by nucle on 08.08.15.
 */
var ngTablePlugins = angular.module('ngTablePlugins', []);

(function () {
    "use strict";

    angular.module('ngTablePlugins')
        .directive('colVisibility', ['$parse', function ($parse) {
            return {
                restrict: 'EA',
                scope: false,
                link: function (scope, element, attrs) {

                    var bla = element;

                    var visib =
                    {
                        generate: function (event) {

                            var att = attrs;
                            var target = angular.element(event.target);

                            var ul = target.parent().find('ul');
                            ul.remove();

                            var dropDownStart = angular.element('<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">');


                            var rows = element.find('th.header');
                            angular.forEach(rows, function (row, c) {
                                var column = angular.element('<li><input type="checkbox"></span><a>' + row.textContent + '</a></li>');


                                column.bind('click', function () {
                                    console.log("CLICK" + column);

                                    var rows = element.find('tr');
                                    angular.forEach(rows, function (row, i) {

                                        var tr = angular.element(row);
                                        var tds = tr.find('th');
                                        if (tds.length === 0) {
                                            tds = tr.find('td');
                                        }
                                        angular.forEach(tds, function (td, j) {
                                            var td = angular.element(td);

                                            if (c == j) {
                                                hideShowColumn(td);
                                            }
                                        });


                                    });
                                });
                                dropDownStart.append(column);
                                console.log("ROW:" + row);
                            });

                            var dropDownEnd = angular.element('</ul>');
                            dropDownStart.after(dropDownEnd);
                            dropDownStart.insertAfter(target);
                        }
                    };

                    $parse(attrs.colVisibility).assign(scope.$parent, visib);
                }
            };

            /**
             * Set visibility of a cell
             *
             * @param td standard cell in HTML table
             */
            function hideShowColumn(td) {
                if (td.css("display") == "none") {
                    td.show();
                } else {
                    td.hide();
                }
            }
        }]);
})();
