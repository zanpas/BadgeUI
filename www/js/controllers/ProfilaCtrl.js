app.controller('ProfilaCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $http) {

    $scope.exportProfileExcel = function () {
        var blob = new Blob([document.getElementById('exportableProfile').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Profili.xls");
    };

    $scope.exportProfilePdf = function () {
        html2canvas(document.getElementById('exportableProfile'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Profili.pdf");
            }
        });
    };

    $scope.modifica = function (row) {
        $scope.profileRow = row;
        $scope.newRow = {};
        $scope.other2 = 'manager';
        $scope.other3 = 'user';
        if($scope.profileRow.profile == 'manager') {
            $scope.other2 = 'admin';
        }
        if($scope.profileRow.profile == 'user') {
            $scope.other3 = 'admin';
        }

        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/modificaPopup.html',
            title: 'Modifica utente',
            subTitle: 'Inserisci tutti i campi',
            scope: $scope,
            buttons: [
                { text: 'Annulla' },
                {
                    text: '<b>Modifica</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if($scope.newRow.firstname && $scope.newRow.lastname  && $scope.newRow.profile != null) {
                            e.preventDefault();
                            $rootScope.users[$scope.profileRow.id].profile = $scope.newRow.profile;
                            $rootScope.users[$scope.profileRow.id].firstname = $scope.newRow.firstname;
                            $rootScope.users[$scope.profileRow.id].lastname = $scope.newRow.lastname;
                            myPopup.close();
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Alert',
                                template: 'Nessuna modifica'
                            });
                            alertPopup.then(function(res) {
                                // Custom functionality....
                            });
                        }
                    }
                }
            ]
        });

        $timeout(function() {
            myPopup.close(); //close the popup after 30 seconds for some reason
        }, 30000);
    };

    $scope.addUser = function() {
        $rootScope.newUser = {};
        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/aggiungiUtentePopup.html',
            title: 'Aggiungi nuovo utente',
            subTitle: 'Inserisci tutti i campi',
            scope: $scope,
            buttons: [
                { text: 'Annulla' },
                {
                    text: '<b>Aggiungi</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if($scope.newUser.firstname && $scope.newUser.lastname  && $scope.newUser.username  && $scope.newUser.password && $scope.newUser.profile != null) {
                            e.preventDefault();
                            //$rootScope.users.push($rootScope.newUser);
                            $http.get("http://alessandroscarlato.it/aggiungiUtente.php")
                                .then(function (response) {

                                });




                            myPopup.close();
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Alert',
                                template: 'Inserire tutti i campi'
                            });
                            alertPopup.then(function(res) {
                                // Custom functionality....
                            });
                        }
                    }
                }
            ]
        });

        $timeout(function() {
            myPopup.close(); //close the popup after 60 seconds for some reason
        }, 60000);

    };

});