$(function () {
    // 文章类别列表展示
    initArtCateList();
    //封装函数
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',

            success: (res) => {
                // console.log(res);
                let str = template("tpl-art-cate", res);
                $("tbody").html(str)
            }
        })
    }

    //显示添加文章分类列表
    let layer = layui.layer;
    $("#btnAdd").on("click", function () {
        // 利用框架代码,显示提高添加文章区域类别区域
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()

        })
    })

    // 3,提交文章分类添加(事件委托)
    let indexAdd = null;
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layrt.msg(res.message);
                }
                //因为我们添加成功了,所以要重新渲染页面中的数据
                initArtCateList();
                layer.msg("恭喜您,文章类别添加成功!")
                layer.close(indexAdd)
            }
        })
    })
    // 4,修改文章分类,html结构(事件代理)
    let indexEdit = null;
    let form = layui.form;
    $("tbody").on('click', ".btn-edit", function () {
        //4.1显示修改的form
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html()

        });
        // 4.2发送ajax,把数据渲染到form中
        let Id = $(this).attr("data-id")
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,

            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 渲染
                form.val("form-edit", res.data)
            }
        })
    })

    // 5,用事件代理完成,修改文章分类
    $('body').on("submit", "#form-edit", function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 清空form,重构文章分类列表,关闭对话框
                $("#form-edit")[0].reset()
                initArtCateList()
                layer.close(indexEdit)
                layer.msg("恭喜您,修改文章分类成功")
            }
        })
    })

    // 6.删除
    $("tbody").on('click', ".btn-delete", function () {
        //获取Id不能写到 弹出框里面,this改变了
        let Id = $(this).attr("data-id")
        //弹出提示框
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            //发送ajax
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,


                success: (res) => {
                    // console.log(res);
                    console.log(res.message);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    // 关闭对话框,重新渲染数据
                    layer.msg("恭喜您,删除文章分类成功!")
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })





})