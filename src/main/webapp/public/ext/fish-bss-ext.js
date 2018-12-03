! function(){
	"use strict";

	/**
	 * fish.combogrid控件扩展
	 */
	$.widget('ui.combogrid',$.ui.combogrid,{
		//修改：让value设置值的判定不再局限于字符串，放宽全等限制
        value: function(){
            var that = this;
            if(arguments[0]){
                var val = arguments[0];
                var data = this.gridContainer.grid("getGridParam").data;
                if(!_.isArray(val)){
                    var valIndex = fish.findIndex(data, function(data){
                        return data[that.dataValueField] == val;
                    });
                    this.gridContainer.grid("setSelection", data[valIndex]);
                    //调整赋值模式：如果没有在grid的data内找到值，那检查传来的值是否对象，如果是，则把这个对象作为新值
                    if(data[valIndex]){
                    	this._value = data[valIndex];
                    }else if(_.isObject(val) && val[that.dataValueField]){
                    	this._value = val;
                    }
                    this._setTextByValue();
                } else if(_.isArray(val) && this.options.gridOpt.multiselect){
                    this.gridContainer.grid("setAllCheckRows", false);
                    this.gridContainer.grid("setCheckRows", val, true);
                    this._value = fish.filter(data, function(item){
                        return fish.indexOf(val, item[that.dataValueField]) !== -1;
                    })
                    this._setTextByValue();
                }
            } else {
                if($.isArray(this._value)) {
                    return this.options.dataValueField ? $.map(this._value, function(val){
                        return val[that.dataValueField];
                    }): this._value;
                } else {
                    return this._value && this.options.dataValueField ? this._value[this.dataValueField] : this._value;
                }
            }
        },
	});
}();

/**
 * combo.js扩展，用于combotree、combogrid的容器通用扩展
 */
!function(){
	"use strict";
	function onBodyDown(e) {
        if (this.$content.is(e.target) || $.contains(this.$content[0], e.target) || $.contains(this.$container[0], e.target)) {
            return;
        }
        this.hide();
    };
	
	$.combo.prototype.create = function() {
		var p = this.options;
		if(!p.width || p.width == "auto"){
	        this.$content.css('width', this.$container.outerWidth());
		}else{
			this.$content.css('width', p.width);
		}
		$("body").append(this.$content);
	    this.$content.hide();
    };
    
    $.combo.prototype.show = function() {
        this.$content.show();
        this.$content.position({
            my: "left top",
            at: "left bottom",
            of: this.$container,
            collision: "fit flip"
        });
        var p = this.options;
		if(!p.width || p.width == "auto"){
			this.$content.css('width', this.$container.outerWidth());
		}else{
			this.$content.css('width', p.width);
		}
        $("body").on("mousedown", $.proxy(onBodyDown, this));
    };
}();
!function(){
	$.widget('ui.datetimepicker',$.ui.datetimepicker,{
        _create: function () {
        	this._super();
        	 this.options.orientation = {x: 'auto', y: 'bottom'};
        }
	});
}();
/**
 * 列表式表单控件
 * $().listform();
 * 通过数组数据自动生成对应的表单列表结构
 */
