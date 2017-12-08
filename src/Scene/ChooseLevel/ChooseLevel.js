/**
 * Created by rayootech on 2017/12/7.
 */

var ChooseLevelScene = cc.Scene.extend({
    backgroundLayer: null,
    uiLayer: null,
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.loadResource();
        this.loadBackgroundLayer();
        this.loadUILayer();
    },
    loadResource: function () {
        cc.spriteFrameCache.addSpriteFrames(res.cl_route_plist, res.cl_route_png);
    },
    loadBackgroundLayer: function () {
        this.backgroundLayer = new CLBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadUILayer: function () {
        this.uiLayer = new CLUILayer();
        this.addChild(this.uiLayer);
    }
});
