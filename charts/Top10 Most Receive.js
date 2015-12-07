function top10MostReceived(){
            require.config({
                paths: {
                    echarts: 'echarts-2.2.7/build/dist'
                }
            });
    	require(
    	    [
                    'echarts',
                    'echarts/chart/bar',   // 按需加载所需图表
                ],
    	        function (ec) {
                    var myChart = ec.init(document.getElementById('top10MostReceived'));
    option = {
        title : {
            text: 'Top10 IP Received Most Data',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Target Received']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {show: false, type: ['line', 'bar']},
                restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                axisLabel:{'interval':0},
                data : ['71.126.222.64','\n195.198.120.238','51.81.166.201','\n192.120.148.227','202.1.175.252','\n51.173.229.255','40.75.89.172','\n39.247.10.192','177.125.179.204','\n192.95.27.190']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Target Received',
                type:'bar',
                data:[6747028.0, 26488.0 , 26400.0, 26400.0, 26400.0, 26400.0 , 26400.0 , 26136.0 , 25966.0, 25836.0],
                markPoint : {
                    data : [

                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : 'Average'}
                    ]
                }
            }
        ]
    };
                        
                    myChart.setOption(option);
    }
    );
}