!function(){
	'use strict';
	
	$.widget('ui.listform',{
		datalist: [],//内部用于存储原始数据的数组
		formlist: [],//内部用于存储form的JQ对象引用数组
		options:{
			templates: '',//表单的模版，至少得是一个内部存在form的DOM对象
			selector:'',//表单模板的选择器，传这个的话可以让页面里已经存在的一个DOM成为模板，但templates配置优先
			data:[], //默认数据项
			firsthide:[],//选择器数组，用于处理第一个表单里需要隐藏该数组内指定的元素，之后的表单都显示
			firstshow:[],//选择器数组，用于处理第一个表单里需要显示该数组内指定的元素，之后的表单都隐藏
			forminit: $.noop, //每个单独的表单渲染后，执行的回调函数
			alwaysshow: false//是否必定显示至少一个，即使没有任何数据
		},
		_init:function(){
			var options = this.options;
			if(!options.selector && !options.templates){
				console.error('ListForm未能初始化，请检查配置！');
			}else{
				if(options.selector && !options.templates){
					options.templates = $(options.selector).html();
				}
				this.reloadData(options.data)
			}
		},
		reloadData: function(data){
			if($.isArray(data)){
				this.datalist = data;
			}
			
			this._reloadData();
		},
		_reloadData: function(){
			var ts = this;
			var data = ts.datalist;
			this.cleanData();
			var $template = $(ts.options.templates);
			if(data.length == 0 && ts.options.alwaysshow){
				ts.element.append($template);
			}
			
			for(var i=0;i<data.length;i++){
				var item = data[i];
				ts.addForm(item);
			}
		},
		cleanData: function(){
			if(this.formlist.length > 0){
				_.each(this.formlist,function($form){
					$form.find('form').form('destroy');
				});
				this.formlist = [];
			}
			this.datalist = [];
			this.element.html('');//清理
		},
		addForm: function(item){
			item = item || {};
			
			var ts = this;
			var i = ts.formlist.length;
			var $template = $(ts.options.templates);
			this.element.append($template);
			
			if($.isFunction(ts.options.forminit)){
				//执行初始化回调函数
				var func = fish.bind(ts.options.forminit,$template);
				func();
			}
			
			//处理首个隐藏及显示配置
			if(i == 0){
				if(ts.options.firsthide.length > 0){
					_.each(ts.options.firsthide,function(selector){
						$template.find(selector).hide();
					});
				}
				
				if(ts.options.firstshow.length > 0){
					_.each(ts.options.firsthide,function(selector){
						$template.find(selector).show();
					});
				}
			}else{
				if(ts.options.firstshow.length > 0){
					_.each(ts.options.firsthide,function(selector){
						$template.find(selector).hide();
					});
				}
			}
			
			//对插入的dom的form标签都执行form初始化
			$template.find('form').each(function(index){
				$(this).form();
				if(_.isArguments(item)){
					$(this).form('value',item);
				}
			});
			ts.formlist.push($template);//把这个JQ对象放到缓存里
		},
		value: function(data){
			if(data){
				this.reloadData(data);
			}else{
				var result = [];
				if(this.formlist.length > 0){
					_.each(this.formlist,function($form){
						var item = {};
						$form.find('form').each(function(){
							$.extend(item,$(this).form('value'));
						});
						result.push(item);
					});
					return result;
				}
			}
		}
	});
}();
! function(){
	"use strict";

	/**
	 * fish.grid控件扩展
	 */
	$.widget('ui.grid',$.ui.grid,{
		/**
		 * 覆盖原始的加载数据方法，让datatype由实际传入数据的瞬间决定
		 * 如果传参时数据是数组，则认为是local，如果不是数组，则认为是json
		 */
		reloadData: function(newData) {
            if (newData) {
                var dtype = $.isArray(newData)?"local":"json";
                $(this.element).grid("setGridParam", {
                    "datatype": dtype
                });
            }
            this._super(newData);
        },        
        /**
         * 覆盖初始化方法，让grid支持url配置项
         */
        _init:function(){
        	var ts = this;
        	if (ts.options.url && typeof ts.options.url === "string"){
        		ts.options.datatype = "json";
        		if(!ts.options.param){
        			ts.options.param = {};//用于服务器请求的参数
        		}
        		//如果是字符串，则认为是新加入的AJAX调用
        		var str_arr = ts.options.url.split(".");
        		var classname = str_arr[0];
        		var method = str_arr[1];
        		ts.options.pageData = (function(){
        			return function(page, rowNum, sortname, sortorder){
        				var p_param = $.extend({},ts.options.param);
                		
        				// zzz: 增加搜索参数
        				var searchText = ts.element.find('[data-ui-role="searchbar"] input').val();
        				ts.options.colModel.forEach(function (col) {
        					if (col.search) {
        						p_param[col.name] = searchText;
        					}
        				});

        				p_param.page = page;
                		p_param.rowNum = rowNum;
                		fish.callService(classname,method,p_param,function(reply){
    			        	if(reply){
    			        		ts.reloadData(reply);
    			        	}
                		});
                		
                		return false;
        			};
        		})();	
        	}
        	
        	ts._super();
        	
            //执行完原有初始化方法以后加载第一页
            if(ts.options.pageData){
            	$(this.element).grid("populatePage");
            }
        },
        //提供跳转到指定页面方法
        //type为local时可能会导致异常，待考
        toPage: function(page){
            $(this.element).grid("setGridParam", {
                "page": page
            });
            $(this.element).grid("populatePage");
        }
	});
}();
/**
 * 超级搜索下拉树组件 
 * 展示搜索结果；对于不存在树上的节点，进行加载；
 * 加载完毕以后对于指定的节点，使用树的selectNode方法选择对应节点，并触发滚动。
 */
