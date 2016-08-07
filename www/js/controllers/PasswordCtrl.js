app.controller('PasswordCtrl', function($scope, $rootScope, $ionicPopup, $timeout, $http) {

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
                            $rootScope.userLogged.password = $scope.loginData.newPassword2;

                            //$http.post("http://alessandroscarlato.it/modifyPassword.php",{"username":$rootScope.userLogged.username})
                            $http.post("http://alessandroscarlato.it/modifyPassword.php")

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