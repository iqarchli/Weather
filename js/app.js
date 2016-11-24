(function () {
	var app = angular.module('WeatherApp', []);
    app.controller('FirstCtrl', function($scope,getcitynameservice, getweatherservice) {
        

         		$scope.remaining = 3;

    			$scope.getaddress = function(){
    			var x = document.getElementById("demo");

					if (navigator.geolocation) {

			    		navigator.geolocation.getCurrentPosition(function(position){

				        	$scope.$apply(function(){

						        $scope.position = position;
						        $scope.latitude = position.coords.latitude;
						        $scope.longitude = position.coords.longitude;

		    					getcitynameservice.getcityfun($scope.latitude,$scope.longitude).then(function (d) {

				            //$scope.ggfgfg = JSON.parse(d.data) .formatted_address;
				            		$scope.address = d.data.results[0].formatted_address;
									console.log($scope.address);

				        		},  function (error) {

				            	alert('Error!');
				        		});



		    					getweatherservice.getweather($scope.latitude,$scope.longitude).then(function (d) {

				            
				            		$scope.weather = d.data;
									console.log($scope.weather);

				        		},  function (error) {

				            	alert('Error!');
				        		}); 








					
			        
			      			});

			    		});
			  		}

					else{
			  		console.log("A problem occurred!!! ");
			  		}


    			}

    			 $scope.getweather = function(){
    				$scope.xxx = $scope.weather
    			} 


			/* $scope.showPosition = function (position) {
			    x.innerHTML = "Latitude: " + position.coords.latitude + 
			    "<br>Longitude: " + position.coords.longitude; 
			    b3280233cc812ef9bcab29e78eeaff36 weather

			    google  AIzaSyAf99uNM6XLhf7_nRi2hQsqlryI9Ewph0c
			} */
         
    });

    /*app.service('getcityname', function($http) {
    	this.myFunc = function (x,y) {
		        	$http({
						  method: 'GET',
						  url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + x+ ',' + y + '&key=AIzaSyAf99uNM6XLhf7_nRi2hQsqlryI9Ewph0c'
							  
						}).then(function successCallback(response) {
						    // this callback will be called asynchronously
						    // when the response is available

						    //return response.formatted_address;
						    return 1; 

						  }, function errorCallback(response) {
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						    return -1; 
						  });
		}



    
			}); */
   

    app.factory('getcitynameservice', function ($http) {
    var fac = {};
	    fac.getcityfun = function (str1,str2) {
	        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + str1+ ',' + str2 + '&key=AIzaSyAf99uNM6XLhf7_nRi2hQsqlryI9Ewph0c');
	    }
    	return fac;
	});

	app.factory('getweatherservice', function($http){
		var res = {};
		res.getweather = function (str1,str2){

			return  $http({
	        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+str1+'&'+str2+'=139&APPID=b3280233cc812ef9bcab29e78eeaff36',
	        method: "POST",
	        data: {test :  name },
	        withCredentials: true,
	        headers: {
	                    'Content-Type': 'application/json; charset=utf-8'
	        }
	    });



			//return $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+str1+'&'+str2+'=139&APPID=b3280233cc812ef9bcab29e78eeaff36');
		}
		return res;
	})


   })();



