// 注意，没次调用￥.get（）或 $.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置函数
$.ajaxPrefilter(function(options){
   
    // 再发起真正的Ajax请求之前
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})