!function(){
	'use strict';
	
	var searchtemplate = '<div class="form-group col-md-12">\n\t\t\t<div class="input-group">\n\t\t\t\t<span class="input-group-addon">\n\t\t\t\t\t<i class="search-icon iconfont icon-search"></i>\n\t\t\t\t</span>\n\t\t\t\t<input type="text" class="form-control hyperselect-search" placeholder="搜索内容">\n\t\t\t</div><ul class="dropdown-list ui-multiselect-results" style="width:100%;max-height:190px;position:relative;border:0;display:none;"></ul>\n\t\t</div>';
	
	$.widget('ui.hypercombotree',$.ui.combotree,{
		options:{
			loadmode: 'all',//加载模式，all的话定位到指定节点会打开所有向上结构的节点，否则为仅父节点路径（残缺树）
			loader: $.noop,//当搜索到的节点不存在于树上时，获得路径的方法，要求返回从根节点开始到达所指定节点的完整节点数组，数组内的节点顺序要按层级对应
			search: $.noop,//通过搜索框输入时，查询的检测方法，返回所查询到节点的数组。无论结果的多寡，请返回数组，数据格式需与tree的格式一致
			searchtag: "" //展示搜索结果时，浮动显示在右侧的说明信息，配置为字符串时取该节点同名属性，配置为函数时为函数的执行返回值（函数接受节点数据作为参数）
			//async：在结合树插件扩展模式下，async只需要配置url和参数项，contentType和datatype由内置封装完成
		},
		_cpLock: false,  //输入框变量，用来对中文输入法输入做优化
		_inputval: null,
		_create:function(){
			//重载：添加搜索框
			var p = this.options;
			var ts = this;			
			ts._super();
			var $template = $(searchtemplate);
			ts.$dropdown = $template.find('.dropdown-list');//检索结果的显示区域
			ts.treeContainer.css("max-height","165px");//FIXME:为固定搜索框让树的部分定义了最大高度的绝对值，不知是否合适
			//输入判断用函数
			var inputfunc = function(inputval){
				if(!inputval){
					ts._hideDropdown(true);
					return ;
				}
				var result = p.search(inputval);
				var treeOption = ts.treeContainer.tree('option');
				var keyname = treeOption.data.key.name;
				if(_.isArray(result) && result.length > 0){
					//如果查询处理方法返回的结果是一个数组，则对每个结果都进行
					ts._showDropdown(result);
				}else{
					if(p.search == $.noop){
						//没有结果，并且搜索函数没有定义时，直接在当前树上已经有的节点里寻找
						var nodelist = ts.treeContainer.tree('getNodesByParamFuzzy',keyname,inputval);
						ts._showDropdown(nodelist);
					}
				}
			};
			
			//采用新的事件来优化中文输入
			$template.find('input').on('compositionstart',function(){
				//输入法开始输入事件，上锁避免input事件错误响应
				//console.log("com start");
				ts._cpLock = true;
			});
			$template.find('input').on('compositionend',function(){
				ts._cpLock = false;
				//compositionend比input后触发，解锁后这里需要也进行一次输入判断
				//console.log("com end");
				var inputval = $(this).val();
				inputfunc(inputval);
			});
			$template.find('input').on('input',function(e){
				//搜索输入框查询事件
				if(ts._cpLock){
					return false;
				}
				//console.log("input");
				var inputval = $(this).val();
				inputfunc(inputval);
			});
			this.comboTree.$content.prepend($template);

		},
		_showDropdown: function(data,notclean){
			//展示查询结果的框
			var ts = this;
			var treeOption = ts.treeContainer.tree('option');
			var keyname = treeOption.data.key.name;
			
			if(!notclean){
				ts._clearDropdown();
			}
			
			if(_.isArray(data) && data.length > 0){
				_.each(data,function(item){
					item[keyname] = item[keyname]?item[keyname]:"无节点名称";
					//TODO:目前搜索框的形式仅显示名字，考虑提供配置功能
					var taghtml = '<span style="float:right;">';
					if(ts.options.searchtag){
						if(typeof ts.options.searchtag === "string"){
							//字符串的话，则认为是直接取节点的对应名属性作为标签
							taghtml += item[ts.options.searchtag];
						}
						
						if($.isFunction(ts.options.searchtag)){
							//函数的话，则是这个函数执行后的返回值，这个函数传入所选节点
							taghtml += ts.options.searchtag(item);
						}
					}
					taghtml += "</span>";
					var $li = $("<li>"+item[keyname]+taghtml+"</li>");
					$li.data('node',item);
					ts.$dropdown.append($li);
				});
				ts.$dropdown.find('li').click(function(){
					//下拉框选项里的点击事件
					
					//用一种改动比较小的方法实现单双击判断
					//单击时，只将标记置为start，开始300ms的timeout再次点击
					//300ms的timeout时，先将标记位置为single再触发点击，这时当作单击
					//如果用户在300ms里再次进行点击（这时标记位还是start），则视为双击
					var timeout_str = $(this).data('timeout');
					var double_click = false;
					if(!timeout_str){
						$(this).data('timeout',"start");
						var li = $(this);
						setTimeout(function(){
							if(li.data('timeout') == "start"){
								li.data('timeout',"single");
								li.click();
							}
						},300);
						return false;
					}else{
						if(timeout_str == "start"){
							//双击判定
							double_click = true;
						}else{
							//单击判定，这时肯定是single了
						}
						$(this).data('timeout',"");
					}
					//下方相当于通用判定
					
					var item = $(this).data('node');
					//先寻找树上是否有对应节点
					var sltnode = ts.treeContainer.tree('getNodeByParam',keyname,item[keyname]);
					if(!sltnode){
						//如果指定的节点并不在树上存在，则应当进行重新加载
						var loadpath = ts.options.loader(item);
						ts.loadpath = loadpath;
						//loadpath（loader的返回结果）应当是从树上第一层节点开始（如果有根节点，包括根节点），依序向下的节点数组（可以不包括目标节点）
						if($.isArray(loadpath) && loadpath.length > 0) 
						{
							var firstnode = ts.treeContainer.tree('getNodeByParam',keyname,loadpath[0][keyname]);
							if(firstnode){
								loadpath.shift();//移除第一个元素（firstnode）
								//第一个节点应当是已经在树上存在的，否则无处可挂加载的信息
								if(ts.options.loadmode == "all"){
										//因为这个功能仅用于异步，所以完全加载功能是代替用户操作展开节点
										ts.treeContainer.tree('asyncPath',loadpath,firstnode,item);
										//直接return，等待处理完成
										return;
								}else{
									//部分加载模式，获取到的节点列表即为需要进行加载的节点
									var hastarget = false; //loadpath是否包括所选择的节点
									while(loadpath.length > 0){
										var node = loadpath.shift();
										if(!node){
											break;
										}
										
										if(node[keyname] == item[keyname]){
											hastarget = true;
										}
											if(!ts.treeContainer.tree('getNodeByParam',keyname,node[keyname])){
												//有可能路径上的部分节点已经在树上存在，在这种情况下已经存在的节点不应该新增
												//不存在的话，才新增这个节点
												firstnode.zAsync = true;//因为这种做法为“残缺树”，所以关闭其原来的异步加载，下同
												ts.treeContainer.tree('addNodes',firstnode,node);
											}
											firstnode = ts.treeContainer.tree('getNodeByParam',keyname,node[keyname]);
									}
									
									if(!hastarget && ts.options.loadmode != "all"){
										//如果loadpath里没有所选节点，那么自己补上去
										firstnode.zAsync = true;
										var s = ts.treeContainer.tree('addNodes',firstnode,item);
									}
								}
								//加载完毕，再次查找一次树上的节点
								sltnode = ts.treeContainer.tree('getNodeByParam',keyname,item[keyname]);
							}else{
								console.error("在树上加载指定节点时找不到首个节点！请检查配置及loader加载方法！");
							}
						}
						
						if(!sltnode){
							//如果还是找不到指定节点，则结束这个处理
							console.error("无法在树上加载指定节点！请检查配置及loader加载方法！");
							return;
						}
					}
					//选择找到的指定节点
					ts.treeContainer.tree('selectNode',sltnode);
					//在这进行滚动
					var li_id = sltnode.tId;//使用节点ID来寻找对应的li元素
					var li_dom = ts.treeContainer.find("#"+li_id);
					//查找最顶层的li
					while(li_dom && !li_dom.parent("ul").attr("data-ui-role")){
						li_dom = li_dom.parent("ul").parent("li");
					}
					//将选中的项目滚动到成为第一项的位置
					ts.treeContainer.scrollTop(li_dom.position().top);
					if(double_click){
						//如果是双击，那么就勾选它
						ts.treeContainer.find("#"+li_id+"_check").click();
						ts.comboTree.$content.find("input").val("");
						ts._clearDropdown();
					}
					//处理完毕，隐藏搜索结果列表?
					//ts._hideDropdown();
				});
			}
			
			ts.$dropdown.show();
		},
		_hideDropdown: function(ifclean){
			var ts = this;
			if(ifclean){
				ts._clearDropdown();
			}
			ts.$dropdown.hide();
		},
		_clearDropdown: function(){
			//清理用于展示下拉列表的ul
			var ts = this;
			ts.$dropdown.empty();
		}
	});
}();
/**
 * 超级多选，预定支持级联查询、分组收缩、服务端远程请求、自定义查询方法等功能
 * 
 */
