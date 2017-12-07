/**
 * Created by rayootech on 2017/12/7.
 */

var CLBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.loadScrollView();
    },
    loadScrollView: function () {
        var node = new ccui.ScrollView();
        this.addChild(node);
        node.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        node.setTouchEnabled(true);
        node.setContentSize(cc.winSize);

        var nextPosX = 0;
        var imageView = null;
        for (var i = 0; i < 14; i++) {
            imageView = new ccui.ImageView("res/ChooseLevel/Map/stage_map_" + i + ".png");
            node.addChild(imageView);
            imageView.setAnchorPoint(cc.p(0, 0.5));
            imageView.setPosition(nextPosX, cc.winSize.height / 2);
            nextPosX += imageView.width;
        }
        node.setInnerContainerSize(cc.size(nextPosX, cc.winSize.height));
    }
});
