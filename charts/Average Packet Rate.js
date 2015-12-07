function averagePacketRate(normalX,normalY,attackX,attackY) {
    require.config({
                paths: {
                    echarts: 'bower_components/echarts-2.2.7/build/dist'
                }
            });
        require(
            [
                    'echarts',
                    'echarts/chart/line',
                ],
                function (ec) {
                    var myChart = ec.init(document.getElementById('averagePacketRate'));
    option = {
        title : {
            text: 'Average Packet Rate',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Attack','Normal']
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
                boundaryGap : false,
                data : normalX,
                'name':'Sec',
            }
        ],
        yAxis : [
            {
                        'type':'value',
                        'name':'Packet/Second',
            }
        ],

        series : [
            {
                name:'Attack',
                type:'line',
                data: attackY,
                markPoint : {
                    data : [
                        {type : 'max', name: 'Max rate'},
                        {type : 'min', name: 'Min rate'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: 'Average'}
                    ]
                }
            },
            {
                name:'Normal',
                type:'line',
                data: normalY,
                markPoint : {
                    data : [
                        {type : 'max', name: 'Max rate'},
                        {type : 'min', name: 'Min rate'}
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
                    