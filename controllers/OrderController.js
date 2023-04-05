window.OrderController = function ($scope, $routeParams, $http) {
    // const myModal = document.getElementById('myModal');
    // const myInput = document.getElementById('myInput');
    //
    // myModal.addEventListener('shown.bs.modal', () => {
    //     myInput.focus()
    // })
    const validation = {
        required: function (value = "") {
            return value.trim() === "" ? "Vui lòng nhập trường này" : undefined;
        },
        email: function (value = "") {
            const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regEmail.test(value) ? undefined : "Vui lòng nhập đúng định dạng email";
        },
        tel: function (value = "") {
            const regTel = /(01|03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
            return regTel.test(value) ? undefined : "Vui lòng nhập đúng định dạng số điện thoại";
        },
        minLength: function ([value, min]) {
            return value.length < min ? `Tối thiểu ${min} ký tự` : undefined;
        },
        maxLength: function ([value, max]) {
            return value.length > max ? `Tối đa ${max} ký tự` : undefined;
        },
        isNumber: function (value) {
            return Number.isNaN(Number(value)) ? "Vui lòng nhập số" : undefined;
        },
        identityId: function (value) {
            // const reg = /^\d{9,13}$/;
            const reg = /^(?=[0-9]*$)(?:.{9}|.{12})$/;
            return reg.test(value) ? undefined : "Vui lòng nhập đúng định dạng CMT/CCCD";
        },
    }

    const rules = {
        fullname: [
            'required'
        ],
        identity_id: [
            'required',
            'identityId'
        ],
        tel: [
            'required',
            'tel',
        ],
        dob: [
            'required',
        ],
        email: [
            'required',
            'email'
        ],
        location: [
            'required',
        ],
        time: [
            'required'
        ],
        gender: [
            'required',
        ]
    };

    const id = $routeParams.id;
    if (id) {
        $http.get(`http://localhost:3000/courses/${id}`)
            .then(response => {
                if (response.status == 200) {
                    $scope.course = response.data;
                }
                $scope.getMentor = function () {
                    return $scope.course.mentor.map(mentor => mentor.name).join(', ');
                }
            })
    }

    $scope.submit = function () {
        let isValid = true;
        $scope.data = {
            course_id: id,
        };
        $scope.errors = {};
        Object.entries(rules).forEach(([key, rulesByKey]) => {
            let value = $scope.inputs?.[key];
            if (typeof value === "object") {
                const date = new Date(value).toLocaleDateString();
                let [day, month, year] = date.split('/');
                if (day < 10) {
                    day = `0${day}`;
                }
                if (month < 10) {
                    month = `0${month}`;
                }
                value = [day, month, year].join('/');
            }
            for (let eachRule of rulesByKey) {
                let [rule, secValue] = eachRule.split(':');
                if (secValue) value = [value, secValue];
                const error = validation[rule](value);
                if (error) {
                    isValid = false;
                    $scope.errors[key] = error;
                    break;
                }
            }
            if (!$scope.errors[key]) {
                $scope.data[key] = value;
            }
        })
        if (isValid) {
            $http.post(
                "http://localhost:3000/order",
                $scope.data
            )
                .then(response => {
                    if (response.status == 201) {
                        for (const key in $scope.inputs) {
                            $scope.inputs[key] = "";
                        }
                        document.querySelector("#modalBtn").click();
                    }
                })
        }
    };
};