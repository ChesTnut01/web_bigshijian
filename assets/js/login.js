$(function () {
    // 点击去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-div').show()
    })

    // 点击去登录账号
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-div').hide()
    })

    // 从类ui中获取from对象
    var form = layui.form
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 定义pwd的检验规则 
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 换需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示的消息即可
            var pwd = $('.reg-div [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        // 发起Ajax的PODT请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message + '请登录！');
            $('#link_login').click()

        })
    })

    // 监听登录表单的提交事件 (第二种方法)
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message + '正在跳转！')
                // 将登录成功的token字符串，保存在本地存储localStorag中
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                // 跳转主页
                location.href = "/index.html"
                //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzMjMsInVzZXJuYW1lIjoicm9vdDEiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYyMjM3Mjg0MSwiZXhwIjoxNjIyNDA4ODQxfQ.Kloeo2VJHDRrObh7CEXS8_AD0DL_5AKZHijIkoDvnqI
            }

        })
        // var data = {username:$('#form_login [name=username]').val(), password:$('#form_login [name=password]').val()}
        // $.post('http://api-breakingnews-web.itheima.net/api/login',data,function(res){
        //     if (res.status !== 0){
        //         return layer.msg(res.message)
        //     }
        //     layer.msg(res.message + '正在跳转！')
        // })


    })




})