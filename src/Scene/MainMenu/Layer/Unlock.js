/**
 * Created by rayootech on 2017/12/6.
 */

var MMUnlockLayer = cc.Layer.extend({
    layout: null,
    background: null,
    ctor: function () {
        this._super();
        this.loadLayout();
        this.loadBackground();
        this.loadConfirmButton();
    },
    //加载layout
    loadLayout: function () {
        var node = new ccui.Layout();
        this.addChild(node);
        this.layout = node;
        node.setContentSize(cc.winSize);
        node.setTouchEnabled(true);
    },
    //加载背景
    loadBackground: function () {
        var node = new ccui.ImageView("res/Common/bg/woodbg_notice.png");
        this.layout.addChild(node);
        this.background = node;
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    //加载确定按钮
    loadConfirmButton: function (offsetX, posY) {
        var node = new ccui.Button();
        this.background.addChild(node);
        node.loadTextures("res/UI/btn_blue_m.png", "res/UI/btn_blue_m_pressed.png", "");
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var event = new cc.EventCustom(jf.EventName.UNLOCK_UP);
                    event.setUserData({
                        isSuccess: true
                    });
                    cc.eventManager.dispatchEvent(event);
                    this.removeFromParent();
                    break;
            }
        }, this);
        //确定按钮的文字图片
        var infoNode = new ccui.ImageView("res/UI/zh/btn_blue_m_ok.png");
        node.addChild(infoNode);
        infoNode.setPosition(node.width / 2, node.height / 2);
    }
});
