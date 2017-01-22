angular.module('RDash')
    .controller('recomendController', function ($scope, Data, translate, $rootScope) {
        $rootScope.t = translate;

        Data.get('recomends').then(function (data) {
            $scope.recomends = data.recomends;
        })

        $scope.recomend = {};

        $scope.add = function () {
            $scope.display = true;
        };

        $scope.edit = function (id) {
            $scope.display = true;
            $scope.recomend = $scope.recomends[id];
            $scope.recomend.editId = id.toString();
        }

        $scope.approve = function (index) {
            Data.post('approve', { data: $scope.recomends[index] }).then(function (data) {
                if (data.recomends) $scope.recomends = data.recomends;
             });
        };

        $scope.deny = function (index) {
            Data.post('deny', { data: $scope.recomends[index] }).then(function (data) {
                if (data.recomends) $scope.recomends = data.recomends;
             });
        };


        $scope.save = function (valid) {
            if (!valid) {
                $scope.formErrors = true;
            } else if (valid) {
                var method = $scope.recomend.editId ? 'put' : 'post';
                
                Data[method]('recomends', { id: $scope.recomend.editId, student: $scope.recomend }).then(function (result) {
                    $scope.recomends = data.recomends;
                });

                $scope.close();
            }
        }

        $scope.close = function () {
            $scope.recomend = {};
            $scope.formErrors = false;
            $scope.display = false;
        }
    });