function top10IpDistribu(ip, ipDict){
    require.config({
                paths: {
                    echarts: 'bower_components/echarts-2.2.7/build/dist'
                }
            });
        require(
            [
                    'echarts',
                    'echarts/chart/pie',   
                ],
                function (ec) {
                    var myChart = ec.init(document.getElementById('top10IpDistribu'));
    option = {
        title : {
            text: 'Top 10 Attacker IP Distribution',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data://ip
            ['195.216.1.86','39.8.162.58','197.84.248.196','217.238.32.123','167.13.39.9','192.87.52.192','193.86.91.118','195.58.5.16','210.185.169.79','192.153.200.55']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {
                    show: false, 
                    type: ['pie', 'funnel']
                },
                restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
          {
                name:'Radius Pattern',
                type:'pie',
                radius : [20, 110],
                center : ['25%', 200],
                roseType : 'radius',
                width: '40%',       // for funnel
                max: 40,            // for funnel
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    }
                },
                data://ipDict
                [
                    {value:100.00209590878605, name:'195.216.1.86'},
                    {value:79.73884976525821, name:'39.8.162.58'},
                    {value:64.06773977196512, name:'197.84.248.196'},
                    {value:61.77691146881288, name:'217.238.32.123'},
                    {value:53.7034708249497, name:'167.13.39.9'},
                    {value:52.357897384305836, name:'192.87.52.192'},
                    {value:52.135731052984575, name:'193.86.91.118'},
                    {value:51.9932092555332, name:'195.58.5.16'},
                    {value:51.92194835680751, name:'210.185.169.79'},
                    {value:51.856975184439975, name:'192.153.200.55'}
                ]
            },
            {
                name:'Square Pattern',
                type:'pie',
                radius : [30, 110],
                center : ['75%', 200],
                roseType : 'area',
                x: '50%',               // for funnel
                max: 40,                // for funnel
                sort : 'ascending',     // for funnel
                data://ipDict
                [
                    {value:100.00209590878605, name:'195.216.1.86'},
                    {value:79.73884976525821, name:'39.8.162.58'},
                    {value:64.06773977196512, name:'197.84.248.196'},
                    {value:61.77691146881288, name:'217.238.32.123'},
                    {value:53.7034708249497, name:'167.13.39.9'},
                    {value:52.357897384305836, name:'192.87.52.192'},
                    {value:52.135731052984575, name:'193.86.91.118'},
                    {value:51.9932092555332, name:'195.58.5.16'},
                    {value:51.92194835680751, name:'210.185.169.79'},
                    {value:51.856975184439975, name:'192.153.200.55'}
                ]
            }
        ]
    };
                        
                    myChart.setOption(option);
    }
    );
}                    
