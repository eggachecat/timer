app.controller('welcomeCtrl', ['$scope', '$state' ,function($scope, $state){
  $scope.data = {};

  $scope.tabState = 0;
  $scope.next = function() {
    $scope.tabState = Math.min($scope.tabState + 1, 2) ;
  };
  $scope.previous = function() {
    $scope.tabState = Math.max($scope.tabState - 1, 0);
  };
  $scope.toAudio = function(index){
    var data = $scope.data;
    $state.go("calculator",{
      index: (81 - data.ages) * data.times
    })
  }
}])

app.controller('calculatorCtrl', ['$scope', '$stateParams', 'srcUrl', function($scope, $stateParams, srcUrl){
	console.log(srcUrl)
	$scope.videoSrc = "./assets/Multiple Leap Motions over WebSockets.mp4";
}])