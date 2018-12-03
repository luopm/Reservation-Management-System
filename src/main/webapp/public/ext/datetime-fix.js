!function(){
	$.widget('ui.datetimepicker',$.ui.datetimepicker,{
        _create: function () {
        	this._super();
        	 this.options.orientation = {x: 'auto', y: 'bottom'};
        }
	});
}();