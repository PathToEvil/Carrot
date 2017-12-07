/**
 * Created by rayootech on 2017/12/5.
 */

var MMBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBackground();
        return true;
    },
    loadBackground: function () {
        var node = new cc.Sprite(res.front_bg_png);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(node);
    }
});
