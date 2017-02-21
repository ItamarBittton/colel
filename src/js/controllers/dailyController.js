angular.module('RDash').controller("dailyController", function ($scope, Data, $filter) {
    $scope.disable = false;
    $scope.dropList = [];
    $scope.isOnlyDaily = false;

    $scope.show = function (date) {
        if (date) {
            $scope.date = date;
            $scope.disable = true;
            
            Data.get('daily/' + $scope.date.toLocaleDateString('en-GB').split('/').reverse().join('-')).then(function (data) {
                $scope.students = data.dailyRep;
                data.dropList.options = $filter('orderBy')(data.dropList.options, 'value');
                $scope.dropList = data.dropList;
                $scope.tempStudents = data.tempStudents;
            })
        }
    }

    $scope.changeAll = function (value, valid) {
        $scope.students.forEach(x => x.presence = value);
        $scope.save(valid);
    }

    $scope.students = [];
    $scope.viewDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    }

    Data.get('isOnlyDaily').then(function (data) {
        if (data.data) {
            $scope.isOnlyDaily = data.data;
            $scope.show(new Date());
        }
    });

    Data.get('prevDates').then(function (data) {
        $scope.prevDates = data.prevDates;
    })
    
    $scope.changeMonth = function (currentMonth) {
        $scope.viewDate = JSON.parse(currentMonth);
    }

    $scope.save = function (valid) {
        var UPDaily = $scope.students.filter((val) => (val.presence !== null));
        var UPDStud = $scope.tempStudents;
        var UPDdate = $scope.date.toLocaleDateString('en-GB').split('/').reverse().join('-')
        // var method = $scope.editId ? 'put' : 'post';

        // Data[method]('colels', { id: $scope.editId, student: $scope.colel }).then(function (result) {
        //     $scope.colels = data.colels;
        // });
        Data.put('daily', {
            daily: UPDaily,
            oneTimeStud: UPDStud,
            date: UPDdate
        }).then(function (date) {

        });

        $scope.close();
    }

    $scope.close = function () {
        $scope.students = undefined;
        $scope.definition = undefined;
        $scope.disable = false;
    }
});