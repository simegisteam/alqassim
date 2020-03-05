mapModule.controller('MapListCtrl',['$scope','mapservice','$rootScope','$translate','$state','utilService', function ($scope,mapservice,$rootScope,$translate,$state,utilService) { 
    $scope.mapList = [];
    

	$scope.init = function () {
		

		$rootScope.loading = true;
		mapservice.getMapList($rootScope.userInfo.token).then(function(result) {
			if(result != null){
                $scope.mapList = result.maps;
                $scope.loginner = window.localStorage.getItem('firstTimer');

                if ($scope.mapList != null && $scope.mapList.length == 1 && $scope.loginner == "true")
                {
					window.localStorage.setItem('firstTimer', "false");
					if (window.localStorage.getItem('logoutChecker') == false) {
						$state.go('login', {});
					} else {
						$state.go("map", { "mapid": $scope.mapList[0].mapID });
					}
					
				}
			}
			$rootScope.loading = false;
		}, function ( response ) {
			$rootScope.loading = false;
		});
		$scope.updateUI($rootScope.language);
	};
	
	jQuery('#mapManagerToolBarDiv').click(function() { 
		jQuery('#mapManagerToolBarDiv').removeClass('active-share-bottom');
	});
	
	$scope.onClickToolbar = function(){
		 jQuery('#mapManagerToolBarDiv').toggleClass('active-share-bottom'); 
	     jQuery.modal.close();
	};

	$scope.logout = function () {
		window.localStorage.setItem('GS_USER_LOGIN_STATUS', null);
		window.localStorage.setiItem("logoutChecker" , "false")
		utilService.logout();
	};
	
	$scope.changeLocaleTo = function(locale){
		utilService.changeLocaleTo(locale);
		$scope.updateUI(locale);
	};
	
	$scope.updateUI = function(locale) {
		$scope.removeCSSStyles();
		if (locale === "ar-AE") {
			$rootScope.addCSS("css/styles/maplist/maplist_ar.css");
			$rootScope.removeCSS("css/styles/maplist/maplist_en.css");
		} else {
			$rootScope.addCSS("css/styles/maplist/maplist_en.css");
			$rootScope.removeCSS("css/styles/maplist/maplist_ar.css");
		}
	};

	$scope.$on('$destroy', function() { 
		$scope.removeCSSStyles();
	});

	$scope.removeCSSStyles = function() {
		$rootScope.removeCSS("css/styles/maplist/maplist_en.css");
		$rootScope.removeCSS("css/styles/maplist/maplist_ar.css");
	};

	// $scope.init();
}]);