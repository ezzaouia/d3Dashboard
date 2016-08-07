(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($log) {
        this.things = ['one', 2, 'tree'];

        this.intensityChartData = [{ key: 'neutral', value: .93 }, { key: 'positive', value: .4 }, { key: 'neutral', value: 0 }, { key: 'neutral', value: 0 }, { key: 'negative', value: .13 }, { key: 'negative', value: .92 }];

        this.intensityChartOptions = [
            { key: 'neutral', color0: '#ECEFF1', color1: '#263238' },
            { key: 'positive', color0: '#DCEDC8', color1: '#33691E' },
            { key: 'negative', color0: '#F8BBD0', color1: '#880E4F' }
        ];
    }

})();