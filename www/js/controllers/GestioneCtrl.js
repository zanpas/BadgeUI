app.controller('GestioneCtrl', function ($scope, $rootScope, $ionicPopup, $timeout ,$http) {

    $scope.exportActivityExcel = function () {
        var blob = new Blob([document.getElementById('exportableActivity').innerHTM], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Attivita.xls");

    };


    $scope.exportActivityPdf = function () {

        html2canvas(document.getElementById('exportableActivity'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Attività.pdf");
            }
        });
    };

    $scope.assegna = function (row) {
        $scope.attivitaRow = row;
        $scope.newRow = {};
        console.log('ATTIVITA', $scope.attivitaRow);

        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/assegnaPopup.html',
            title: 'Assegna Attività',
            subTitle: $scope.attivitaRow.nome ,
            scope: $scope,
            buttons: [
                { text: 'Annulla' },
                {
                    text: '<b>Assegna</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if($scope.newRow.utente != null) {
                            e.preventDefault();
                            for (var i = 0; i < $rootScope.attivita.length; i++) {
                                if($rootScope.attivita[i].nome == $scope.attivitaRow.nome){
                                    if($rootScope.attivita[i].utenti == null) {
                                        $rootScope.attivita[i].utenti = $scope.newRow.utente;
                                    }
                                    else {
                                        $rootScope.attivita[i].utenti += ' ';
                                        $rootScope.attivita[i].utenti = $rootScope.attivita[i].utenti.concat($scope.newRow.utente);
                                    }
                                    //$rootScope.attivita[i].stato = 'assegnata';
                                    $http.post("http://alessandroscarlato.it/assegnaActivity.php",{'name':$scope.attivitaRow.nome,'users':$rootScope.attivita[i].utenti})

                                    console.log('lavorano ', $rootScope.attivita[i].utenti);
                                }

                            };

                            //$rootScope.users[$scope.profileRow.id].profile = $scope.newRow.profile;
                            myPopup.close();
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Alert',
                                template: 'Nessun utente assegnato'
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

    $scope.aggiungiAttivita = function() {
        $scope.newAttivita = {};

        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/aggiungiAttivitaPopup.html',
            title: 'Aggiungi nuova Attività',
            subTitle: 'Inserisci tutti i campi',
            scope: $scope,
            buttons: [
                { text: 'Annulla' },
                {
                    text: '<b>Aggiungi</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if($scope.newAttivita.nome && $scope.newAttivita.datainizio != null) {
                            e.preventDefault();
                            $scope.newAttivita.stato = 'non assegnata';
                            console.log('Attivita', $scope.newAttivita);
                            $rootScope.attivita.push($scope.newAttivita);
                            $http.post("http://alessandroscarlato.it/addActivity.php",{'nome':$scope.newAttivita.nome,'inizio':$scope.newAttivita.datainizio})
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