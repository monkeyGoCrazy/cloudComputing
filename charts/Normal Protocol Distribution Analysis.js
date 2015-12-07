function normalProtocolDistriAnalysis(protocols, normalProtocol, xAxis, UDP, HTTP, TCP, ICMP, others) {
    require.config({
                paths: {
                    echarts: 'bower_components/echarts-2.2.7/build/dist'
                }
            });
        require(
            [
                    'echarts',
                    'echarts/chart/pie', 
                    'echarts/chart/bar', 
                ],
                function (ec) {
                    var myChart = ec.init(document.getElementById('normalProtocolDistribu'));
                    var myChart2 = ec.init(document.getElementById('normalProtocolDistribu2'));

    option = {
        title : {
            text: 'Normal Protocol Distribution',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['HTTP','TCP','UDP','ICMP','Others']
        },
        calculable : true,
        series : [
            {
                name:'Protocol',
                type:'pie',
                radius : '55%',
                center: ['50%', 225],
                data:[
                    {value:400, name:'HTTP'},
                    {value:310, name:'TCP'},
                    {value:234, name:'UDP'},
                    {value:135, name:'ICMP'},
                    {value:1548, name:'Others'}
                ]
            }
        ]
    };

    option2 = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type: 'shadow'
            }
        },
        legend: {
            data:['HTTP','TCP','UDP','ICMP','Others']
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            y : 'center',
            feature : {
                mark : {show: false},
                magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['0','1','2','3','4','5','6','7','8','9']
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true},
                'name':'Packet/Second',
            }
        ],
        grid: {
            x2:40
        },
        series : [
           {
                name:'HTTP',
                type:'bar',
                stack: 'Total',
                data: [12396,43564,234566,194234,348523,85735,3844,29485,32495,38472]
            },
            {
                name:'TCP',
                type:'bar',
                stack: 'Total',
                data:[339284,184856,38754,58758,123453,32452,43235,4567,134232,384233]
            },
            {
                name:'ICMP',
                type:'bar',
                stack: 'Total',
                data:[324,546,32,2,4,0,0,8,43,0]
            },
            {
                name:'UDP',
                type:'bar',
                stack: 'Total',
                data:[23323,21,34323,323,43456,65656,23234,33234,5435,32323]
            },
            {
                name:'Others',
                type:'bar',
                stack: 'Total',
                data:[34345,23232,21212,123442,212,2323,34345,33534,232323,49493]
            }
        ]
    };
                    myChart.setOption(option);
                    myChart2.setOption(option2);
                    myChart.connect(myChart2);
                    myChart2.connect(myChart);
                    }
    );
}
                /*
setTimeout(function (){
    window.onresize = function () {
        myChart.resize();
        myChart2.resize();
    }
},200)*/
                    