(function () {
    'use strict';
    
    angular
        .module('dashboard')
        .factory('d3UtilsService', d3UtilsService);

    function d3UtilsService($log) {
        return {
            d3: d3,
            colorMap: function (colors) {
                return d3.interpolateRgb(d3.rgb(colors.color0), d3.rgb(colors.color1));
            }
        };
    }

})();