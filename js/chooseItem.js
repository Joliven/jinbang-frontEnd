$(function(){
        // var domin = "http://localhost:8081/jinbang";
        var domin = "http://11pm.top:8081/jinbang";

        layui.use(['element', 'jquery', 'form', 'table'], function() {
            let element = layui.element;
            let form = layui.form;
            let table = layui.table;
            let $ = layui.jquery;
    
            let paths;
            var itemradio;
    
            // 获取选项
            function init() {
                // 清空级联器
                $("#select1").empty();
                $("#select1").append($('<option value="">--请选择--</option>'));
                $("#selectDiv2").empty();
                $("#selectDiv2").empty();
    
                jQuery.support.cors = true;
    
                // 获取表单头
                $.ajax({
                    type: "POST",
                    url: domin + "/itemradio",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail")}}),
                    dataType: 'JSON',
					contentType: "application/json",
                    success: function(da) {
                        if (da.state == "success") {
                            window.localStorage.setItem("session", da.session);
                            if (da.data) {
                                itemradio = da.data;
                                // console.log(itemradio);
                                let types = itemradio[0].types;
                                let sources = itemradio[1].sources;
                                let grades = itemradio[2].grades;
                                let names = itemradio[3].names;
                                paths = itemradio[4].paths;
                                let inputStr = '<input type="radio" name="sex" value="男" title="男">';
                                // console.log(typeof types);
                                // 设置单选框
                                types.forEach(function(item) {
                                    let temp = $(inputStr);
                                    temp.attr("name", "type");
                                    temp.attr("value", item);
                                    temp.attr("title", item);
                                    // console.log(temp);
                                    $("#types-div").append(temp);
                                })
                                // $("#types-div input:first-child").attr("checked", true);
                                sources.forEach(function(item) {
                                    let temp = $(inputStr);
                                    temp.attr("name", "source");
                                    temp.attr("value", item);
                                    temp.attr("title", item);
                                    // console.log(temp);
                                    $("#sources-div").append(temp);
                                })
                                // $("#sources-div input:first-child").attr("checked", true);
                                grades.forEach(function(item) {
                                    let temp = $(inputStr);
                                    temp.attr("name", "grade");
                                    temp.attr("value", item);
                                    temp.attr("title", item);
                                    // console.log(temp);
                                    $("#grades-div").append(temp);
                                })
                                // $("#grades-div input:first-child").attr("checked", true);
                                names.forEach(function(item) {
                                    let temp = $(inputStr);
                                    temp.attr("name", "name");
                                    temp.attr("value", item);
                                    temp.attr("title", item);
                                    // console.log(temp);
                                    $("#names-div").append(temp);
                                })
                                // $("#names-div input:first-child").attr("checked", true);
                                // 先设置级联下拉选择器的第一层
                                let optionStr = '<option value="">--请选择--</option>';
                                // console.log(typeof paths);
                                for (let i = 0; i < paths.length; i++) {
                                    let temp = $(optionStr);
                                    temp.attr("value", Object.keys(paths[i])[0]);
                                    temp.text(Object.keys(paths[i])[0]);
                                    // console.log(temp);
                                    $("#select1").append(temp);
                                }
                                form.render();
                        } else {
                            console.log(da.msg);
                            }
                        }
                    },
                    error: function(da) {
                        console.log(da);
                    }
                })
    
                // 渲染表格
                table.render({
                    elem: '#items',
                    cols: [
                        [ //标题栏
                            {
                                type: 'checkbox'
                            }, {
                            field: 'iid',
                            title: '题目编号',
                            align: "center"
                        }, {
                            field: 'grade',
                            title: '年级',
                            align: "center"
                        }, {
                            field: 'source',
                            title: '来源',
                            align: "center"
                        }, {
                            field: 'type',
                            title: '类型',
                            align: "center"
                        }, {
                            field: 'name',
                            title: '录入员',
                            align: "center"
                        }, {
                            field: 'path',
                            title: '知识点',
                            align: "center"
                        }, {
                            field: 'item',
                            title: '题目',
                            align: "center"
                        }, {
                            field: 'answer',
                            title: '答案',
                            align: "center"
                        }, {
                            fixed: 'right',
                            width: 150,
                            align: 'center',
                            toolbar: '#rowEdit'
                        }
                        ]
                    ],
                    cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    ,
                    skin: 'line' //表格风格
                    ,
                    even: true,
                    toolbar: "#topEdit",
                    page: true //是否显示分页
                    //,limits: [5, 7, 10]
                    //,limit: 5 //每页默认显示的数量
                    ,
                    data: []
                });
            }
    
            $(document).ready(function() {
                init();
            })
    
            $("#reset").click(function() {
                init();
            });
    
            // 通过结点名，获取子树数组
            function getSubStrByNode(fullPath, node, flag) {
                var subArr;
                if (flag) {
                    return subArr;
                } else {
                    if (fullPath && fullPath.constructor == Array) {
                        // 遇到 Array 则递归
                        for (let i = 0; i < fullPath.length; i++) {
                            subArr = getSubStrByNode(fullPath[i], node, flag);
                            // 层层上交
                            if (subArr) {
                                break;
                            }
                        }
                    }
                    if (fullPath && fullPath.constructor == Object && !flag) {
                        // 遇到 Object 则展开
                        for (let key in fullPath) {
                            if (key == node) {
                                flag = true;
                                return fullPath[key];
                            }
                            // 递归
                            if (Array.isArray(fullPath[key]) && fullPath[key].length !== 0) {
                                let result = getSubStrByNode(fullPath[key], node, flag);
                                // 层层上交
                                if (result) {
                                    flag = true;
                                    return result;
                                }
                            }
                        }
                    }
                    return subArr;
                }
            }
    
            // 多级联动下拉框
            form.on('select(select1)', function(data) {
                // console.log('select(select1): ' + data.value);
                // 获取子树
                let subArr = getSubStrByNode(paths, data.value, false);
                let subKeys = new Array();
                for (let i = 0; i < subArr.length; i++) {
                    for (let key in subArr[i]) {
                        subKeys.push(key);
                    }
                }
                // 不要直接删除下级结点，避免报错
                if ($("#select2").length > 0) {
                    $("#select2").empty();
                    $("#select2").append($('<option value="">--请选择--</option>'));
                } else if (subKeys.length > 0) {
                    let subDomStr = $('<div class="layui-input-inline" id="selectDiv2"><select name="select2" lay-filter="select2" id="select2"><option value="">--请选择--</option></select></div>');
                    $("#groupDiv").append(subDomStr);
                }
                // 添加下层
                for (let key in subKeys) {
                    let temp = $('<option value="">--请选择--</option>');
                    temp.text(subKeys[key]);
                    temp.attr("value", subKeys[key]);
                    $("#select2").append(temp);
                }
                form.render();
            })
    
            // 多级联动下拉框
            form.on('select(select2)', function(data) {
                // console.log('select(select2): ' + data.value);
                // 获取子树
                let subArr = getSubStrByNode(paths, data.value, false);
                let subKeys = new Array();
                for (let i = 0; i < subArr.length; i++) {
                    for (let key in subArr[i]) {
                        subKeys.push(key);
                    }
                }
                // 不要直接删除下级结点，避免报错
                if ($("#select3").length > 0) {
                    $("#select3").empty();
                    $("#select3").append($('<option value="">--请选择--</option>'));
                } else if (subKeys.length > 0) {
                    let subDomStr = $('<div class="layui-input-inline" id="selectDiv3"><select name="select3" lay-filter="select3" id="select3"><option value="">--请选择--</option></select></div>');
                    $("#groupDiv").append(subDomStr);
                }
                // 添加下层
                for (let key in subKeys) {
                    let temp = $('<option value="">--请选择--</option>');
                    temp.text(subKeys[key]);
                    temp.attr("value", subKeys[key]);
                    $("#select3").append(temp);
                }
                form.render();
            })
    
            // 多级联动下拉框
            form.on('select(select3)', function(data) {
                // console.log('select(select3): ' + data.value);
                // 获取子树
                let subArr = getSubStrByNode(paths, data.value, false);
                let subKeys = new Array();
                for (let i = 0; i < subArr.length; i++) {
                    for (let key in subArr[i]) {
                        subKeys.push(key);
                    }
                }
                // 不要直接删除下级结点，避免报错
                if ($("#select4").length > 0) {
                    $("#select4").empty();
                    $("#select4").append($('<option value="">--请选择--</option>'));
                } else if (subKeys.length > 0) {
                    let subDomStr = $('<div class="layui-input-inline" id="selectDiv3"><select name="select4" lay-filter="select4" id="select4"><option value="">--请选择--</option></select></div>');
                    $("#groupDiv").append(subDomStr);
                }
                // 添加下层
                for (let key in subKeys) {
                    let temp = $('<option value="">--请选择--</option>');
                    temp.text(subKeys[key]);
                    temp.attr("value", subKeys[key]);
                    $("#select4").append(temp);
                }
                form.render();
            })
    
            form.on('select(select4)', function(data) {
                // console.log('select(select3): ' + data.value);
                // 获取子树
                let subArr = getSubStrByNode(paths, data.value, false);
                let subKeys = new Array();
                for (let i = 0; i < subArr.length; i++) {
                    for (let key in subArr[i]) {
                        subKeys.push(key);
                    }
                }
                // 不要直接删除下级结点，避免报错
                if ($("#select5").length > 0) {
                    $("#select5").empty();
                    $("#select5").append($('<option value="">--请选择--</option>'));
                } else if (subKeys.length > 0) {
                    let subDomStr = $('<div class="layui-input-inline" id="selectDiv5"><select name="select5" lay-filter="select5" id="select5"><option value="">--请选择--</option></select></div>');
                    $("#groupDiv").append(subDomStr);
                }
                // 添加下层
                for (let key in subKeys) {
                    let temp = $('<option value="">--请选择--</option>');
                    temp.text(subKeys[key]);
                    temp.attr("value", subKeys[key]);
                    $("#select5").append(temp);
                }
                form.render();
            })
    
            // 搜索提交
            form.on('submit(formDemo)', function(data) {
                // console.log(data.field);
                let choose = data.field;
                let matchRslt = new Array();
                let regex = /select\d*/g;
                let itemRes;
    
                for (let key in choose) {
                    if (key.match(regex) !== null) {
                        matchRslt.push(key.match(regex)[0]);
                    }
                }
                // console.log(matchRslt);
                for (let i = 0; i < matchRslt.length; i++) {
                    if (typeof(choose['path']) != "undefined") {
                        choose['path'] = choose['path'] + choose[matchRslt[i]] + "/";
                    } else {
                        choose['path'] = choose[matchRslt[i]] + "/";
                    }
                    delete choose[matchRslt[i]];
                }
                choose['path'] = choose['path'].substring(0, choose['path'].length - 1);
                // console.log(choose);
                // layer.msg(JSON.stringify(choose));
                // 网络请求
                $.ajax({
                    type: "POST",
                    data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: choose}}),
                    url: domin + "/itemchoose",
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "JSON",
                    contentType: "application/json",
                    success: function(da) {
                        if(da.state == "success") {
                            window.localStorage.setItem("session", da.session);
                            if (da.data) {
                                itemRes = da.data;
                                // console.log(itemRes);
                                // 为表格渲染数据
    
                                let tableData = [];
                                for (let i = 0; i < itemRes.length; i++) {
                                    let tableDataPre = {
                                        "iid": "",
                                        "grade": "",
                                        "source": "",
                                        "type": "",
                                        "name": "",
                                        "path": "",
                                        "item": "",
                                        "answer": ""
                                    };
                                    tableDataPre.iid = itemRes[i].item.iid;
                                    tableDataPre.grade = itemRes[i].item.grade;
                                    tableDataPre.source = itemRes[i].item.source;
                                    tableDataPre.type = itemRes[i].item.type;
                                    tableDataPre.name = itemRes[i].user.name;
                                    tableDataPre.path = itemRes[i].kPPath;
                                    tableDataPre.item = itemRes[i].item.content;
                                    tableDataPre.answer = itemRes[i].answer.content;
                                    // console.log(tableDataPre);
                                    tableData.push(tableDataPre);
                                }
                                // console.log(tableData);
                                table.reload("items", {
                                    data: tableData
                                })
                            }
                        } else {
                            console.log(da.msg);
                        }
                    },
                    error: function(da) {
                        console.log(da);
                        // window.location.href='index.html';
                    }
                })
                return false;
            });
    
            // 赋值已知数据
    
            // // 获取选定行数据
            // var checkStatus = table.checkStatus('idTest'); //idTest 即为基础参数 id 对应的值
            // console.log(checkStatus.data) //获取选中行的数据
            // console.log(checkStatus.data.length) //获取选中行数量，可作为是否有选中行的条件
            // console.log(checkStatus.isAll ) //表格是否全选
            // console.log(table);
            // console.log(table.cache.items);
            // table.reload("items", {
            //     data: [{
            //         "iid": "10001"
            //         ,"grade": "王维"
            //         ,"source": "xianxin@layui.com"
            //         ,"type": "男"
            //         ,"name": "浙江杭州"
            //         ,"item": "人生恰似一场修行"
            //         ,"answer": "116"
            //     }]
            // })
    
            // 题目行工具条
            table.on('tool(items)', function(obj) {
                //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                // console.log(obj);
                var datalists = obj.data; //获得当前行数据
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                var tr = obj.tr; //获得当前行 tr 的DOM对象
                const iids = {iids: "[" + datalists.iid.toString() + "]"};

                if (layEvent === 'del') { //删除
                    // console.log("删除");
                    layer.confirm('删除后不可恢复！是否确认？', function(index) {
                        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                        layer.close(index);
                        //向服务端发送删除指令
                        // console.log(data);
                        $.ajax({
                            type: "POST",
                            url: domin + "/itemDeleteByIids",
                            dataType: 'JSON',
                            contentType: "application/json",
                            data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: iids}}),

                            xhrFields: {
                                withCredentials: true
                            },
                            success: function(da) {
                                if(da.state == "success") {
                                    window.localStorage.setItem("session", da.session);
                        
                                } else {
                                    console.log(da.msg);
                                }
                            },
                            error: (da) => {
                                console.log(da);
                            }
                        });
                    });
                } else if (layEvent === 'edit') { //编辑
                    // 存入 localStorage
                    let editingIid = datalists.iid;
                    let grade = datalists.grade;
                    let source = datalists.source;
                    let type = datalists.type;
                    let name = datalists.name
                    let reqData = {
                        grade,
                        source,
                        type,
                        name
                    };
    
                    // 请求该题目的详细信息，并保存
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: reqData}}),
                        url: domin + "/itemchoose",
                        xhrFields: {
                            withCredentials: true
                        },
                        dataType: "JSON",
                        contentType: "application/json",
                        success: function(da) {
                            if(da.state == "success") {
                                window.localStorage.setItem("session", da.session);
                                localStorage.setItem("editingitem", JSON.stringify(da.data[0]));
                                console.log("等待编辑");
                                handleFatherSrc();
                            } else {
                                console.log(da.msg);
                            }
                        },
                        error: function(da) {
                            console.log(da);
                        }
                    })
                }
            });
    
            function handleFatherSrc() {
                $("#subPage", window.parent.document).attr("src", "editItem.html");
            }
    
            //监听表格复选框选择
            table.on('checkbox(items)', function(obj) {
                console.log(obj)
            });
            
    
            $('.demoTable .layui-btn').on('click', function() {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
    
        });
})