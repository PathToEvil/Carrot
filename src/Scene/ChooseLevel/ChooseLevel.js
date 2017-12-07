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
        this.loadBackgroundLayer();
        this.loadUILayer();
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
