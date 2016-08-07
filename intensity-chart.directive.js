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

        let w = 200;
        let h = 150;
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

        // legend

        let legendWidth = w * .7;
        function addGradientLegend(intensityChartOptions) {
            _.forEach(intensityChartOptions, function (object, index) {

                let y = 70 + (index * 8);

                var legend = svg.append("defs")
                    .append("svg:linearGradient")
                    .attr("id", "gradient-" + object.key)
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "0%")
                    .attr("spreadMethod", "pad");

                legend.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", object.color0);

                legend.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", object.color1);

                svg.append("rect")
                    .attr("width", legendWidth)
                    .attr("height", 7)
                    .attr('y', y)
                    .attr('x', 15)
                    .style("fill", "url(#gradient-" + object.key + ')')

                svg.append('text')
                    .attr("class", "label")
                    .attr('y', y + 7)
                    .attr('x', w - 45)
                    .text(object.key);

            });
        }

        addGradientLegend(intensityChartCtrl.options);

        var x = d3.scale.linear()
            .range([0, legendWidth])
            .domain([0, 100]);

        var yAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(15, 94)")
            .call(yAxis).append("text")
            .attr("transform", "rotate(+0)")
            .attr("y", 20).attr("dy", ".71em")
            .attr("x", 40).attr("dx", ".71em")
            .style("text-anchor", "center").text("Intensity scale");


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