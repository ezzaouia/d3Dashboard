(function () {
    'use strict';

    angular
        .module('dashboard')
        .directive('intensityChart', intensityChart);

    function intensityChart($log) {
        return {
            restricted: 'E',
            controller: intensityChartController,
            controllerAs: 'intensityChartCtrl',
            bindToController: true,
            scope: {
                data: '=',
                options: '='
            }
        };
    }

    /** the controller goes here */
    function intensityChartController($element, $log, d3UtilsService) {
        let intensityChartCtrl = this;
        let neutralColorMap = colorMapInstance('neutral');
        let positiveColorMap = colorMapInstance('positive');
        let negativeColorMap = colorMapInstance('negative');

        let w = 100;
        let h = 100;
        let barPadding = 1;

        let svg = d3UtilsService.d3
            .select($element[0])
            .append('svg')
            .attr('width', w)
            .attr('height', h);


        svg.selectAll('text')
            .data(intensityChartCtrl.data)
            .enter()
            .append('text')
            .attr('y', 15)
            .attr('x', function (d, i) {
                return i * (w / _.size(intensityChartCtrl.data));
            })
            .text(function (d, i) {
                return i + 1;
            });

        svg.selectAll('rect')
            .data(intensityChartCtrl.data)
            .enter()
            .append('rect')
            .attr('y', 20)
            .attr('height', w / _.size(intensityChartCtrl.data) - barPadding + 10)
            .attr('width', w / _.size(intensityChartCtrl.data) - barPadding)
            .attr('x', function (d, i) {
                return i * (w / _.size(intensityChartCtrl.data));
            })
            .style('fill', function (d) {
                switch (d.key) {
                    case 'neutral':
                        return neutralColorMap(d.value);
                    case 'positive':
                        return positiveColorMap(d.value);
                    case 'negative':
                        return negativeColorMap(d.value);
                }
            });

        // some helpers methods
        function colorMapInstance(key) {
            return d3UtilsService.colorMap(findColorMap(intensityChartCtrl.options, key));
        }

        function findColorMap(options, key) {
            return {
                color0: _.result(_.find(options, { 'key': key }), 'color0'),
                color1: _.result(_.find(options, { 'key': key }), 'color1')
            };
        }

    }

})();