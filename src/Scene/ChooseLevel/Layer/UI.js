/**
 * Created by rayootech on 2017/12/7.
 */

var CLUILayer = cc.Layer.extend({
    //折扣
    discountText: null,
    ctor: function () {
        this._super();
        this.loadTopLeftButton();
        this.loadDiscountButton();
        this.loadStar();
    },
    onEnter: function () {
        this._super();
    },
    //加载左上角按钮
    loadTopLeftButton: function () {
        var leftPanel = new ccui.ImageView("res/ChooseLevel/stagemap_toolbar_leftbg.png");
        this.addChild(leftPanel);
        leftPanel.setAnchorPoint(cc.p(0, 1));
        leftPanel.setPosition(0, cc.winSize.height);

        this.loadHomeButton(leftPanel);
        this.loadShopButton(leftPanel);
        this.loadRankingButton(leftPanel);
    },
    //加载首页按钮
    loadHomeButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var texture = "res/ChooseLevel/stagemap_toolbar_home.png";
        node.loadTextures(texture, texture, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(10, 10);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.director.runScene(new MainMenuScene());
            }
        }, this);
    },
    //加载商店按钮
    loadShopButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var texture = "res/ChooseLevel/stagemap_toolbar_shop.png";
        node.loadTextures(texture, texture, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(111, 10);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("按钮按下");
                // cc.director.runScene(new MainMenuScene());
            }
        }, this);
    },
    //加载排行按钮
    loadRankingButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var texture = "res/ChooseLevel/stagemap_toolbar_leaderboard.png";
        node.loadTextures(texture, texture, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(212, 10);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("按钮按下");
                // cc.director.runScene(new MainMenuScene());
            }
        }, this);
    },
    //加载中间促销按钮
    loadDiscountButton: function () {
        var button = new ccui.Button();
        this.addChild(button);
        var resourceStr = "res/ChooseLevel/zh/discount_tag_stone.png";
        button.loadTextures(resourceStr, resourceStr, "");
        button.setAnchorPoint(0.5, 1);
        button.setPosition(cc.winSize.width / 2, cc.winSize.height);
        button.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("点击促销按钮");
            }
        }, this);
        //折扣显示
        var text = new ccui.TextBMFont("8", res.discount_fnt);
        this.discountText = text;
        button.addChild(text);
        text.setAnchorPoint(0, 0);
        text.setPosition(145, 60);
    },
    //加载右上角生命星
    loadStar: function () {
        var bg = new ccui.ImageView("res/ChooseLevel/stagemap_toolbar_rightbg.png");
        this.addChild(bg);
        bg.setAnchorPoint(1, 1);
        bg.setPosition(cc.winSize.width, cc.winSize.height);

        var star = new ccui.ImageView("res/ChooseLevel/zh/stagemap_toolbar_overten.png");
        bg.addChild(star);
        star.setPosition(150, 50);

        var num = new ccui.Text("010", "Arial", 32);
        star.addChild(num);
        num.setAnchorPoint(0, 0.5);
        num.setPosition(190, 78);
    }
});
