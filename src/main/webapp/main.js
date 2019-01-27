fish.View.configure({manage: true, syncRender:true}); //全局设置fish使用扩展的功能
//var languageType = navigator.language.substring(0,2);//获取当前浏览器的语言类型
//fish.setLanguage(languageType); //设置国际化语音

// fish.setLanguage('en'); //设置国际化语音
//
// var url = "LoginController/getLanguage";
// $.ajax({
//     url:url,
//     async:false,
//     dataType: 'json',
//     success: function(result){
//         fish.setLanguage(result.resultObject);  //设置国际化语音
//     }
// });

require(['components/system/index/views/IndexView'], function(IndexView){
    new IndexView({
        el : $('#app') //主视图选择器
    }).render();
})