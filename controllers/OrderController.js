window.OrderController = function ($scope, $routeParams, $route) {
    $scope.courses = [
        {
            id: 1,
            name: 'DevOps Foundation',
        }
    ];
    const id = $routeParams.id;
    if (id) {
        $scope.course = $scope.courses.find(course => course.id == id);
    }
};