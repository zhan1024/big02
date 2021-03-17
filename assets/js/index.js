//入口函数
$(function () {
    //需求1:ajax获取用户信息,渲染到页面
    //这个功能,后面其他的页面/模块还要用,所以必须设置为全局函数
    getUserInfo();


    // 2,退出
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        //框架提供询问框
        layer.confirm('是否确认退出!', { icon: 3, title: "t提示" }, function (index) {
            //清空本地token
            localStorage.removeItem("token");
            //2,页面跳转
            location.href = "/login.html";
            //关闭询问框
            layer.close(index);

        })
    })
});


//必须保证这个函数是全局的,后面其他功能要用
function getUserInfo() {
    $.ajax({

        url: '/my/userinfo',
        //配置头信息,设置token,
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            // 请求成功 头像和文字渲染
            renderAvatar(res.data);
        }
    })
}

// 头像和文字渲染封装
function renderAvatar(user) {
    // 1渲染用户名,如果有昵称以昵称为准
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //2.渲染头像,判断图片头像是否存在
    if (user.user_pic == null) {
        // 没有头像
        $(".layui-nav-img").show().html(name[0].toUpperCase());
    } else {
        //渲染图片头像,隐藏文字头像
        $(".layui-nav-img").show().attr('src', user.user_pic);
        $(".text-avatar").hide();
    }
}