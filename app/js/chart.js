var app = angular.module('myApp.chart', []);

app.directive('chartColumn', function() {
    return {
        restrict: "E",
        templateUrl: 'partials/chart.html',
        controller: function() {
            var options = {
                chart: {
                    renderTo: 'container',
                    defaultSeriesType: 'column'
                },
                title: {
                    text: 'Divvy Bicycle Stands per Station'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Stands'
                    }
                },
                legend: {
                        enabled: false
                    },
                    plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        groupPadding: 0,
                        shadow: false
                    }
                },
                series: []

            };

            $.get('data/Divvy_Bicycle_Stations.csv', function(data) {
                // Split the lines
                var lines = data.split('\n');
                
                // Iterate over the lines and add categories or series
                $.each(lines, function(lineNo, line) {
                    var items = line.split(',');
                    
                    // header line containes categories
                    if (lineNo == 0) {
                        $.each(items, function(itemNo, item) {
                            if (itemNo > 0) options.xAxis.categories.push(item);
                        });
                    }
                    
                    // the rest of the lines contain data with their name in the first 
                    // position
                    else {
                        var series = {
                            data: []
                        };
                        $.each(items, function(itemNo, item) {
                            if (itemNo == 0) {
                                series.name = item;
                            } else {
                                series.data.push(parseFloat(item));
                            }
                        });
                        
                        options.series.push(series);
                
                    }
                    
                });
                
                // Create the chart
                var chart = new Highcharts.Chart(options);
            });
        },
        controllerAs: 'chart'
    }
});

