app.controller('BadgeCtrl', function ($scope, $rootScope ,$ionicPopup, $timeout) {

    $scope.started = false;
    $scope.pranzo = false;
    $scope.max = false;
    $scope.permesso = false;
    $scope.date = new Date();

    $scope.start = function(){
        $scope.started = true;
        $scope.entrata = new Date();
        $scope.entrataOra = $scope.entrata.getHours();
        $scope.entrataMinuti = $scope.entrata.getMinutes();
        console.log($scope.entrataOra , $scope.entrataMinuti);
    };

    $scope.ripresaPausa = function(){
        $scope.pranzo = false;
        $scope.started = true;
    }

    $scope.finePausa = function(){
        $scope.pranzo = false;
        $scope.started = false;
    }

    $scope.stop = function (row) {
        $scope.uscita = new Date();
        $scope.uscitaOra = $scope.uscita.getHours();
        $scope.uscitaMinuti = $scope.uscita.getMinutes();
        console.log($scope.uscitaOra , $scope.uscitaMinuti);
        $scope.newRow = {};

        /* if($scope.profileRow.profile == 'user') {
         $scope.other3 = 'admin';
         }*/

        var myPopup =  $ionicPopup.show({
            templateUrl: 'templates/badgePopup.html',
            title: 'Opzioni disponibili',
            subTitle: 'Azione da prendere',
            scope: $scope,
            buttons: [
                { text: 'Annulla' },
                {
                    text: '<b>Conferma</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if($scope.newRow.event != null) {
                            e.preventDefault();
                            $scope.started = false;
                            if($scope.uscitaMinuti<$scope.entrataMinuti) {
                                $scope.parzialeOre=$scope.uscitaOra-$scope.entrataOra;
                                $scope.totaleOre=$scope.parzialeOre-1;
                                $scope.parzialeMinuti=60-$scope.entrataMinuti;
                                $scope.totaleMinuti=$scope.parzialeMinuti+$scope.uscitaMinuti
                            }
                            else {
                                $scope.totaleOre=$scope.uscitaOra-$scope.entrataOra;
                                $scope.totaleMinuti=$scope.uscitaMinuti-$scope.entrataMinuti;
                            }
                            console.log($scope.totaleOre , $scope.totaleMinuti ,$scope.newRow.event);
                            if($scope.newRow.event == "Pausa pranzo") {
                                $scope.pranzo = true;
                                $scope.max = true;
                            }
                            if($scope.newRow.event == "Richiesta permesso") {
                                $scope.permesso = true;
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Hai richiesto un permesso',
                                    templateUrl: 'templates/badgePermessoOrePopup.html'
                                });
                            }
                            if($scope.newRow.event == "Fine giornata lavorativa") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Scegli dove scaricare le ore',
                                    templateUrl: 'templates/badgeScaricoOrePopup.html'
                                });
                            }
                            myPopup.close();
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Alert',
                                template: 'Not possible'
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


});