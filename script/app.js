var app=angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	
	$routeProvider.when('/',{
		controller:"acceuilController",
		templateUrl:"views/acceuil.html"
	});
	
	
		$routeProvider.when('/liste',{
			controller:"projetController",
			templateUrl:"views/projet.html"
		});
		
	
			$routeProvider.when('/StikyNotes',{
				controller:"produitsController", 
				templateUrl:"views/stiky.html"
			});
			
			$routeProvider.otherwise({
				redirectTo:'/'
			});
				
			
});
app.controller('projetController',function($scope, $http){
	
	$scope.addUserStory = function () {
		
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                fName: $scope.userStory.libelle,
                lName: $scope.userStory.dateDebut,
				lName2: $scope.userStory.dateFin
            });
            alert($scope.userStory.libelle + " - " + $scope.userStory.dateDebut + " - " + $scope.userStory.dateFin);
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('localhost:9090/add', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
               
            });
        };

	
});

app.controller('produitsController',function($scope,$http){
	
	$scope.var3="StikyNotes";
	 $http.get("http://localhost:9090/list")
     .then(function(response) {
        $scope.stiky = response.data;
		});
	$scope.add = function(){
		 var data = $.param({
                id: $scope.id,
                userstory : $scope.text
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('http://localhost:9090/add', data, config)
            .success(function (data, status, headers, config) {
                	 $http.get("http://localhost:9090/list")
						 .then(function(response) {
							$scope.stiky = response.data;
							});
            })
            .error(function (data, status, header, config) {
               
            });
			$("#fermer").click();
			window.scrollTo(0,document.body.scrollHeight);
	};
	$scope.delete =  function(id_clicked){
		
		 var data = $.param({
                id: id_clicked
            });

		  $http.get('http://localhost:9090/delete', data)
            .success(function (data) {
                	 $http.get("http://localhost:9090/list")
						 .then(function(response) {
							$scope.stiky = response.data;
							});
            })
            .error(function (data, status, header, config) {
               
            });
	};

	
});