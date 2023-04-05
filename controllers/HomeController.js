window.HomeController = function ($scope, $routeParams, $http) {
    $http.get("http://localhost:3000/courses")
        .then(response => {
            if (response.status == 200) {
                $scope.courses = response.data.slice(0, 3);
            }
        })
}