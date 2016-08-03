app.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopover, $http) {

    $http.get("http://alessandroscarlato.it/usersDetails.php")
        .then(function (response) {
            $rootScope.users = response.data.records;
        });

    $rootScope.titleHeader = 'Login';

    $rootScope.loginData = {};


    $rootScope.attivita = [{nome: 'Permessi Dipendenti', stato:'non assegnata', datainizio:'20/01/2016', datafine:'29/12/2016' ,utenti:'pzannino,sardissone'},
        {nome: 'Pagamenti', stato:'in corso', datainizio:'22/01/2012', datafine:'29/06/2012',utenti: 'super_user'},
        {nome: 'Applicazione mobile', stato:'completata', datainizio:'12/06/2014', datafine:'13/06/2016',utenti:'pzannino'}
    ];

    // Perform the login action when the user submits the login form
    $scope.login = function() {
        console.log('Doing login', $rootScope.loginData);

        for (var i = 0; i < $rootScope.users.length; i++) {
            if($rootScope.users[i].username==$rootScope.loginData.username && $rootScope.users[i].password==$rootScope.loginData.password){
                $rootScope.userLogged = $rootScope.users[i];
                console.log('ok')
            }
        };

        if ($rootScope.userLogged) {
            $rootScope.titleHeader = 'Dashboard';
            console.log('Utente ' + $rootScope.userLogged.profile + ' loggato con successo');
        }else{
            console.log('Nessun utente trovato per i parametri inseriti');
            alert('Utente non trovato');
        }
    };

    $scope.logout = function() {
        $rootScope.titleHeader = 'Login';
        $rootScope.loginData = {};
        $rootScope.userLogged = undefined;
    };

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
        '   <ion-header-bar>' +
        '       <h1 class="title">WebPage</h1>' +
        '   </ion-header-bar>' +
        '   <ion-content class="padding">' +
        '   <ion-item class="item-avatar positive"><img src="img/nerd.jpg"> <a href="http://www.alessandroscarlato.it/" target="_blank" class="link">Scarlato A.</a> </ion-item> ' +
        '   </ion-content>' +
        '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
});