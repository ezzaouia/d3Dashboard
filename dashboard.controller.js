(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($log, dataLoaderService) {
        let dashboardCtrl = this;
        
        $log.info('dataLoaderService', dataLoaderService);


        this.things = ['one', 2, 'tree'];

        this.intensityChartData = [{ key: 'neutral', value: .93 }, { key: 'positive', value: .4 }, { key: 'neutral', value: 0 }, { key: 'neutral', value: 0 }, { key: 'negative', value: .13 }, { key: 'negative', value: .92 }];

        this.intensityChartOptions = [
            { key: 'neutral', color0: '#ECEFF1', color1: '#263238' },
            { key: 'positive', color0: '#DCEDC8', color1: '#33691E' },
            { key: 'negative', color0: '#F8BBD0', color1: '#880E4F' }
        ];

        this.getSelfReportData = function () {
            dataLoaderService.selfReportData()
                .then(function (selfReportData) {
                    $log.debug('selfReportData returned to controller.', selfReportData);
                },
                function (data) {
                    $log.debug('selfReportData retrieval failed.');
                });
        };

        this.getAudiosData = function () {
            dataLoaderService.audiosData()
                .then(function (audiosData) {
                    $log.debug('audiosData returned to controller.', audiosData);
                },
                function (data) {
                    $log.debug('audiosData retrieval failed.');
                });
        };

        this.getVideosData = function () {
            dataLoaderService.videosData()
                .then(function (videosData) {
                    $log.debug('videosData returned to controller.', videosData);
                },
                function (data) {
                    $log.debug('videosData retrieval failed.');
                });
        };

        this.getSelfReportData();
        this.getAudiosData();
        this.getVideosData();

    }

})();