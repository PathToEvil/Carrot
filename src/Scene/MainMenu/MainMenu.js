/**
 * Created by rayootech on 2017/12/5.
 */

var MainMenuScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        cc.audioEngine.playMusic(res.sd_mm_BGMusic_mp3, true);
    },
    onEnter: function () {
        this._super();
        //添加背景
        var bgLayer = new MMBackgroundLayer();
        this.addChild(bgLayer);
        //添加主界面
        var mainLayer = new MMMainLayer();
        this.addChild(mainLayer);
        //注册事件
        this.registerEvent();
    },
    //注册事件
    registerEvent: function () {
        var listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.OPEN_UNLOCK_UP_LAYER,
            callback: this.onLoadUnlockLayer
        });
        cc.eventManager.addListener(listener, this);
    },
    onLoadUnlockLayer: function (event) {
        var target = event.getCurrentTarget();
        target.unlockLayer = new MMUnlockLayer();
        target.addChild(target.unlockLayer);
    }
})
