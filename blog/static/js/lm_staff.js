var staff_app = angular.module('lm_staff', [
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ajoslin.promise-tracker',
    'ui.select2' ,
    'angularFileUpload',
    'ui.bootstrap',
    'firebase']);

staff_app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        console.log("configuring LMSTAFF")
        $routeProvider.
            when('/subjects', {
                templateUrl: 'templates/staff/master/subjects.html',
                controller: 'subjectCtrl'
            })
            .when('/levels', {
                templateUrl: 'templates/staff/master/levels.html',
                controller: 'levelCtrl'
            })
            .when('/curricula', {
                templateUrl: 'templates/staff/master/curricula.html',
                controller: 'curriculumCtrl'
            })
            .when('/syllabi', {
                templateUrl: 'templates/staff/syllabi/syllabi.html',
                controller: 'syllabusCtrl'
            })
            .when('/syllabus_design/:id', {
                templateUrl: 'templates/staff/syllabi/syllabus_design.html',
                controller: 'syllabusDesignCtrl'
            })
            .when('/courses', {
                templateUrl: 'templates/staff/courses/courses.html',
                controller: 'courseCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'templates/staff/tutor/dashboard.html',
                controller: 'tutor_dbCtrl'
            })
            .when('/verify_tutors', {
                templateUrl: 'templates/staff/master/tutors.html',
                controller: 'tutorCtrl'
            })
    }]);

staff_app.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
staff_app.config(function ($httpProvider) {

    var logsOutUserOn401 = function ($location, $q, FlashService) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $location.path('/login');
                FlashService.show(response.data.flash);
            }
            return $q.reject(response);
        };

        return function (promise) {
            return promise.then(success, error);
        };
    };

    $httpProvider.responseInterceptors.push(logsOutUserOn401);

});


staff_app.directive('repeatDone', function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
})

staff_app.directive('flash', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {height: 'evaluate', width: 'evaluate', source: 'evaluate', name: 'attribute', swf: 'evaluate'},
        link: function (scope, element, attrs) {
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
            var swfVersionStr = "10.2.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string.
            var xiSwfUrlStr = "";
            var flashvars = {};
            flashvars.xmlFile = scope.source;
            flashvars.adWidth = scope.width;
            flashvars.adHeight = scope.height;
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = scope.name;
            attributes.name = scope.name;
            attributes.align = "middle";
            swfobject.embedSWF(
                scope.swf, "flashContent",
                scope.width, scope.height,
                swfVersionStr, xiSwfUrlStr,
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
        },
        template: '<div id="flashContent"> Flash!</div>',
        replace: true
    };
})

staff_app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            $(document).ready(function () {
                scope.$eval(attr.onFinishRender);
            });
            if (scope.$last === true) {
            }
        }
    }
});


staff_app.controller('mainCtrl', function ($rootScope, $scope, $route, $routeParams, $location, promiseTracker, $firebase, FIREBASE_TOKEN, FIREBASE_REF) {


    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $rootScope.my_fb_ref = null;
    $rootScope.my_fb_loc = null;
    $rootScope.loadingTracker = promiseTracker('loadingTracker');
    $rootScope.appRef = new Firebase(FIREBASE_REF);
// Log me in.
    $rootScope.appRef.auth(FIREBASE_TOKEN, function (error, result) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            $rootScope.my_fb_loc = FIREBASE_REF + "/tutor/" + result.auth.id;
            console.log(FIREBASE_REF + "/tutor/" + result.auth.id + "/helpreq")

            $rootScope.my_fb_ref = new Firebase($rootScope.my_fb_loc);
            $rootScope.my_name = result.auth.displayName;
            $rootScope.my_id = result.auth.id;
            console.log($rootScope.my_id)
            $rootScope.my_fb_ref.child("full_name").set(result.auth.displayName);
//            $rootScope.my_fb_ref.onDisconnect().remove();
            $scope.tutor_ref = new Firebase(FIREBASE_REF + "/tutor/" + $rootScope.title + "/helpreq");

            $rootScope.helpRequests = $firebase($scope.tutor_ref);
            $scope.tutor_ref.on("child_added", function (ss) {
                $scope.helpRequests.push(ss.val());
            })
            $scope.tutor_ref.on("child_removed", function (ss) {
                $scope.helpRequests = _.without($scope.helpRequests, ss.val());
            })

        }
    });


})