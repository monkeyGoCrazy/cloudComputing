function top10MostSentReceive(ipAddress, PacketNumber){
            require.config({
                paths: {
                    echarts: 'echarts-2.2.7/build/dist'
                }
            });
    	require(
    	    [
                    'echarts',
                    'echarts/chart/bar',   
                ],
    	        function (ec) {
                    var myChart = ec.init(document.getElementById('top10MostSent'));
    option = {
        title : {
            text: 'Top10 IP Sent Most Data',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Attacker Sent']
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
                data : ['192.95.27.190','\n51.173.229.255 ','192.120.148.227','\n202.1.175.252','40.75.89.172','\n71.126.222.64','51.81.166.201','\n195.198.120.238','40.67.6.199','\n177.125.179.204']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Attacker Sent',
                type:'bar',
                data:[1361724.0, 1142640.0 , 1133340.0, 1108620.0 , 1070580.0 , 376596.0 , 222420.0 , 133320.0 , 105215.0, 72750.0],
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