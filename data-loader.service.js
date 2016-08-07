(function () {
    'use strict';

    angular
        .module('dashboard')
        .factory('dataLoaderService', dataLoaderService);

    function dataLoaderService($log, $http, $q) {
        let vm = this;
        let services = {
            selfReportData: getSelfReportData,
            audiosData: getAudiosData,
            videosData: getVideosData
        };

        function getSelfReportData() {
            let def = $q.defer();
            $http.get('./data/emoselfreporteds.json').then(function (res) {
                def.resolve(_.sortBy(res.data.selfReported, 'created.$date'));
            }, function (err) {
                def.reject(err);
            });
            return def.promise;
        }

        function getAudiosData() {
            let def = $q.defer();
            $http.get('./data/emoaudios.json').then(function (res) {
                def.resolve(res.data);
            }, function (err) {
                def.reject(err);
            });
            return def.promise;
        }

        function getVideosData() {
            let def = $q.defer();
            $http.get('./data/emovideos.json').then(function (res) {
                def.resolve(res.data);
            }, function (err) {
                def.reject(err);
            });
            return def.promise;
        }

        return services;
    }
})();