!function(){
	'use strict';
	
    var template = '\n    <div>\n    <ul class="ui-multiselect-choices">\n        <li class="search-field">\n            <input type="text" autocomplete="off"/>\n        </li>\n    </ul>\n    </div>';
    var menutemplate = '<div class="dropdown-list">\n\t\t<div class="form-group col-md-12">\n\t\t\t<div class="input-group">\n\t\t\t\t<span class="input-group-addon">\n\t\t\t\t\t<i class="search-icon iconfont icon-search"></i>\n\t\t\t\t</span>\n\t\t\t\t<input type="text" class="form-control hyperselect-search" placeholder="搜索内容">\n\t\t\t</div>\n\t\t</div>\n\t\t<ul class="dropdown-list ui-multiselect-results" style="width:100%;max-height:190px;position:relative;border:0"></ul>\n\t\t\n\t</div>';
   
	//var menutemplate = '<ul class="dropdown-list ui-multiselect-results"></ul>';

	$.widget("ui.hypermultiselect", $.ui.multiselect, {
		options:{
			catalog_data: [],//目录数据
			element_data: [],//元素数据
			children: 'children',//目录结构里，子节点数据的名称
			getCatalog: $.noop,//从服务端获取目录的方法
			getElement: $.noop,//从目录获取元素的方法，如果配置了getCatalog，则必须配置
		},
		_init: function(){
			this._super();
		},
		_setUpHtml: function () {
			//重新构建模板
            var _classes, _props, options = this.options;
            _classes = ["ui-multiselect-container"];
            if (options.inheritClasses && this.element[0].className) {
                _classes.push(this.element[0].className);
            }
            _props = {
                'class': _classes.join(' '),
                'title': this.element[0].title
            };
            if (this.element[0].id) {
                _props.id = this.element[0].id.replace(/[^\w]/g, '_') + "_multi";
            }
            this.container = $(template).attr(_props);
            this.element.hide().after(this.container);
            this.$ul = this.container.find('.ui-multiselect-choices').first();
            this.$li = this.container.find('li.search-field').first();
            this.$input = this.container.find('input').first().val(options.placeholder);
            this.$menu = $(menutemplate);

            options.dataSource && options.dataSource.length && this._setDataSource(options.dataSource); //支持初始化dataSource属性

            this._menuBuild();
            this._setTabIndex();
            this._setLabelBehavior();
		},
		_search: function (val) {
			//增加判断，避免搜索框内部数据出现undefined
        	if(!val){
        		val = "";
        	}
        	return this._super(val);
        },
        _updateMenu: function (content) {
        	//让菜单绘制不会覆盖搜索框
            return this.$menu.find('ul.dropdown-list').html(content);
        },
        _delegateEvent: function () {
        	//在这里移除了原来对输入框的事件输入、按键事件
            var that = this;
            //div 容器
            this._on(this.container, {
                'click': '_open',
                'mouseenter': function (evt) {
                    that._mouseOn = true;
                },
                'mouseleave': function (evt) {
                    that._mouseOn = false;
                }
            });

            // 下拉选项框
            this._on(this.$menu, {
                'mouseup': 'menuMouseup',//IMPORTANTCE!!!,通过mouseup事件，检测选中li
                'mouseenter': function (evt) {
                    that._mouseOn = true;
                },
                'mouseleave': function (evt) {
                    that._mouseOn = false;
                }
                //'mouseover': 'menuMouseover',
                //'mouseout': 'menuMouseout',
                //'mousewheel': 'menuMousewheel'
            });
            
            //新搜索框事件
            this.$menu.on('input','.hyperselect-search',function(){
            	var func = fish.bind(that._oninput,that);
            	return func($(this).val());
            });
            this.$menu.on('keydown','.hyperselect-search',function(e){
            	var func = fish.bind(that._keydown,that);
            	return func(e);
            });

            //搜索框事件
            this._on(this.$input, {
                'blur': '_blur',
                //'input': '_oninput',
                //'keydown':'_keydown',
                'focus': '_focus',
                'cut': '_clipboard',
                'paste': '_clipboard'
            });

            this._on(this.$ul, {
                'click .close': function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (!that.is_disabled) {
                        return that._deleteMenu($(evt.currentTarget));
                    }
                }
            });
        },
        _oninput: function(val){
        	//下拉面板输入框方法
        	val = val || this.$input.val();
        	
        	this._searchFieldScale();
        	this.winnow_results(val);
        },
        results_show: function(val){
        	//重载：打开下拉菜单时清空输入框
        	this.$menu.find('.hyperselect-search').val('');
        	return this._super(val);
        },
        _keydown: function (evt) {
        	var KEY_CODE = $.ui.keyCode;
            var stroke, _ref1;
            stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
            this._searchFieldScale();
            if (stroke !== 8 && this.pending_backstroke) {
                this.clear_backstroke();
            }
            switch (stroke) {
                case KEY_CODE.BACKSPACE: //BACKSPACE
                	var $input = $(evt.target);
                    if (!$input.val() && this._choicesCount() > 0) {
                        //return this.keydown_backstroke();
                    } else if (!this.pending_backstroke) {
                        this._clearHighlightMenu();
                        return this._search($input.val().slice(0, -1));
                    }
                    break;
                case KEY_CODE.TAB: //TAB
                    this._tabHandler(evt);
                    break;
                case KEY_CODE.ENTER: //ENTER
                    evt.preventDefault();
                    if (this.results_showing) {
                        return this._selectMenu(evt);
                    }
                    break;
                case KEY_CODE.ESCAPE: //ESCAPE
                    if (this.results_showing) {
                        this.results_hide();
                    }
                    return true;
                case KEY_CODE.UP: //UP
                    evt.preventDefault();
                    this.keyup_arrow();
                    break;
                case KEY_CODE.DOWN: //DOWN
                    evt.preventDefault();
                    this.keydown_arrow();
                    break;
                default:
            }
        }
	});
}();
/**
 * 菜单导航控件
 * $().menunav(options);
 */
