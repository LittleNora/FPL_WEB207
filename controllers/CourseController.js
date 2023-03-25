window.CourseController = function ($scope, $routeParams, $route) {
    $scope.courses = [
        {
            id: 1,
            name: 'DevOps Foundation',
        }
    ];
    const id = $routeParams.id;
    if (id) {
        const routeItems = document.querySelectorAll('.route-item');
        if (routeItems) {
            routeItems.forEach((routeItem) => {
                const routeTitle = routeItem.querySelector('.route-title');
                const angleIcon = routeTitle.querySelector('i');
                const routeContent = routeItem.querySelector('.route-content');
                let routeContentHeight;
                angleIcon.style = 'transform: rotate(0);';
                routeTitle.onclick = () => {
                    if (routeContent.style.display === 'block') {
                        routeContent.style.display = 'none';
                        angleIcon.style = 'transform: rotate(0deg);';
                    } else {
                        routeContent.style.display = 'block';
                        angleIcon.style = 'transform: rotate(180deg);';
                    }
                }
            })
        }
        $scope.course = $scope.courses.find(course => course.id == id);
        // console.log(course.name);
    }
};