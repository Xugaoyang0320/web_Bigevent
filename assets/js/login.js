$(function () {
  // 点击去注册
  $('#go2Reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  
  // 点击去登录
  $('#go2Login').on('click', function () {
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })

  // 从 layui 中获取 form 对象
  let form = layui.form
  let layer=layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'],
    // 检验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于判断
      //如果判断失败,则return一个提示消息
      let pwd = $('.reg-wrap[name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认的提交行为
    e.preventDefault()
    // 发起ajax的post请求
    $.ajax({
      method: 'POST',
      url: 'http://big-event-api-t.itheima.net/api/reguser',
      data: {
        username:$('#form_reg [name=username').val(),
        password:$('#form_reg [name=password').val(),
      },
      success: (res) => {
        console.log((res));
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录');
        // 模拟人的点击行为
        $('#link_login').click()
      }
    })
    // $.post('http://big-event-api-t.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },  function (res) {
    //   if (res.status !== 0) {
    //     return console.log(res.message);
    //   }
    //   console.log(res.message);
    // })
  })

  // 监听登录表单的提交事件
  $('form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      method:'POST',
      url: 'http://big-event-api-t.itheima.net/api/login',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        
      }
    })
  })
})