!function(){
	'use strict';
	
	$.widget('ui.bssmenunav',{
		options:{
			scrollThreshold:0.1,    //滚动检测阀值 0.1在浏览器窗口中间部位
            scrollSpeed:700,        //滚动到指定位置的动画时间
            scrollTopBorder:500,    //滚动条距离顶部多少的时候显示导航，如果为0，则一直显示
            easing: 'swing',        //不解释
            delayDetection:100,     //延时检测，避免滚动的时候检测过于频繁
            targetWin: 'window',   //滚动的窗口，默认为浏览器  _self:自己
            navwinArr: [],          //滚动窗口中的导航列表
            scrollChange:function(){} //滚动的时候回调函数
		},
		_init:function(){
			var options = this.options;
			if(!options.targetWin && !options.navwinArr){
				console.error('menunav cannot init！please check');
			}else{
				this.$win = options.targetWin === '_self' ? this.element : $(window);
		        this.$h = options.navwinArr;
		        this.$pageNavList = "";
		        this.$pageNavListLis ="";
		        this.$curTag = "";
		        this.$pageNavListLiH = "";
		        this.offArr = [];
		        this.curIndex = 0;
		        this.scrollIng = false;
		        this.scrollToBottom = false; //滚动是否到底
		        this._make();
		        this._setArr();
		        this._bindEvent();
			}
		},
		_make:function(){
        	this.$win.append('<div class="directory-nav" id="directoryNav"><ul></ul><span class="cur-tag"></span><span class="c-top"></span><span class="c-bottom"></span><span class="line"></span></div>');
            var $hs = this.$h,
                $directoryNav = $("#directoryNav"),
                temp = [],
                index1 = 0,
                index2 = 0;
            $hs.each(function(index){
                var $this = $(this),
                text = $this.attr("title");
                if($this.hasClass("first")){
                    index1++;
                    if(index1%2==0) index2 = 0;
                    temp.push('<li class="l1"><span class="c-dot"></span>'+index1+'. <a class="l1-text">'+text+'</a></li>');
                }else{
                    index2++;
                    temp.push('<li class="l2"><span class="sub-c-dot"></span>'+index1+'.'+index2+' <a class="l2-text">'+text+'</a></li>');

                }
            });
            $directoryNav.find("ul").html(temp.join(""));
            //设置变量
            this.$pageNavList = $directoryNav;
            this.$pageNavListLis = this.$pageNavList.find("li");
            this.$curTag = this.$pageNavList.find(".cur-tag");
            this.$pageNavListLiH = this.$pageNavListLis.eq(0).height();
            this.$pageNavList.show();
        },
        _setArr:function(){
            var This = this;
            this.$h.each(function(){
                var $this = $(this),
                    offT = Math.round($this.offset().top) - 112;
                This.offArr.push(offT);
            });
            this._ifPos(0);
        },
        _posTag:function(top){
            this.$curTag.css({top:top+'px'});
        },
        _ifPos:function(st){
            var offArr = this.offArr;
            //var windowHeight = Math.round(this.$win.height() * this.options.scrollThreshold);
            
            if(this.scrollToBottom){
            	if(this.curIndex > 0){
            		st = offArr[this.curIndex];
            	}else{
            		st = offArr[offArr.length-1];
            	}
            }
            
            for(var i=0;i<offArr.length;i++){
                if(offArr[i]<= st) {
                	this._scollToIndex(i);
                }
            }
            this.curIndex = 0;
        },
        _scollToIndex:function(index){
        	var $curLi = this.$pageNavListLis.eq(index),
            tagTop = $curLi.position().top;
        	$curLi.addClass("cur").siblings("li").removeClass("cur");
        	this._posTag(tagTop+this.$pageNavListLiH*0.5);
        	this.options.scrollChange.call(this);
        	this._trigger();
        },
        _bindEvent:function(){
            var This = this,
                show = false,
                timer = 0;
            
            this.$win.on("scroll",function(){
                var $this = $(this);
                clearTimeout(timer);
                timer = setTimeout(function(){
                    This.scrollIng = true;
                    //判断滚动条是否滚到底了
                    This.scrollToBottom = $this.scrollTop() + $this.height() + 10 >= $this[0].scrollHeight;
                    
                    if($this.scrollTop()>=This.options.scrollTopBorder){
                        This._ifPos( $this.scrollTop() );
                    }
                },This.options.delayDetection);
            });

            this.$pageNavList.on("click","li",function(){
                var $this = $(this),
                    index = $this.index();
                This.curIndex = index;
                
               if(This.scrollToBottom && This.$win.scrollTop() <= This.offArr[index]){
            	   This._scollToIndex(index);
               }else{
            	   This._scrollTo(This.offArr[index]); 
               }
                
            });
            
        },
        _scrollTo: function(offset,callback) {
            var This = this;
            this.$win.animate({
                scrollTop: offset
            }, this.options.scrollSpeed, this.options.easing, function(){
                This.scrollIng = false;
            });
        }
        
	});
}();
!function(){
	"use strict";
	
	$.widget("ui.tabs",$.ui.tabs,{
		options:{
			templateArr:["<li><a href='#{href}'><button type='button' class='ui-tabs-close close' role='button'><span aria-hidden='true' title='close'>&times;<span class='sr-only'>Close</span></span></button>#{label}</a></li>",
			             "<li><a href='#{href}'><button type='button' class='ui-tabs-close ui-tabs-main-close close' role='button'><span aria-hidden='true' title='close' class='iconfont icon-close'></span></button>#{label}</a></li>"]
		},
		_create: function() {
            var options = this.options;
            if (!options.style || !_.isFinite(options.style)) {
                options.style = 1;
            }
            //修改tab多处一栏后左右按钮的样式
            if (options.paging) {
                options.paging = {
                    nextButton: '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
                    prevButton: '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
                }
            }
            options.tabCanCloseTemplate = options.templateArr[parseInt(options.style, 10)];

            this._super();
        }
	});
}();
!function(){
	"use strict";
	
	//重载工具提示方法，用于显示手机号码分段（原则上可支持银行卡，如果需要的话）
	$.widget("ui.bsstooltip",$.ui.tooltip,{
		_create: function(){
			this.enabled = true;
			if(this.options.type && this.options.type == "mobile"){
				//如果有设置type项，那么就换一种处理方式
				//mobile：手机号码
				this.onUs = false;
				this.outTimeout = null;
				
                this._on({
                    'click': 'openHandler'
                });

                this._on($(document), {
                    'click': 'closeHandler'
                });
                this._on({
                	'input': '_setContentNoHide'
                });
		        this.options.title = function(){
		        	//自己实现一个工具提示函数
		        	var value = $(this).val();
		        	var result = ''+value;
		        	if(value.length > 3)
		        	{
		        		result = value.substring(0,3)+" ";
		        	}
		        	
		        	if(value.substring(3).length > 4){
		        		result += value.substring(3,7)+" "+value.substring(7);
		        	}else{
		        		result += value.substring(3);
		        	}
		        	
		        	return result;
		        };
		        this.fixTitle();
			}else{
				this._super();
			}
		},
		_setContentNoHide: function(){
            var $tip = this.tip();
            var title = this.getTitle();

            $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
            if(!this.options.fontsize){
            	this.options.fontsize = "20px";
            }
            $tip.css('font-size',this.options.fontsize);
            if(title){
            	this.show();
            }else{
            	this.hide();
            }
		}
	});
}();
! function(){
	"use strict";
	/**
	 * fish.tree控件扩展
	 */
	$.widget('ui.tree',$.ui.tree,{
		loadpath:null,
		_create:function(){
			var ts = this;
			var p = ts.options;
			if(!p.callback){
				p.callback = {};
			}
			var t = p.callback?p.callback.onAsyncSuccess:null;
			if(!t){
				t = $.noop;
			}
			var newcallback = function(event, treeId, treeNode, msg){
				if($.isArray(ts.loadpath)){
					//链式调用处理：
					var keyname = p.data.key.name;
					if(ts.loadpath.length > 0){
						var node = ts.loadpath.shift();
						var firstnode = ts.getNodeByParam(keyname,node[keyname]);
						ts.expandNode(firstnode,true);
					}else{
						//最后一次链式调用，选择最终节点，并且做清理工作
						var f = ts.getNodeByParam(keyname,ts.finalnode[keyname]);
						ts.selectNode(f);
						ts.pathcallback(f);//回调函数
						ts.loadpath = null;
						ts.finalnode = null;
						ts.pathcallback = null;
					}
				}
				
				t(event, treeId, treeNode, msg);
			};
			
			
			p.callback.onAsyncSuccess = newcallback;
			
			ts._super();
			if(p.async.enable && (!p.fNodes || p.fNodes.length == 0)){
				//修正：如果初始化的时候开启异步，并且没有配置初始节点，则自动化加载一轮
				ts._asyncNode(null,false,$.noop);
			}
			
			
		},
		asyncPath: function(loadpath,firstnode,finalnode,func){
			//调试：
			var ts = this;	
			if($.isArray(ts.loadpath)){
				//一次只接受一轮处理
				console.error("一个tree一次只能接受一轮链式展开！");
			}else{
				ts.loadpath = loadpath;
				ts.finalnode = finalnode;
				ts.pathcallback = func;
				//从第一个开始展开
				ts.expandNode(firstnode,true);
			}
		},
		_asyncNode: function(node, isSilent, callback) {
			var i, l;
			if (node && !node.isParent) {
				this._apply(callback);
				return false;
			} else if (node && node.isAjaxing) {
				return false;
			} else if (this._apply(this.p.callback.beforeAsync, [null, node], true) == false) {
				this._apply(callback);
				return false;
			}
			if (node) {
				node.isAjaxing = true;
				var icoObj = this.$(node, this.consts.id.ICON);
				icoObj.attr({
					"style": "",
					"class": this.consts.className.BUTTON + " " + this.consts.className.ICO_LOADING
				});
			}

			var tmpParam = {};
			for (i = 0, l = this.p.async.autoParam.length; node && i < l; i++) {
				var pKey = this.p.async.autoParam[i].split("="), spKey = pKey;
				if (pKey.length > 1) {
					spKey = pKey[1];
					pKey = pKey[0];
				}
				tmpParam[spKey] = node[pKey];
			}
			if (fish.isArray(this.p.async.otherParam)) {
				for (i = 0, l = this.p.async.otherParam.length; i < l; i += 2) {
					tmpParam[this.p.async.otherParam[i]] = this.p.async.otherParam[i + 1];
				}
			} else {
				for (var p in this.p.async.otherParam) {
					tmpParam[p] = this.p.async.otherParam[p];
				}
			}

			var _tmpV = this._getRoot()._ver;
			
			//URL转为采用我们封装好的形式
			var urlspilt = this.p.async.url.split(".");
			var ts = this;
			fish.callService(urlspilt[0],urlspilt[1],tmpParam,function(msg){
					if (_tmpV != ts._getRoot()._ver) {
						return;
					}
					var newNodes = [];
					try {
						if (!msg || msg.length == 0) {
							newNodes = [];
						//} else if (typeof msg == "string") { // do not eval string
						//	newNodes = eval("(" + msg + ")");
						} else {
							newNodes = msg;
						}
					} catch(err) {
						newNodes = msg;
					}

					if (node) {
						node.isAjaxing = null;
						node.zAsync = true;
					}
					ts._setNodeLineIcos(node);
										
					if (newNodes && newNodes !== "") {
						newNodes = ts._apply(ts.p.async.dataFilter, [node, newNodes], newNodes);
						ts._addNodes(node, newNodes ? $.tree.clone(newNodes) : [], !!isSilent);
					} else {
						ts._addNodes(node, [], !!isSilent);
					}
					ts._trigger(ts.consts.event.ASYNC_SUCCESS, [node, msg]);
					ts._apply(callback);
					ts._apply(ts.p.callback.onAsyncSuccess,[null,ts.treeId,node,msg]);
			},function(){
				if (_tmpV != ts._getRoot()._ver) {
					return;
				}
				if (node) node.isAjaxing = null;
				ts._setNodeLineIcos(node);
			});
//			$.ajax({
//				contentType: this.p.async.contentType,
//				type: this.p.async.type,
//				url: this._apply(this.p.async.url, [node], this.p.async.url),
//				data: tmpParam,
//				dataType: this.p.async.dataType,
//				success: (msg) => {
//
//				},
//				error: (XMLHttpRequest, textStatus, errorThrown) => {
//					if (_tmpV != this._getRoot()._ver) {
//						return;
//					}
//					if (node) node.isAjaxing = null;
//					this._setNodeLineIcos(node);
//					this._trigger(this.consts.event.ASYNC_ERROR, [node, XMLHttpRequest, textStatus, errorThrown]);
//				}
//			});
			return true;
		}
	});
}();