staff_app.service('masterAPI', function ($http, $q, CSRF_TOKEN) {
    this.getList = function (objectName) {
        apiPath = '/api/v1/admin/' + objectName;
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    this.createObject = function (objectName, formData) {

        apiPath = '/api/v1/admin/' + objectName + '/create';
        var deferred = $q.defer();
        console.log(formData);
        $http.post(apiPath, formData)
            .success(function (data) {
                deferred.resolve(data);
                console.log(data)
            }).error(function (data) {
                console.log(data)
                deferred.reject("An error occured while fetching items");
            });
        return deferred.promise;

    };

    this.updateObject = function (objectName, object_id, formData) {

        apiPath = '/api/v1/admin/' + objectName + '/update/' + object_id;
        var deferred = $q.defer();
        $http.post(apiPath, formData)
            .success(function (data) {
                deferred.resolve(data);
                console.log(data)
            }).error(function (data) {
                console.log(data)
                deferred.reject("An error occured while fetching items");
            });
        return deferred.promise;

    };

    this.deleteObject = function (objectName, object_id) {

        apiPath = '/api/v1/admin/' + objectName + '/delete/' + object_id;
        var deferred = $q.defer();
        $http.post(apiPath)
            .success(function (data) {
                deferred.resolve(data);
                console.log(data)
            }).error(function (data) {
                console.log(data)
                deferred.reject("An error occured while fetching items");
            });
        return deferred.promise;

    };

    this.getObject = function (objectName, id) {
        apiPath = '/api/v1/admin/' + objectName + "/" + id;
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    // Syllabus Design Items

    this.getDesign = function (syllabus_id) {
        console.log("SYLLABUS ID ", syllabus_id)
        apiPath = '/api/v1/admin/syllabi/' + syllabus_id + "/design";
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.addComponent = function (syllabus_id, child) {
        apiPath = '/api/v1/admin/syllabi/' + syllabus_id + "/add_child";
        var deferred = $q.defer();
        $http.post(apiPath, child).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.filter = function (objectName, formData) {
        apiPath = '/api/v1/admin/' + objectName + '/search';
        var deferred = $q.defer();
        $http.post(apiPath, formData).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.addComponent = function (syllabus_id, child) {
        apiPath = '/api/v1/admin/syllabi/' + syllabus_id + "/add_child";
        var deferred = $q.defer();
        $http.post(apiPath, child).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.publishCourse = function (course_id) {
        apiPath = '/api/v1/admin/courses/publish/'+  course_id;
        var deferred = $q.defer();
        $http.post(apiPath,{}).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };
    this.getQuizSetting = function (syllabus_id, item_id) {
        apiPath = '/api/v1/admin/syllabi/' + syllabus_id + "/quiz_setting/" + item_id;
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    this.getAllTutors = function () {
        apiPath = '/api/v1/admin/getAllTutors';
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    this.getTutor = function (tutor_id) {
        apiPath = '/api/v1/admin/tutor_details/'+tutor_id;
        var deferred = $q.defer();
        $http.get(apiPath).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    this.updateSkype = function (tutor_id,skype_id) {
        apiPath = '/api/v1/admin/tutor/'+  tutor_id + "/skype/" + skype_id;
        var deferred = $q.defer();
        $http.post(apiPath,{}).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.updatePhone = function (tutor,phone) {
        apiPath = '/api/v1/admin/tutor/'+  tutor_id + "/phone/" + phone;
        var deferred = $q.defer();
        $http.post(apiPath,{}).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


    this.markTutorVerified = function (tutor,phone) {
        apiPath = '/api/v1/admin/tutor/'+  tutor.id + "/verify";
        var deferred = $q.defer();
        $http.post(apiPath,{}).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };

    this.saveQuizSetting = function (syllabus_id, item_id, formData) {
        apiPath = '/api/v1/admin/syllabi/' + syllabus_id + "/quiz_setting/" + item_id;
        var deferred = $q.defer();
        $http.post(apiPath, formData).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching items");
        });
        return deferred.promise;

    };


});


staff_app.factory("FlashService", function ($rootScope) {
    return {
        show: function (message) {
            $rootScope.flash = message;
        },
        clear: function () {
            $rootScope.flash = "";
        }
    }
});