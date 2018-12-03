!function(){
	"use strict";

    $.widget("ui.tabs", $.ui.tabs, {
        options: {
            templateArr: ["<li><a href='#{href}'><button type='button' class='ui-tabs-close close' role='button'><span aria-hidden='true' title='close'>&times;<span class='sr-only'>Close</span></span></button>#{label}</a></li>",
                "<li><a href='#{href}'>#{label}<button type='button' class='ui-tabs-close ui-tabs-main-close close' role='button'><span aria-hidden='true' title='close' class='iconfont icon-close'></span></button></a></li>"
            ]
        },
        /*
        {
        	templateArr:["<li><a href='#{href}'><button type='button' class='ui-tabs-close close' role='button'><span aria-hidden='true' title='close'>&times;<span class='sr-only'>Close</span></span></button>#{label}</a></li>",
        	             "<li><a href='#{href}'><button type='button' class='ui-tabs-close ui-tabs-main-close close' role='button'><span aria-hidden='true' title='close' class='iconfont icon-close'></span></button>#{label}</a></li>"]
        },
         */
        _create: function() {
            var options = this.options;
            if (!options.style || !_.isFinite(options.style)) {
                options.style = 1;
            }
            //修改tab多处一栏后左右按钮的样式
            if (options.paging) {
                options.paging = {
                    nextButton  : '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
                    prevButton  : '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
                }
            }
			options.tabCanCloseTemplate = options.templateArr[parseInt(options.style,10)];

			this._super();
		}
	});
}();