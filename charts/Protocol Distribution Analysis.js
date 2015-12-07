function protocolDistriAnalysis(title, protocols, protocol, xAxis, UDP, HTTP, TCP, ICMP, others) {
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
                    if(title == "Attack"){
                        var myChart = ec.init(document.getElementById('attackProtocolDistribu'));
                        var myChart2 = ec.init(document.getElementById('attackProtocolDistribu2'));
                    }else{
                        var myChart = ec.init(document.getElementById('normalProtocolDistribu'));
                        var myChart2 = ec.init(document.getElementById('normalProtocolDistribu2'));
                    }

    option = {
        title : {
            text: title + ' Protocol Distribution',
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
            data: protocols
        },
        calculable : true,
        series : [
            {
                name:'Protocol',
                type:'pie',
                radius : '55%',
                center: ['50%', 225],
                data:
                protocol
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
                data : xAxis,
                'name':'Sec',
                //['0','1','2','3','4','5','6','7','8','9']
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true},
                'name':'Number of packets',
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
                data: HTTP
                //[21,234,2323,343,2323,2323,320,732,4343,2323,2323]
            },
            {
                name:'TCP',
                type:'bar',
                stack: 'Total',
                data: TCP
                //[3232,232,2332,432,323,323,2323,23,434,232]
            },
            {
                name:'ICMP',
                type:'bar',
                stack: 'Total',
                data: ICMP
                //[163233,153322,160023,140322,173234,132456,156323,163232,153232,163234]
            },
            {
                name:'UDP',
                type:'bar',
                stack: 'Total',
                data: UDP
                //[0,0,0,0,0,0,0,0,0,0]
            },
            {
                name:'Others',
                type:'bar',
                stack: 'Total',
                data: others
                //[21,323,323,212,12,12,21,2323,3223,323]
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
                    