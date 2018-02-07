angular.module('RDash')
    .controller('scoresController', function($scope, Data, $mdDialog) {
        $scope.students = [];
        $scope.dropList = {};
        $scope.UPDstud = [];

        $scope.loadData = function(selectedDate) {
            var date = selectedDate ? new Date(selectedDate) : new Date();
            $scope.date = date.toLocaleDateString('en-GB').split('/').reverse().join('-');

            Data.get('scores/' + $scope.date).then(function(data) {
                $scope.students = data.scores;
                $scope.title = data.test_type;
            });
        };

        Data.get('prevDates').then(function(data) {
            $scope.prevDates = data.prevDates;

            var d = new Date()

            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('שים לב')
                .textContent('אתה עומד לעדכן את חודש ' + (d.getMonth() + 1) + "/" + d.getFullYear())
                .ariaLabel('אישור')
                // .cancel('ביטול')
                .ok('הבנתי')
                // .targetEvent(ev);

            $mdDialog.show(confirm).then(function() {
                $mdDialog.hide();
            }, function() {

                $mdDialog.hide();
            })


            $scope.loadData();
        });

        $scope.changeMonth = function(currentMonth) {
            if (currentMonth) $scope.loadData(Object.values(JSON.parse(currentMonth)).join('-'));
        };

        $scope.save = function(data) {
            $scope.UPDstud = $scope.students.filter((val) => (val.oral || val.oral === 0 || val.write !== null || val.comment));
            Data.put('scores', {
                score: $scope.UPDstud,
                date: $scope.date
            }).then(function(data) {

            });
        };

    });