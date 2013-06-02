/*global $,_,angular*/




var edesignlabs = edesignlabs || {};
(function (edesignlabs) {
    'use strict';
    edesignlabs.datahunt = {

        //build scatter graph
        buildScatterGraph : function (){
            var $chartWrapper = $('#scatterchart').find('.chart-wrapper'),
                testData = [
                    {
                        key: 'Ash',
                        value: [
                            {
                                x: 50,
                                y: 40,
                                size: 1,
                                shape: 'triange'
                            },
                            {
                                x: 20,
                                y: 50,
                                size: 1,
                                shape: 'triange'
                            }
                        ]
                    },
                    {
                        key: 'Maple',
                        value: [
                            {
                                x: 30,
                                y: 20,
                                size: 1,
                                shape: 'circle'
                            },
                            {
                                x: 25,
                                y: 30,
                                size: 1,
                                shape: 'circle'
                            }
                        ]
                    }

                ];
            $chartWrapper.empty();
            $chartWrapper.append('<svg id="scatter-chart-svg"/>');

            nv.addGraph(function() {
                var chart = nv.models.scatterChart()
                    .showDistX(true)
                    .showDistY(true)
                    .color(d3.scale.category10().range());

                chart.xAxis.tickFormat(d3.format('.02f'))
                chart.yAxis.tickFormat(d3.format('.02f'))

                d3.select('#scatter-chart-svg')
                    .datum(randomData(4,40))
                    .transition().duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });

            /**************************************
             * Simple test data generator
             */

            function randomData(groups, points) { //# groups,# points per group
                var i, j, data = [],
                    shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                    random = d3.random.normal();

                for (i = 0; i < groups; i++) {
                    data.push({
                        key: 'Group ' + i,
                        values: []
                    });

                    for (j = 0; j < points; j++) {
                        data[i].values.push({
                            x: random()
                            , y: random()
                            , size: Math.random()
                            //, shape: shapes[j % 6]
                        });
                    }
                }

                return data;
            }
        },

        buildPieChart : function () {

            var $chartWrapper = $('#piechart').find('.chart-wrapper'),
                testdata = [
                    {
                        key: "Maple",
                        y: 30
                    },
                    {
                        key: "Ash",
                        y: 20
                    },
                    {
                        key: "Birch",
                        y: 25
                    },
                    {
                        key: "Pine",
                        y: 50
                    }
                ];
            $chartWrapper.empty();
            $chartWrapper.append('<svg id="pie-chart-svg"/>');

            nv.addGraph(function() {
                var width = 500,
                    height = 500;

                var chart = nv.models.pieChart()
                    .x(function(d) { return d.key })
                    .y(function(d) { return d.y })
                    //.showLabels(false)
                    .values(function(d) { return d })
                    .color(d3.scale.category10().range())
                    .width(width)
                    .height(height);

                d3.select("#pie-chart-svg")
                    .datum([testdata])
                    .transition().duration(1200)
                    .attr('width', width)
                    .attr('height', height)
                    .call(chart);

                chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

                return chart;
            });
        },

        buildBarChart : function () {
            var $chartWrapper = $('#barchart').find('.chart-wrapper'),

                historicalBarChart = [
                    {
                        key: "Tree Amounts",
                        values: [
                            {
                                "label": "Maple",
                                "value": 30
                            } ,
                            {
                                "label": "Ash",
                                "value": 20
                            } ,
                            {
                                "label": "Birch",
                                "value": 25
                            } ,
                            {
                                "label": "Pine",
                                "value": 50
                            }
                        ]
                    }
                ];

            $chartWrapper.empty();
            $chartWrapper.append('<svg id="bar-chart-svg"/>');


            nv.addGraph(function() {
                var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .staggerLabels(true)
                    //.staggerLabels(historicalBarChart[0].values.length > 8)
                    .tooltips(false)
                    .showValues(true)

                d3.select('#bar-chart-svg')
                    .datum(historicalBarChart)
                    .transition().duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });
        },

        wireUpReportTabEvents : function() {
            var that = this;
            $('.scatter-tab').on('shown', function (e) {
                that.buildScatterGraph();
            });
            $('.pie-tab').on('shown', function (e) {
                that.buildPieChart();
            });
            $('.bar-tab').on('shown', function (e) {
                that.buildBarChart();
            });

            $('.gallery-tab').on('shown', function (e) {
                e.target // activated tab
                e.relatedTarget // previous tab
            });
            $('.map-tab').on('shown', function (e) {
                e.target // activated tab
                e.relatedTarget // previous tab
            });
            $('.table-tab').on('shown', function (e) {
                e.target // activated tab
                e.relatedTarget // previous tab
            })
        },

        //Bootstrap the app
        startApp: function () {
            var showNavTab = function (tab) {
                if (!tab) return;
                var $selectedTab = $(tab);
                if (!$selectedTab.is(':visible')) {
                    $('.nav-section').hide();
                    $selectedTab.show();
                }
            };

            //wire up nav tabs
            $('.nav-tab').click(function(evt){
                var $this = $(this),
                    selectedTab = $this.attr('href');
                showNavTab(selectedTab);
                $('.nav-menu').find('.active').removeClass('active');
                !$this.hasClass('brand') && $this.parent().addClass('active');
            });
            $('.nav-section').hide();
            showNavTab('#landing');

            this.wireUpReportTabEvents();

            //setup tooltips
            $('.gallery-tab').tooltip({
                placement: 'left',
                title: 'Gallery'
            });
            $('.bar-tab').tooltip({
                placement: 'left',
                title: 'Bar Chart'
            });
            $('.scatter-tab').tooltip({
                placement: 'left',
                title: 'Scatter Chart'
            });
            $('.pie-tab').tooltip({
                placement: 'left',
                title: 'Pie Chart'
            });
            $('.map-tab').tooltip({
                placement: 'left',
                title: 'Map'
            });
            $('.table-tab').tooltip({
                placement: 'left',
                title: 'Table'
            });


        }


    };
})(edesignlabs);
