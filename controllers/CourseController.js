window.CourseController = function ($scope, $routeParams, $http) {
    $http.get("http://localhost:3000/courses")
        .then(response => {
            $scope.courses = [];
            if (response.status == 200) {
                $scope.courses = response.data;
            }
            const id = $routeParams.id;
            if (id) {
                $scope.course = $scope.courses.find(course => course.id == id);
                // const routeItems = document.querySelectorAll('.route-item');
                // if (routeItems) {
                //     routeItems.forEach((routeItem) => {
                //         const routeTitle = routeItem.querySelector('.route-title');
                //         const angleIcon = routeTitle.querySelector('i');
                //         const routeContent = routeItem.querySelector('.route-content');
                //         let routeContentHeight;
                //         angleIcon.style = 'transform: rotate(0);';
                //         routeTitle.onclick = () => {
                //             console.log("clicked")
                //             if (routeContent.style.display === 'block') {
                //                 routeContent.style.display = 'none';
                //                 angleIcon.style = 'transform: rotate(0deg);';
                //             } else {
                //                 routeContent.style.display = 'block';
                //                 angleIcon.style = 'transform: rotate(180deg);';
                //             }
                //         }
                //     })
                // }
                // console.log(course.name);
            } else {
                $scope.title = "Chương trình đào tạo";
            }
        })
};
