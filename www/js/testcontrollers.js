angular.module('test.controllers', [])

.controller('FHTest', function($scope) {
  // add function to pass userInput to cloud via
  // $fh.cloud call to controller scope
  $scope.sayHello = function(userInput) {
    // TODO: not sure why $scope.userInput isn't working for this model and controller?  Subscope issues?

    //Notifying the user that the cloud endpoint is being called.
    $scope.noticeMessage = "trying to say hello...";
    $scope.textClassName = "ion-loading-c";

    // check if userInput is defined
    if (userInput) {

      var params = {
        path: 'hello',
        method: "GET",
        contentType: "application/json",
        data: { hello: userInput },
        timeout: 15000
      };

      $fh.cloud(params, function(response) {
          // If successful, display the length  of the string.
          if (response.msg != null && typeof(response.msg) !== 'undefined') {
            console.log("cloud API call success");
            $scope.noticeMessage = response.msg;
            $scope.textClassName = "ion-checkmark-round";
            $scope.$apply()
          } else {
            console.log("cloud API call error");
            $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
            $scope.textClassName = "ion-close-round";
            $scope.$apply()
          }
        }, function(msg,err) {
          //If the cloud call fails
          $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
          $scope.textClassName = "ion-close-round";
          $scope.$apply()
      });
    }
  };
});