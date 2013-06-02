/*global $,_,angular*/




var edesignlabs = edesignlabs || {};
(function (edesignlabs) {
    'use strict';
    edesignlabs.datahunt = {

        //build scatter graph
        buildScatterGraph : function (){
            var $chartWrapper = $('#scatterchart').find('.chart-wrapper');
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

        wireUpReportTabEvents : function() {
            var that = this;
            $('.scatter-tab').on('shown', function (e) {
                e.target // activated tab
                e.relatedTarget // previous tab
                that.buildScatterGraph();
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

            //this.buildScatterGraph();
            this.wireUpReportTabEvents();
        }


    };
})(edesignlabs);
