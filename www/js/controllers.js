angular.module('badge.controllers', ['ui.calendar','ngGrid'])//, 'ui.bootstrap'

.controller('AppCtrl',function($scope, $rootScope) {

  $rootScope.titleHeader = 'Login';

  $scope.loginData = {};

  $rootScope.users = [{id: '0', firstname:'super', lastname:'user', username:'super_user', password:'super', profile:'admin'},
                      {id: '1', code:1, firstname:'serena', lastname:'ardissone', username:'sardissone', password:'serena', profile:'user', qualify:'IMP'},
                      {id: '2', code:2, firstname:'pasquale', lastname:'zannino', username:'pzannino', password:'pasquale', profile:'user', qualify:'IMP'},
                      {id: '3', firstname:'domenico', lastname:'frosina', username:'dfrosina', password:'domenico', profile:'admin', qualify:'DIR'},
                      {id: '4', firstname:'carlo', lastname:'siciliano', username:'csiciliano', password:'carlo', profile:'manager', qualify:'DIR'}
  ];

   // Perform the login action when the user submits the login form
  $scope.login = function() {
        //alert('vecchio login:  ' + $rootScope.titleHeader);  //alert
        console.log('Doing login', $scope.loginData);

        for (var i = 0; i < $rootScope.users.length; i++) {
            if($rootScope.users[i].username==$scope.loginData.username && $rootScope.users[i].password==$scope.loginData.password){
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
    $scope.loginData = {};
    $rootScope.userLogged = undefined;
    //('nuovo logout:  ' + $rootScope.titleHeader);  //alert
  };
})

.controller('LoginCtrl', function($scope, $rootScope) {

    $rootScope.eventFilter = {};
})

.controller('BadgeCtrl', function($scope, $rootScope) {

  $rootScope.copy = [{nome: 'Permessi Dipendenti', datainizio:'20/01/2016', datafine:'29/12/2016'},
        {nome: 'Pulizie', datainizio:'22/01/2012', datafine:'29/06/2012'},
    ];

  $scope.started = false;
  $scope.date = new Date();

  $scope.start = function(){
    $scope.started = true;
  };

  $scope.stop = function(){
    $scope.started = false;
  };
})

.controller('ProfilaCtrl', function($scope, $rootScope, $ionicPopup, $timeout) {

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Table.xls");
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

    $rootScope.attivita = [{nome: 'Permessi Dipendenti', datainizio:'20/01/2016', datafine:'29/12/2016'},
        {nome: 'Pulizie', datainizio:'22/01/2012', datafine:'29/06/2012'},
    ];

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

.controller('UserCtrl', function($scope) {


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
            myPopup.close(); //close the popup after 10 seconds for some reason
        }, 10000);
    };
});
/* EOF */