!function () {
    "use strict";

    var MENU_ITEM = '<li></li>',
        KEY_CODE = $.ui.keyCode;

    $.widget('ui.combobox', $.ui.formfield, {
        options: {
            /**
             * @cfg {String} text 选中文本内容
             */
            text: null,
            /**
             * @cfg {Object} value 选中值
             */
            value: null,
            /**
             * 控件大小,可选sm
             * @cfg {String} size=null
             * @since V3.8.0
             */
            size: null,
            /**
             * @cfg {String} [dataTextField='name'] 数据源显示字段
             */
            dataTextField: "name",
            /**
             * @cfg {String} [dataValueField='value'] 数据源取值字段
             */
            dataValueField: "value",
            /**
             * @cfg {Array} [dataSource=[]] 数据源，如果元素是`select`则取其`options`节点
             */
            dataSource: [],
            /**
             * @cfg {String} [placeholder=''] 提示信息
             */
            placeholder: "",
            /**
             * @cfg {Number} [rowCount=10000] 显示结果展示条数
             */
            rowCount: 10000,
            /**
             * @cfg {Number} [delay=300] 延迟搜索，避免过多无效搜索，单位毫秒ms，默认是300ms
             */
            delay: 300,
            /**
             * @cfg {Boolean} 此值为true时可以手动输入内容，为false时只能选择不能输入，默认为true。
             */
            editable: true,
            /**
             * @cfg {Boolean} [forceSelection=true] true:只能选择dataSource中的值（默认），false:可以接收用户输入的
             */
            forceSelection: true,

            /**
             * @cfg {Function/Boolean} [templateResult=false] 自定义输入框显示的内容, 当editable为false时生效
             * @since V3.4.0
             * <pre>
             *     $el.combobox('option', 'templateResult', function(value) {
             *          //value为选项的text
             *          return value;
             *     })
             * </pre>
             */
            templateResult: false,

            /**
             * @cfg {Boolean} [equalWidth=true] 下拉框和输入框是否等宽，设为false时，下拉框根据里面的内容决定宽度
             * @since V3.4.0
             */
            equalWidth: true

            /**
             * @cfg {Function} [close=null] 定义关闭下拉框选项事件函数，事件名称combobox:close
             */

            /**
             * @cfg {Function} [change=null] 定义改变下拉框值事件函数，事件名称combobox:change
             */

            /**
             * @cfg {Function} [open=null] 定义显示下拉框选项事件函数，事件名称combobox:open
             */
        },

        _create: function _create() {
            this.$container = $('<div>');

            this.element.hide().before(this.$container);

            if (this.element.is('select')) {
                this.options.dataSource = this._parseSelect(); //解析select原始值
            }

            this._selectedItem = null;

            this.$menu = $('<ul class="dropdown-list"></ul>');
            this.setEditable(this.options.editable);

            this._delaySearch = _.debounce(this.lookup, this.options.delay);

            // call formfield _create method
            this._super();
        },

        _init: function _init() {
            this.shown = false;

            // 处理dataTextField的值为非字符串的问题
            if (this.options.dataSource && this.options.dataSource.length) {
                var that = this;
                $.each(this.options.dataSource, function (i, item) {
                    item[that.options.dataTextField] += "";
                });
            }

            // 处理浏览器对select的默认行为
            if (!this.element.is('select') || this.element.find("option:selected").attr("selected")) {
                // issue 789
                this.value(this.options.value === null ? this.element.val() : this.options.value);
            } else {
                this._select(null);
            }
        },

        _validateHandler: function _validateHandler() {
            var that = this;

            this._on({
                'combobox:blur': function comboboxBlur() {
                    if (that._getValidFlag()) {
                        that.element.isValid();
                    }
                }
            });
        },

        _setOption: function _setOption(key, value) {
            this._super(key, value);

            if (key === 'disabled') {
                if (this.options.editable) {
                    this.$input.prop('disabled', value);
                    this.$button.attr('disabled', value);
                } else {
                    this.$container[value ? 'addClass' : 'removeClass']('disabled');
                }
            }
        },

        /**
         * 是否可以手动输入内容
         * @param {Boolean} editable 此值为true时可以手动输入内容，为false时只能选择不能输入，默认为true。
         */
        setEditable: function setEditable(editable) {
            editable = !!editable;
            this.options.editable = editable;
            if (editable) {
                var template = '<div class="input-group ' + (this.options.size ? 'input-group-' + this.options.size : '') + '">\n                                    <input type="text" class="form-control" autocomplete="off"/>\n                                    <span class="input-group-addon">\n                                        <span class="glyphicon glyphicon-triangle-bottom"></span>\n                                    </span>\n                                </div>';
            } else {
                template = '<div class="combobox-readonly ' + (this.options.size ? 'combobox-readonly-' + this.options.size : '') + ' form-control">\n                                <span class="combobox-text"></span>\n                                <span class="glyphicon glyphicon-triangle-bottom form-control-feedback"></span>\n                            </div>';
            }

            var prevContainer = this.$container;
            this.$container = $(template);
            prevContainer.replaceWith(this.$container);

            if (editable) {
                this.$input = this.$container.find('input');
                this.$button = this.$container.find('.input-group-addon');
                this.$input.clearinput();
            } else {
                this.$display = this.$container.find('.combobox-text');
                this.$placeholder = $('<span class="combobox-placeholder"></span>').html(this.options.placeholder);
                this.$display.html(this.$placeholder);
            }

            this._delegateEvent();
            this.transferAttributes();
            this._init();
            return this;
        },

        /**
         * @method text 取文本值或者赋文本值
         * @param  {String} [text] 设置文本值,为空则取文本值
         * @return {String} 文本值,赋值操作则没有返回值
         */
        text: function text(_text) {
            if (_text === undefined) {
                return this._text();
            } else {
                this._text(_text);
            }
        },

        _text: function _text(text) {
            if (text === undefined) {
                if (this.options.editable) {
                    return this.$input.val();
                } else {
                    return this.selected ? this.getSelectedItem()[this.options.dataTextField] : '';
                }
            } else {
                if (this.options.editable) {
                    this.$input.val(text);
                } else {
                    if (text === '') {
                        this.$display.html(this.$placeholder);
                    } else {
                        var templateResult = this.options.templateResult;
                        var resultText = templateResult ? templateResult(text) : text;
                        this.$display.html(resultText);
                    }
                }
            }
        },

        /**
         * @method value 取值或者赋值
         * @param  {String} [value] 设置值选中,为空则取控件值
         * @return {String} 控件值,赋值操作则没有返回值
         */
        value: function value(_value) {
            var options = this.options,
                that = this,
                target;
            if (fish.isUndefined(_value)) {
                if (this._selectedItem) {
                    return this._selectedItem[options.dataValueField];
                } else {
                    target = _.find(options.dataSource, function (item) {
                        if (item[options.dataTextField] == that.element.val()) {
                            return true;
                        }
                    });
                    if (!options.forceSelection) {
                        return target ? target[options.dataValueField] : this.element.val();
                    } else {
                        return null;
                    }
                }
            } else {
                target = _.find(options.dataSource, function (item) {
                    if (item[options.dataValueField] == _value) {
                        return true;
                    }
                });

                //#551
                if (target) {
                    this._select(target);
                } else if (!options.forceSelection) {
                    this._selectedItem = null;
                    this._setElementValue(_value);
                    this._text(_value);
                } else {
                    this._selectedItem = null;
                    this._setElementValue('');
                    this._text('');
                }
            }
        },

        /**
         * @method getSelectedItem 获取选中项的对象
         * @since V3.2.0
         */
        getSelectedItem: function getSelectedItem() {
            if (this.options.dataSource) {
                return this._selectedItem || null;
            } else {
                return { name: this.text(), value: this.value() };
            }
        },

        /**
         * @method clear 清空选择内容
         */
        clear: function clear() {
            this._select(null);
        },

        _destroy: function _destroy() {
            this.$menu.remove();
            this.element.prev().remove();
            this.element.parent().removeClass('has-prompt').removeClass('has-feedback');
            this.element.show();
        },

        _parseSelect: function _parseSelect() {
            var that = this,
                source = [],
                item,
                option;

            this.element.children().each(function () {
                option = $(this);
                item = {};
                item[that.options.dataTextField] = option.text();
                item[that.options.dataValueField] = option.val();
                source.push(item);
            });
            return source;
        },
        transferAttributes: function transferAttributes() {
            this.options.placeholder = this.options.placeholder || this.element.attr('data-placeholder') || this.element.attr('placeholder');
            this.options.editable && this.$input.attr('placeholder', this.options.placeholder);
            this.element.removeAttr('tabindex');
            if (this.element.attr('disabled') !== undefined) {
                this.disable();
            }
        },

        _setDataSource: function _setDataSource(dataSource) {
            this.options.dataSource = dataSource;
        },

        _scrollableParents: function _scrollableParents() {
            return this.element.parentsUntil('body').filter(function (index, el) {
                return el.scrollHeight > el.clientHeight;
            });
        },

        show: function show() {
            if (!this.shown) {
                if (this.options.equalWidth) {
                    this.$menu.css('width', this.$container.outerWidth());
                } else {
                    this.$menu.css('width', 'auto');
                }
                $('body').append(this.$menu);

                this._on($(document), {
                    'mousedown': $.proxy(function (e) {
                        //#517 排除自己
                        if (this.$menu.is(e.target) || $.contains(this.$menu[0], e.target) || $.contains(this.$container[0], e.target)) {
                            return;
                        }
                        this.hide();
                    }, this)
                });

                // add iframe click resolve
                this._on($(window), {
                    blur: 'hide'
                });
                this._on(this._scrollableParents(), {
                    'scroll': $.proxy(function () {
                        if (this.shown) {
                            this.hide();
                        }
                    }, this)
                });

                this.shown = true;
                this._trigger('open');
            }

            this.$menu.position({
                my: "left top",
                at: "left bottom",
                of: this.$container,
                collision: "fit flip"
            });
        },

        hide: function hide() {
            this._off($(document));
            this._off($(window));
            this._off(this._scrollableParents(), "scroll");

            this.$menu.detach();
            this.shown = false;
            this._trigger('close');
        },

        lookup: function lookup(query) {
            var that = this,
                items = $.grep(this.options.dataSource, function (item) {
                return that.matcher(item, query);
            });

            items = this.sorter(items, query);

            if (!items.length) {
                //没有匹配项
                //#551
                if (!this.options.forceSelection) {
                    this._setSelected(true);
                    this._setElementValue(this._text());
                }
                return this.shown ? this.hide() : this;
            }

            // 有匹配项
            if (!this.options.forceSelection) {
                this._setElementValue(this._text()); //#551,最终被选中项覆盖
            }

            return this.render(items.slice(0, parseInt(this.options.rowCount, 10)), query).show();
        },

        matcher: function matcher(item, query) {
            return ~item[this.options.dataTextField].toLowerCase().indexOf(query.toLowerCase()); //转换成数字0 以及非0
        },

        sorter: function sorter(items, query) {
            var beginswith = [],
                caseSensitive = [],
                caseInsensitive = [],
                that = this;

            _.forEach(items, function (item) {
                if (!item[that.options.dataTextField].toLowerCase().indexOf(query.toLowerCase())) {
                    beginswith.push(item);
                } else if (~item[that.options.dataTextField].indexOf(query)) {
                    caseSensitive.push(item);
                } else {
                    caseInsensitive.push(item);
                }
            });

            return beginswith.concat(caseSensitive, caseInsensitive);
        },

        /*
         * 高亮显示
         * @param item
         */
        highlighter: function highlighter(item, query) {
            query = query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>';
            });
        },

        render: function render(items, query) {
            var that = this;

            items = $(items).map(function (i, item) {
                i = $(MENU_ITEM).data('value', item).attr('title', item[that.options.dataTextField]);
                i.html(that.highlighter(item[that.options.dataTextField], query));
                return i[0];
            });

            items.first().addClass('active');
            this.$menu.html(items);
            return this;
        },

        next: function next(event) {
            var active = this.$menu.find('.active').removeClass('active'),
                next = active.next();

            if (!next.length) {
                next = $(this.$menu.find('li')[0]);
            }

            next.addClass('active');
            this._scroll(next);
        },

        prev: function prev(event) {
            var active = this.$menu.find('.active').removeClass('active'),
                prev = active.prev();

            if (!prev.length) {
                prev = this.$menu.find('li').last();
            }

            prev.addClass('active');
            this._scroll(prev);
        },

        reset: function reset() {
            if (this.options.disabled) {
                return;
            }

            if (this.selected) {
                this.clearTarget();
                this.clearElement();
                this._triggerChange();
            } else {
                if (this.shown) {
                    this.hide();
                } else {
                    this.clearElement();
                }
            }
        },

        clearElement: function clearElement() {
            this._text('');
            this.options.editable && this.$input.focus();
        },
        clearTarget: function clearTarget() {
            this.element.val('');
            this._setSelected(false);
        },

        _setSelected: function _setSelected(selected) {
            this.selected = selected;
        },

        _delegateEvent: function _delegateEvent() {
            if (this.options.editable) {
                this._off(this.$container, 'click');
                this._on(this.$container, {
                    'click .input-group-addon': '_onButtonToggle',
                    'mousedown .form-clear-input': 'clear'
                });

                var events = {
                    'blur': '_onBlur',
                    'keydown': '_onKeyDown'
                };
                if (!(fish.browser.msie && fish.browser.version < 9)) {
                    events['input'] = '_onInput';
                }
                this._on(this.$input, events);
            } else {
                this.$input && this._off(this.$input);
                this._on(this.$container, {
                    'click': '_onButtonToggle'
                });
            }

            this._off(this.$menu);
            this._on(this.$menu, {
                'click li': '_onMenuClick',
                'mouseenter li': '_onMenuMouseEnter'
            });
        },

        _onBlur: function _onBlur(e) {
            // when no selected then clear the input value
            if (this.options.forceSelection === true && !this.selected) {
                if (this._selectedItem) {
                    this._triggerChange();
                    this._select(null);
                }
                this.$input.data('ui-clearinput')._clearField();
            }

            //input离开的时候,触发combobox:blur供检验用
            this._trigger('blur');
        },

        _onKeyDown: function _onKeyDown(e) {
            switch (e.keyCode) {
                case KEY_CODE.LEFT:
                case KEY_CODE.RIGHT:
                case KEY_CODE.HOME:
                case KEY_CODE.END:
                    break;

                case KEY_CODE.TAB:
                case KEY_CODE.ENTER:
                    if (this.shown) {
                        e.preventDefault();
                        this._onMenuSelect();
                    }
                    break;

                case KEY_CODE.ESCAPE:
                    if (this.shown) {
                        e.stopPropagation();
                        this.hide();
                    }
                    break;

                //#551
                case KEY_CODE.BACKSPACE:
                    this._delaySearch(this._text().slice(0, -1));
                    break;
                case KEY_CODE.DELETE:
                    this.options.forceSelection && this.value() && this.clear();
                    break;

                case KEY_CODE.UP:
                    this.shown && this.prev();
                    break;

                case KEY_CODE.DOWN:
                    this.shown && this.next();
                    break;

                default:
                    this.clearTarget();

                    this._delaySearch(this._text() + e.key);
            }
        },

        _onInput: function _onInput() {
            this._delaySearch(this.$input.val());
        },

        _onMenuClick: function _onMenuClick(e) {
            e.stopPropagation();
            this._onMenuSelect();
            this.options.editable && this.$input.focus();
        },

        _onMenuMouseEnter: function _onMenuMouseEnter(e) {
            this.$menu.find('.active').removeClass('active');
            $(e.currentTarget).addClass('active');
        },

        _onButtonToggle: function _onButtonToggle(e) {
            if (this.options.disabled) {
                return;
            }

            if (this.shown) {
                this.hide();
            } else {
                this.lookup(this.options.editable && !this.selected ? this._text() : '');
            }
        },

        _onMenuSelect: function _onMenuSelect() {
            var item = this.$menu.find('.active').data('value');
            this._select(item);
            this.hide();
        },
        //与_select的区别在于old == item.value;form会优先执行reset,clear,setvalue操作
        _onFormReset: function _onFormReset() {
            if (!this.element.is('select') || this.element.find("option:selected").attr("selected")) {
                this.value(this.options.value === null ? this.element.val() : this.options.value);
            } else {
                this._select(null);
            }
        },
        _onFormClear: function _onFormClear() {
            this._select(null);
        },
        _formSetValue: function _formSetValue(value) {
            this.value(value);
        },
        _formGetValue: function _formGetValue() {
            return this.value();
        },

        _select: function _select(item) {
            var options = this.options,
                old = this.element.val();

            if (item) {
                this._setSelected(true);
                this._selectedItem = item;
                this._text(item[options.dataTextField]);

                if (item[options.dataValueField] !== old) {
                    this.element.val(item[options.dataValueField]);
                    this._triggerChange();
                }
            } else {
                this._setSelected(false);
                this._text('');
                this._selectedItem = null;

                if (old) {
                    this.element.val('');
                    this._triggerChange();
                }
            }
        },

        _triggerChange: function _triggerChange() {
            this._trigger('change');
        },

        // element赋值和change事件必须在一起
        _setElementValue: function _setElementValue(value) {
            var prevVal = this.element.val();
            this.element.val(value);
            if (prevVal !== value) {
                this._triggerChange();
            }
        },

        _scroll: function _scroll($li) {
            var scrollTop = this.$menu.scrollTop(),
                itemOffsetTop = $li.position().top + scrollTop,
                itemHeight = $li.outerHeight(),
                itemDistance = itemOffsetTop + itemHeight,
                height = this.$menu.height();

            this.$menu.scrollTop(itemOffsetTop < scrollTop ? itemOffsetTop : itemDistance > scrollTop + height ? itemDistance - height : scrollTop);
        },

        hideWidget: function hideWidget() {
            this.hide();
            this.element.prev().hide();
        },

        showWidget: function showWidget() {
            this.element.prev().show();
        },

        /**
         * @method focus combobox的输入框获取焦点
         * @since V3.7.0
         */
        focus: function focus() {
            this.$input.focus();
        }

    });
}();