function draw(normal,geo,attack,victim){

require.config({
            paths: {
                echarts: 'bower_components/echarts-2.2.7/build/dist'
            }
        });
    require(
        [
                'echarts',
                'echarts/chart/map',   
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById('ipDistribu'));
            option = {

                backgroundColor: '#1b1b1b',
                color: ['gold','aqua','lime'],
                title : {
                    text: 'DDoS Attack Distribution',
                    subtext:'',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['Attack Data'],
                    selectedMode: 'single',
                    selected:{
                       
                    },
                    textStyle : {
                        color: '#fff'
                    }
                },
                toolbox: {
                    show : false,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataRange: {
                    min : 0,
                    max : 100,
                    calculable : true,
                    color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                series : [
                    {
                        name:'world',
                        type: 'map',
                        roam: true,
                        hoverable: false,
                        mapType: 'world',
                        itemStyle:{
                            normal:{
                                borderColor:'rgba(100,149,237,1)',
                                borderWidth:0.5,
                                areaStyle:{
                                    color: '#1b1b1b'
                                }
                            }
                        },
                        data:[],
                        markLine : {
                            smooth:true,
                            symbol: ['none', 'circle'],  
                            symbolSize : 1,
                            itemStyle : {
                                normal: {
                                    color:'#fff',
                                    borderWidth:1,
                                    borderColor:'rgba(30,144,255,0.5)'
                                }
                            },
                            data : //[]
                                normal,//normal
                            //,
                        },
                        geoCoord: //{}
                        geo
                    },
                    {
                        name: 'Attack Data',
                        type: 'map',
                        mapType: 'world',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    label: {
                                        show: false
                                    },
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : //[]
                                attack 
                                                   },
                   /*  markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                },
                                emphasis: {
                                    label:{position:'top'}
                                }
                            },
                            data ://[]
                            victim
                        }*/
                    }
                ]
            };   
            myChart.setOption(option);
    });
}
