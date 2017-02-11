/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', function MasterCtrl($scope, $cookies, $rootScope, translate, $location) {
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.logout = function () {
            // Clear all cookies.
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(
                    /=.*/, "=;expires=" + new Date().toUTCString() +
                    ";path=/");
            });

            window.location.href = '/';
        }

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookies.get('toggle'))) {
                    $scope.toggle = !$cookies.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookies.put('toggle', $scope.toggle);
        };

        $scope.isAgreed = function () {
            return $cookies.get('agree');
        };

        $scope.role = $cookies.get('link');
        $rootScope.t = translate;

        window.onresize = function () {
            $scope.$apply();
        };
    });