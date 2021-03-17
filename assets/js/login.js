//入口函数
$(function () {
    // 1点击去注册账号,隐藏登陆区域,显示注册区域
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    //点击去登陆,显示登陆区域,隐藏注册区域
    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    // 需求2:自定义layui校验规则
    // console.log(layui);
    let form = layui.form;
    form.verify({
        //属性时校验规则名称,值是函数或者数组
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //重复密码校验规则
        repwd: function (value, item) {
            if (value != $(".reg-box input[name=password]").val()) {
                return "两次密码输入不一致,请重新输入!"
            }
        }
    });
    //需求3:注册用户
    let layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送ajax
        //ajax三板斧 1console 2.请求type,url,data 3.响应体
        $.ajax({
            type: 'post',
            url: '/api/reguser',

            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val()
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                };
                // 提示成功
                layer.msg("恭喜您,用户名注册成功!", { icon: 6 });
                // 切换回登陆模块
                $("#link_login").click();
                // 表单清空
                $("#form_reg")[0].reset();
            }
        });
    });
    //需求4:用户登陆
    $("#form_login").on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        //ajax三板斧 1.console 2.请求type,url data  3.响应体
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 错误提示
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //成功后操作,跳转页面,保存token
                location.href = "/index.html"
                localStorage.setItem("token", res.token);
            }
        })
    })

})