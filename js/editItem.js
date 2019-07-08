$(function(){
    //JavaScript代码区域

    // const domin = "http://localhost:8081/jinbang";
    var domin = "http://11pm.top:8081/jinbang";

    // 创建富文本编辑器
    var E = window.wangEditor;
    var editor1 = new E('#question');
    editor1.create();
    // editor2
    var E = window.wangEditor;
    var editor2 = new E('#answer');
    editor2.create();
    console.log("create.html");
    // 添加文本内容
    var text1 = "<p>";
    var text2 = "</p>";
    var con = $.parseJSON(localStorage.editingitem); // 当前正在编辑的题目
    var gradeOpt = con.item.grade;
    var sourceOpt = con.item.source;
    var nameOpt = con.user.name;
    var typeOpt = con.item.type;
    var pathOpt = con.kPPath;
    function a111(event) {
        if ($("#select6").val()) {
            var para1 = {
                "path": $("#select6").val()
            }
            console.log(typeof(para1));

            $.ajax({
                type: 'POST',
                url: domin + "/addKpByPath",
                data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: para1}}),
                dataType: 'JSON',
                contentType : "application/json",
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
                error: function(da){
                    console.log(da);
                    // window.location.href='index.html';
                }
            })
        }
    }
    if (localStorage.editingitem == undefined) {
        alert("查询错误！");
        window.location.reload();
    } else {
        editor1.txt.html(text1 + con.item.content + text2);
        editor2.txt.html(text1 + con.answer.content + text2);
    }

    layui.use(['element', 'jquery', 'form'], function() {
        let element = layui.element;
        let form = layui.form;
        let $ = layui.jquery;
        let paths;
        // 获取选项
        var itemradio;
        $(document).ready(function() {

            // jQuery.support.cors = true;
            // 获取表单头
            $.ajax({
                type: "post",
                url: domin + "/itemradio",
                data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail")}}),
                dataType: 'JSON',
                contentType : "application/json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(da) {
                    if(da.state == "success") {
                        window.localStorage.setItem("session", da.session);
                        itemradio = da.data;
                        console.log(itemradio);
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
                            if(item == typeOpt){
                                temp.attr("checked", true);
                            }
                            // console.log(temp);
                            $("#types-div").append(temp);
                        });
                        var temp = $(inputStr);
                        temp.attr("name", "type");
                        temp.attr("value", "新类型");
                        temp.attr("title", "新类型");
                        $("#types-div").append(temp);
                        //$("#types-div input:first-child").attr("checked", true);
                        sources.forEach(function(item) {
                            let temp = $(inputStr);
                            temp.attr("name", "source");
                            temp.attr("value", item);
                            temp.attr("title", item);
                            // console.log(temp);
                            if(item == sourceOpt){
                                temp.attr("checked", true);
                            }
                            $("#sources-div").append(temp);
                        });
                        var temp1 = $(inputStr);
                        temp1.attr("name", "source");
                        temp1.attr("value", "新类型");
                        temp1.attr("title", "新类型");
                        $("#sources-div").append(temp1);
                        //$("#sources-div input:first-child").attr("checked", true);
                        grades.forEach(function(item) {
                            let temp = $(inputStr);
                            temp.attr("name", "grade");
                            temp.attr("value", item);
                            temp.attr("title", item);
                            // console.log(temp);
                            if(item == gradeOpt){
                                temp.attr("checked", true);
                            }
                            $("#grades-div").append(temp);
                        });
                        var temp2 = $(inputStr);
                        temp2.attr("name", "grade");
                        temp2.attr("value", "新类型");
                        temp2.attr("title", "新类型");
                        $("#grades-div").append(temp2);
                        names.forEach(function(item) {
                            let temp = $(inputStr);
                            temp.attr("name", "name");
                            temp.attr("value", item);
                            temp.attr("title", item);
                            // console.log(temp);
                            if(item == nameOpt){
                                temp.attr("checked", true);
                            }
                            $("#names-div").append(temp);
                        });
                        var temp3 = $(inputStr);
                        temp3.attr("name", "name");
                        temp3.attr("value", "新类型");
                        temp3.attr("title", "新类型");
                        $("#names-div").append(temp3);
                        var temp4 = $(inputStr);
                        temp4.attr("name", "groupDiv");
                        temp4.attr("value", "新类型");
                        temp4.attr("title", "添加新知识点（以'/'区分各级别）");
                        $("#groupDiv").append(temp4);
                        // 添加新类型
                        var temp = $(inputStr);
                        temp.attr("type", "textarea");
                        temp.attr("name", "newgrade");
                        temp.attr("value", "");
                        temp.attr("class", "layui-input layui-form-danger");
                        temp.attr("style", "width:100px; display: inline-block; margin-top: 2px; margin-bottom: 2px");
                        temp.attr("placeholder", "添加新类型");
                        // temp.attr("lay-verify", "required");
                        // temp.attr("autocomlete", "off");
                        $("#grades-div").append(temp);
                        var temp1 = temp.clone(true);
                        temp1.attr("name", "newtype");
                        $("#types-div").append(temp1);
                        var temp2 = temp.clone(true);
                        temp2.attr("name", "newsource");
                        $("#sources-div").append(temp2);
                        var temp3 = temp.clone(true);
                        temp3.attr("name", "newname");
                        $("#names-div").append(temp3);
                        // 先设置级联下拉选择器的第一层
                        // let firsrPastOpt = pathOpt.split("/")[0];
                        let optionStr = '<option value="">--请选择--</option>';
                        // console.log(typeof paths);
                        for (let i = 0; i < paths.length; i++) {
                            let temp = $(optionStr);
                            temp.attr("value", Object.keys(paths[i])[0]);
                            temp.text(Object.keys(paths[i])[0]);
                            // console.log(temp);
                            $("#select1").append(temp);
                        }
                        var temp4 = temp.clone(true);
                        temp4.attr("name", "select");
                        temp4.attr("id", "select6")
                        $("#groupDiv").append(temp4);
                        $("#groupDiv").append("<input type='button'onclick='a111()' id='goto' class='layui-btn' value='修改路径'></input>");
                        form.render();
                    } else {
                        console.log(da.msg);
                    }
                },
                error: function(da){
                    console.log(da);
                    // window.location.href='index.html';
                }
            })
        })
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
        $("#reset").on("click", function() {
            editor1.txt.clear();
            editor2.txt.clear();
        })

        form.on('submit(formDemo)', function(data) {
            // console.log(JSON.stringify(data.field));
            // console.log(data.field.grade);

            const gradeFromData = data.field.grade;
            const sourceFromData = data.field.source;
            const typeFromData = data.field.type;
            const nameFromData = data.field.name;

            // layer.msg(JSON.stringify(data.field));
            if (data.field.grade = "新类型") {
                data.field.grade = data.field.newgrade;
            }
            if (data.field.source = "新类型") {
                data.field.source = data.field.newsource;
            }
            if (data.field.type = "新类型") {
                data.field.type = data.field.newtype;
            }
            if (data.field.name = "新类型") {
                data.field.name = data.field.newname;
            }

            var para = {};
            para.old = {};
            // console.log(con.item);
            para.old.item = con.item;
            para.old.answer = con.answer;
            para.old.user = con.user;
            para.old.knowledgepoints = con.knowledgepoints;
            para.new = {
                "answer": {
                    "asrid": para.old.answer.asrid,
                    "content": editor2.txt.text()
                },
                "item": {
                    "asrid": para.old.answer.asrid,
                    "content": editor1.txt.text(),
                    "difficulty": 5,
                    "grade": gradeFromData,
                    "iid": para.old.item.iid,
                    "source": sourceFromData,
                    "type": typeFromData,
                    "uid": para.old.user.uid,
                },
                "knowledgepoints": para.old.knowledgepoints,
                "user": {
                    "authority": para.old.user.authority,
                    "name": nameFromData,
                    "uid": para.old.user.uid
                }
            };

            console.log(JSON.stringify(para));
            para = JSON.stringify(para);
            $.ajax({
                // 数据传输
                type: "POST",
                url: domin + "/editItemFully",
                data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: para}}),
                dataType: 'JSON',
                contentType : "application/json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(da) {
                    if(da.state == "success") {
                        window.localStorage.setItem("session", da.session);
                        var msg = confirm("编辑成功！");
                        if (msg) {
                            localStorage.removeItem('editingitem');
                            // window.location.reload();
                            $("#subPage", window.parent.document).attr("src", "chooseItem.html");
                        }
                    } else {
                        console.log(da.msg);
                    }                    
                },
                error: function(da){
                    console.log(da);
                    // window.location.href='index.html';
                }
            })
            return false;
        });
    });
})