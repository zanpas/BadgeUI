app.controller('ProfilaCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $http) {

    $scope.esporta = false;

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

        $scope.newRow = {};
        $scope.profileRow = row;

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
                            $http.post("http://alessandroscarlato.it/modificaUtente.php",{'user':$scope.profileRow.username,'nome':$scope.newRow.firstname,'cognome':$scope.newRow.lastname,'profilo':$scope.newRow.profile})

                            for (var i = 0; i < $rootScope.users.length; i++) {
                                if($rootScope.users[i].username==$scope.profileRow.username) {
                                    $rootScope.users[i].firstname = $scope.newRow.firstname;
                                    $rootScope.users[i].lastname = $scope.newRow.lastname;
                                    $rootScope.users[i].profile = $scope.newRow.profile;
                                }
                            }

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

    $scope.reset = function (row) {
        $scope.profileRow = row;
        $rootScope.userLogged.password = 'default';
        for (var i = 0; i < $rootScope.users.length; i++) {
            if($rootScope.users[i].username==$scope.profileRow.username) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Password resettata',
                    template: 'Password: default'
                });
                $rootScope.users[i].password = 'default';
                $http.post("http://alessandroscarlato.it/resetPassword.php",{'user':$rootScope.userLogged.username,'pass':$rootScope.userLogged.password})
            }
        }
    };

    $scope.addUser = function() {
        $rootScope.newUser = {};
        //console.log($rootScope.newUser);
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
                            console.log($scope.newUser.profile);

                            $http.post("http://alessandroscarlato.it/aggiungiUtente.php",{'nome':$scope.newUser.firstname,"cognome":$scope.newUser.lastname,
                                'user':$scope.newUser.username,'pass':$scope.newUser.password,'profilo':$scope.newUser.profile})

                            $rootScope.users.push($rootScope.newUser);
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