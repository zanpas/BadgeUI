angular.module('badge.controllers', ['ui.calendar','ngGrid'])//, 'ui.bootstrap' , [ 'ngPDFViewer' ]

    .controller('AppCtrl',function($scope, $rootScope) {

        $rootScope.titleHeader = 'Login';

        $rootScope.loginData = {};

        $rootScope.users = [{id: '0', firstname:'super', lastname:'user', username:'super_user', password:'super', profile:'admin'},
            {id: '1', code:1, firstname:'serena', lastname:'ardissone', username:'sardissone', password:'serena', profile:'user', qualify:'IMP'},
            {id: '2', code:2, firstname:'pasquale', lastname:'zannino', username:'pzannino', password:'pasquale', profile:'user', qualify:'IMP'},
            {id: '3', firstname:'domenico', lastname:'frosina', username:'dfrosina', password:'domenico', profile:'admin', qualify:'DIR'},
            {id: '4', firstname:'carlo', lastname:'siciliano', username:'csiciliano', password:'carlo', profile:'manager', qualify:'DIR'}
        ];

        $rootScope.attivita = [{nome: 'Permessi Dipendenti', stato:'non assegnata', datainizio:'20/01/2016', datafine:'29/12/2016' ,utenti:'pzannino,sardissone'},
            {nome: 'Pagamenti', stato:'in corso', datainizio:'22/01/2012', datafine:'29/06/2012',utenti: 'super_user'},
            {nome: 'Applicazione mobile', stato:'completata', datainizio:'12/06/2014', datafine:'13/06/2016',utenti:'pzannino'}
        ];

        // Perform the login action when the user submits the login form
        $scope.login = function() {
            //alert('vecchio login:  ' + $rootScope.titleHeader);  //alert
            console.log('Doing login', $rootScope.loginData);

            for (var i = 0; i < $rootScope.users.length; i++) {
                if($rootScope.users[i].username==$rootScope.loginData.username && $rootScope.users[i].password==$rootScope.loginData.password){
                    $rootScope.userLogged = $rootScope.users[i];
                }
            };

            if ($rootScope.userLogged) {
                $rootScope.titleHeader = 'Dashboard';
                console.log('Utente ' + $rootScope.userLogged.username + ' loggato con successo');
                $rootScope.eventFilter.user = $rootScope.userLogged.id;
                if($rootScope.userLogged.profile=='admin'){
                    $rootScope.eventCategories = [{id:1, name:'Donatori Sangue'}, {id:2, name:'Permesso'}, {id:3, name:'Malattia'}, {id:4, name:'Allattamento'}, {id:5, name:'Ferie'}, {id:6, name:'Lavoro Straordinario'}, {id:7, name:'Festa'}, {id:8, name:'Chiusura'}];
                }
                //$rootScope.searchEvents('myCalendar1');
                //$rootScope.searchEventsByFilters();
                //uiCalendarConfig.calendars['myCalendar1'].fullCalendar( 'addEventSource', $rootScope.userEvents );
                //uiCalendarConfig.calendars['myCalendar1'].fullCalendar('refetchEvents');
                //uiCalendarConfig.calendars['myCalendar1'].fullCalendar('render');
            }else{
                console.log('Nessun utente trovato per i parametri inseriti');
                alert('Utente non trovato');
            }
            // alert('nuovo login:  ' + $rootScope.titleHeader); //alert
        };

        $scope.logout = function() {
            //('vecchio logout:  ' + $rootScope.titleHeader); //alert
            $rootScope.titleHeader = 'Login';
            $rootScope.loginData = {};
            $rootScope.userLogged = undefined;
            //('nuovo logout:  ' + $rootScope.titleHeader);  //alert
        };
    })

    .controller('LoginCtrl', function($scope, $rootScope) {

        $rootScope.eventFilter = {};
    })

    .controller('BadgeCtrl', function($scope, $rootScope ,$ionicPopup, $timeout) {

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

            var myPopup = $ionicPopup.show({
                templateUrl: '/templates/badgePopup.html',
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
                                        templateUrl: '/templates/badgePermessoOrePopup.html'
                                    });
                                }
                                if($scope.newRow.event == "Fine giornata lavorativa") {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Scegli dove scaricare le ore',
                                        templateUrl: '/templates/badgeScaricoOrePopup.html'
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


    })

    .controller('ProfilaCtrl', function($scope, $rootScope, $ionicPopup, $timeout) {

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
                templateUrl: '/templates/modificaPopup.html',
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
                templateUrl: '/templates/aggiungiUtentePopup.html',
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

        /*remove to the real data holder
         $scope.removeItem = function removeItem(row) {
         var index = $scope.rowCollection.indexOf(row);
         if (index !== -1) {
         $scope.rowCollection.splice(index, 1);
         }
         }

         angular.module("myApp", ["ngTable", "ngTableDemos"]);

         (function() {
         "use strict";

         angular.module("myApp").controller("demoController", demoController);

         demoController.$inject = ["NgTableParams", "ngTableSimpleList"];

         function demoController(NgTableParams, simpleList) {
         this.tableParams = new NgTableParams({}, {
         dataset: simpleList
         });
         }
         })();

         (function() {
         "use strict";

         angular.module("myApp").controller("dynamicDemoController", dynamicDemoController);
         dynamicDemoController.$inject = ["NgTableParams", "ngTableSimpleList"];

         function dynamicDemoController(NgTableParams, simpleList) {
         var self = this;

         self.cols = [
         { field: "name", title: "Name", sortable: "name", filter: { name: "text" }, show: true },
         { field: "age", title: "Age", sortable: "age", filter: { age: "number" }, show: true },
         { field: "money", title: "Money", sortable: "money", filter: { money: "number" }, show: true }
         ];
         self.tableParams = new NgTableParams({}, {
         dataset: simpleList
         });
         }
         })();

         (function() {
         "use strict";

         angular.module("myApp").run(configureDefaults);
         configureDefaults.$inject = ["ngTableDefaults"];

         function configureDefaults(ngTableDefaults) {
         ngTableDefaults.params.count = 5;
         ngTableDefaults.settings.counts = [];
         }
         })();
         */
    })

    .controller('GestioneCtrl', function($scope, $rootScope, $ionicPopup, $timeout) {



        $scope.exportActivityExcel = function () {
            var blob = new Blob([document.getElementById('exportableActivity').innerHTML], {
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
                templateUrl: '/templates/assegnaPopup.html',
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
                                            $rootScope.attivita[i].utenti += ',';
                                            $rootScope.attivita[i].utenti = $rootScope.attivita[i].utenti.concat($scope.newRow.utente);
                                        }

                                        //$rootScope.attivita[i].utenti.concat($rootScope.attivita[i].utenti,$scope.newRow.utente);
                                        //$rootScope.attivita[i].utenti.concat(($rootScope.attivita.data , 'ciao');
                                        console.log('lavorano ', $rootScope.attivita[i].utenti);
                                        // $rootScope.attivita.push($scope.newRow.utente);
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
                templateUrl: '/templates/aggiungiAttivitaPopup.html',
                title: 'Aggiungi nuova Attività',
                subTitle: 'Inserisci tutti i campi',
                scope: $scope,
                buttons: [
                    { text: 'Annulla' },
                    {
                        text: '<b>Aggiungi</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if($scope.newAttivita.nome && $scope.newAttivita.datainizio && $scope.newAttivita.datafine   != null) {
                                e.preventDefault();
                                $scope.newAttivita.stato = 'non assegnata';
                                console.log('Attivita', $scope.newAttivita);
                                $rootScope.attivita.push($scope.newAttivita);
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
    })

    .controller('PasswordCtrl', function($scope, $rootScope, $ionicPopup, $timeout) {

        $scope.loginData = {};

        $scope.cambiaPassword = function() {
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="loginData.newPassword2">',
                title: 'Conferma password',
                subTitle: 'Conferma nuova password',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Conferma</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if($scope.loginData.newPassword1 != $scope.loginData.newPassword2) {
                                console.log('Password diverse, inserire nei campi password identiche');
                                e.preventDefault();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: 'Password diverse'
                                });

                                alertPopup.then(function(res) {
                                    // Custom functionality....
                                });
                            }
                            else {
                                $rootScope.users[$rootScope.userLogged.id].password = $scope.loginData.newPassword2;
                                console.log('Cambiata', $scope.loginData.newPassword2);
                            }
                        }
                    }
                ]
            });

            $timeout(function() {
                myPopup.close(); //close the popup after 20 seconds for some reason
            }, 20000);
        };
    });
/* EOF */
