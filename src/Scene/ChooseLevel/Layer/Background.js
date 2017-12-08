/**
 * Created by rayootech on 2017/12/7.
 */

var CLBackgroundLayer = cc.Layer.extend({
    scrollView: null,
    zOrderMap: {},
    routeButtonArray: [],
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.loadProperty();
        this.loadScrollView();
        this.loadTiledMap();
        this.loadRoute(11);
    },
    loadScrollView: function () {
        var node = new ccui.ScrollView();
        this.scrollView = node;
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
    },
    loadProperty: function () {
        this.zOrderMap.route = 1;
        this.zOrderMap.routeButtonEffect = 5;
        this.zOrderMap.levelButton = 10;

        this.routeButtonArray = [];
    },
    loadTiledMap: function () {
        var node = new cc.TMXTiledMap(res.TiledMap_tmx);
        var objectGroup = node.getObjectGroup("point");
        var objs = objectGroup.getObjects();
        for (var i = 0; i < objs.length; i++) {
            var button = new ccui.Button();
            this.scrollView.addChild(button, this.zOrderMap.levelButton, i);
            this.routeButtonArray.push(button);
            //图片纹理
            var texture = "res/ChooseLevel/stagepoint_adv.png";
            //编辑器中配置的属性
            if (objs[i].isBoos == "YES") {
                texture = "res/ChooseLevel/stagepoint_boss.png";
            }else if (objs[i].isTime == "YES") {
                texture = "res/ChooseLevel/stagepoint_time.png";
            }else if (objs[i].isChange == "YES") {
                texture = "res/ChooseLevel/stagepoint_chance.png";
            }else {
                texture = "res/ChooseLevel/stagepoint_adv.png";
            }
            button.loadTextures(texture, texture, "");
            button.setPosition(objs[i].x, objs[i].y);
            button.setTag(i);
            button.addTouchEventListener(this.onLevelButtonEvent, this);
        }
    },
    //关卡按钮点击事件
    onLevelButtonEvent: function (sender, type) {
        switch (type) {
            case  ccui.Widget.TOUCH_ENDED:
                var level = sender.getTag();
                break;
        }
    },
    //加载关卡道路
    loadRoute: function (level) {
        var node = null;
        for (var i = 0; i < level - 1; i++) {
            node = new cc.Sprite("#route_" + (i + 1) + ".png");
            if (i % 10 == 9) {
                node.setAnchorPoint(0, 0.5);
            }
            node.x = node.width / 2 + Math.floor(i / 10) * node.width;
            node.y = this.scrollView.getInnerContainerSize().height / 2;
            this.scrollView.addChild(node, this.zOrderMap.route);
        }
    }
});
