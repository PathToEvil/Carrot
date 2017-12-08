/**
 * Created by rayootech on 2017/12/8.
 */

var GPBackgroundLayer = cc.Layer.extend({
    onEnter: function () {
        this._super();
        this.loadBackground();
    },
    //加载背景
    loadBackground: function () {
        var themeID = GameManager.getThemeID();
        var node = new cc.Sprite("res/GamePlay/Theme/Theme" + themeID + "/BG0/BG" + themeID + ".png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});
