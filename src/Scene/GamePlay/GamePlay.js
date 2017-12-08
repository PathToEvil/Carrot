/**
 * Created by rayootech on 2017/12/8.
 */

var GamePlayScene = cc.Scene.extend({
    menuLayer: null,
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.loadBackgroundLayer();
        this.loadUILayer();
        this.loadMainLayer();
    },
    loadBackgroundLayer: function () {
        var bgLayer = new GPBackgroundLayer();
        this.addChild(bgLayer);
    },
    loadMainLayer: function () {

    },
    loadUILayer: function () {
        var menuLayer = new GPUILayer()
        this.addChild(menuLayer);
    },
    loadMenuLayer: function () {
        
    },
    //注册事件
    registerEvent: function () {
        //监听创建菜单事件
        var onCreateMenuLayerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.GP_CREATE_MENU_LAYER,
            callback: this.onCreateMenuLayer
        });
        cc.eventListener.addListener(onCreateMenuLayerListener, this);
        //监听移除菜单事件
        var onRemoveMenuLayerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.GP_REMOVE_MENU_LAYER,
            callback: this.onRemoveMenuLayer
        });
        cc.eventListener.addListener(onRemoveMenuLayerListener, this);
    },
    //创建菜单事件
    onCreateMenuLayer: function (event) {
        var self = event.getCurrentTarget();
        self.loadMenuLayer();
    },
    //移除菜单事件
    onRemoveMenuLayer: function (event) {
        var self = event.getCurrentTarget();
        self.removeChild(self.menuLayer);
    }
});
