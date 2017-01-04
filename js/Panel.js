require(['handlebars','Dialog','base'],function(handlebars,Dialog){
	function Panel(){
		this.tpls = {
			alert:'<div class="alert"><h5>{{msg}}</h5>'+
				'<div class="btn-group">'+
				'<button class="btn js-yes">{{yesBtnText}}</button>'+
				'</div></div>'
		}
	}

	Panel.prototype = {
		alert: function(opt){
			var defaultOpt = {
				skin: "p-alert",
				title:  "alert",
				fixed: true,
				width: "auto",
				msg: "没有消息",
				yesBtnText: "确定",
				yesFun: null,
				onready: function(){
					var self = this;
					self.onclose = function(){self.remove();};
					$(".btn",self.node).one("click",function(e){
						e.preventDefault();
						opt && $.isFunction(opt.yesFun) && opt.yesFun(e);
						self.close();
					});

					//保持现有功能扩展
					opt && opt.ready && opt.ready();
				}

			};

			var dialogOpt = $.extend(defaultOpt, opt);
			if(!dialogOpt.content){
				dialogOpt.content = $.handlebars(this.tpls.alert, dialogOpt);
			}

			return Dialog(dialogOpt).showModal();
		},

		loading: function(opt){
			var defaultOpt = {
				skin: 'p-loading',
				fixed: true,
				height: "300px",
				width: '0px',
				content: '<div>'+
				'<img style="position:absolute;left:-150px;width:300px;height:300px" src="image/loading.gif"/>'+
				'</div>'
			};

			var dialogOpt = $.extend(defaultOpt, opt);

			return Dialog(defaultOpt).showModal();
		},

		create: Dialog
	};

	window.Panel = new Panel();

})