$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //选择文件
    $("#btnChooseImage").on('click', function () {
        $("#file").click()
    })
    // 修改裁剪图片
    $("#file").on('change', function (e) {
        //3.1拿到用户选择的文件
        let file = e.target.files[0];
        // 前端非空校验
        if (file == undefined) {
            return layer.msg("请选择图片")
        }
        // 3.2根据选择的文件,创建一个对应的URL地址
        let newImgURL = URL.createObjectURL(file);
        //3.3销毁旧的裁剪区域,再重新设置图片路径,之后再创建
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 4.上传头像
    $("#btnUpload").on("click", function () {
        // 获取base64类型的头像(字符串)
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        //发送ajax
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                return layer.msg("恭喜您,更换头像成功!")
                window.parent.getUserInfo();
            }
        })
    })








})