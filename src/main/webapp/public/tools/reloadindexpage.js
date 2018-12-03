//重新加载当前页
define({
    reloadSource:function (selector,initGrid) {
        var that = this;
        //var pagination = $('#metaDataRowGrid .active').attr("data-page");
        var pagination = selector.find(".active").attr("data-page");
        //alert(pagination);
        initGrid(pagination);

    }
});
