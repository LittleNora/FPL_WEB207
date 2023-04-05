const myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', { // định nghĩa tên route là trang chủ
            title: 'Trang chủ',
            templateUrl: 'views/home.html', // đường dẫn đến view
            controller: HomeController
        })
        .when('/lien-he', { // định nghĩa tên route là trang chủ
            title: 'Liên hệ',
            templateUrl: 'views/contact.html', // đường dẫn đến view
            controller: function($scope) {
                $scope.title = "Liên hệ";
            }
        })
        .when('/khoa-hoc', { // định nghĩa tên route là trang chủ
            title: 'Chương trình đào tạo',
            templateUrl: 'views/courses.html', // đường dẫn đến view
            controller: CourseController
        })
        .when('/khoa-hoc/:id', { // định nghĩa tên route là trang chủ
            title: 'Chi tiết khóa học',
            templateUrl: 'views/course.html', // đường dẫn đến view
            controller: CourseController
        })
        .when('/order/:id', { // định nghĩa tên route là trang chủ
            title: 'Nhận tư vấn khóa học',
            templateUrl: 'views/order.html', // đường dẫn đến view
            controller: OrderController
        })
});

myApp.run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        loadJs("https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js");
        // loadJs("assets/js/handleCourseRoute.js");
        $rootScope.title = current.$$route.title;
    });
});