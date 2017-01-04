/*!
 * desc  ：wenda.artdialog
 * author：WD(wangwenqing@360.cn)
 * date  ：2014-05-19
 */
(function(root, factory) {
    if(typeof exports === 'object') {
         module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define(['lib/dialog/dialog'], factory);
        /*
        说明：
        1. 不要给模块具名；
        2. 可以定义依赖，但是必须使用这种完整路径：
        define(['module/MODULE_B/1.0/b'], factory);
        */
    } else {
        /* 没有加载器时，导出到 root（浏览器中，root 即 window） 下 */
        root['artDialog'] = factory();
    }
})(this, function(artDialog) {

    //如果不存在直接返回
    if(!'artDialog' in window || !'Popup' in window) return {};

    //自定义配置
    $.extend(artDialog.defaults,{

        // 取消按钮文本
        cancelValue: '',

        //类名
        className: 'panel',

        //设置遮罩透明度
        backdropOpacity: 0.4,

        //模板内容
        innerHTML:
        '<div i="dialog" class="panel-content">'
        +   '<div i="header" class="hd">'
        +       '<h3 i="title"></h3>'
        +   '</div>'
        +   '<div i="content" class="bd"></div>'
        +   '<div i="footer" class="ft">'
        +       '<div i="statusbar"></div>'
        +       '<div i="button"></div>'
        +   '</div>'
        +'</div>'
        +'<span i="close" class="close"></span>'

    });

    /**
     * 扩展 header footer 两个方法，可以自定义头部与尾部模板
     * @param    {String}    html    内容
     */
    $.each('header footer'.split(' '),function(i,name){

        artDialog.prototype[name] = function(html){

            this._$(name).empty('')
                         .html(html)
                         .show();

            return this.reset();
        };

    });

    $.extend(artDialog.prototype,{

        /**
         * 设置高度宽度
         * @param    {String, Int}   值
         */
        width: function (value) {
            this.__popup.css('width', value);
            return this.reset();
        },

        /**
         * 设置高度
         * @param    {String, Int}   值
         */
        height: function (value) {
            this.__popup.css('height', value);
            return this.reset();
        },

        /**
         * 触发按钮回调函数
         * 默认关闭后，直接就销毁了
         * 这里重写成不自动销毁，如需销毁手动执行remove方法
         * @param    {String}   id
         */
        _trigger: function (id) {
        
            var fn = this.callbacks[id];
                
            return typeof fn !== 'function' || fn.call(this) !== false ?
                this.close() : this;
        }
    });

    /**
     * 实例化完成后触发
     * @param    {Object}   that    artDialog本身
     */
    artDialog.oncreate = function(that){
        that._$('dialog').removeClass(that.skin);
        that.__popup.addClass(that.skin);
    };

    return artDialog;

});