/**
 * Created by rayootech on 2017/12/5.
 */

var MMMainLayer = cc.Layer.extend({
    actionDuration: 1,
    isUpUnlock: false,
    upLock: null,
    ctor: function () {
        this._super();
        //加载配置
        this.loadConfig();
        // 加载菜单
        this.loadMenu();
        // 加载[设置]
        this.loadSet();
        // 加载[帮助]
        this.loadHelp();
        // 加载[怪物]底部1号和3号怪
        this.loadBackMonster();
        // 加载[云朵]底部遮挡在1号、5号以及6号怪之前的云朵
        this.loadBackSmoke();
        // 加载[怪物]前面5号怪
        this.loadForeMonster();
        // 加载[云朵]前面遮罩在5号怪身上
        this.loadForeSmoke();
        // 加载[萝卜]
        this.loadCarrot();
        // 加载[前景]
        this.loadForeground();
        //注册事件
        this.registerEvent();
    },
    loadConfig: function () {
        this.isUpUnlock = cc.sys.localStorage.getItem(Config.IS_UP_UNLOCK_KEY) || "NO";
    },
    loadMenu: function () {
        //开始按钮
        var startNormal = new cc.Sprite(res.front_btn_start_normal_png);
        var startPress = new cc.Sprite(res.front_btn_start_pressed_png);
        var startDisabled = new cc.Sprite(res.front_btn_start_normal_png);
        var start = new cc.MenuItemSprite(startNormal, startPress, startDisabled, function () {
            cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
        });
        start.setPosition(cc.winSize.width / 2 - 8, cc.winSize.height / 2 + 75);
        //天天向上按钮
        var floorNormal = new cc.Sprite(res.front_btn_floor_normal_png);
        var floorPress = new cc.Sprite(res.front_btn_floor_pressed_png);
        var floorDisabled = new cc.Sprite(res.front_btn_floor_normal_png);
        var floor = new cc.MenuItemSprite(floorNormal, floorPress, floorDisabled, function () {
            cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
            if (this.isUpUnlock == "NO") {
                cc.eventManager.dispatchEvent(new cc.EventCustom(jf.EventName.OPEN_UNLOCK_UP_LAYER));
            }else {
                cc.log("TODO: 实现\"天天向上\"按钮的功能");
            }
        });
        floor.setPosition(cc.winSize.width / 2 - 8, cc.winSize.height / 2 - 75);
        //如果未解锁天天向上,则添加锁精灵
        cc.log("锁定状态 +" + this.isUpUnlock);
        if (!this.isUpUnlock) {
            cc.log("锁定");
            var upLock = new cc.Sprite(res.front_btn_floor_locked_png);
            floor.addChild(upLock);
            upLock.setPosition(floor.width + 5, floor.height / 2 + 25);
            this.upLock = upLock;
        }
        //创建菜单
        var menu = new cc.Menu(start, floor);
        menu.setPosition(0, 0);
        this.addChild(menu);
    },
    loadCarrot: function () {
        var node = new cc.Sprite(res.front_carrot_png);
        // node.setPosition(cc.winSize.width / 2 + 100, 20);
        this.addChild(node);

        //萝卜,贝塞尔曲线+缩放运动
        node.setScale(0.7);
        node.setPosition(cc.p(cc.winSize.width / 2 + 320, 120));
        var controlPointsTo = [cc.p(cc.winSize.width / 2 + 400, 100),
                               cc.p(cc.winSize.width / 2 + 120, 0),
                               cc.p(cc.winSize.width / 2 + 100, 20)];
        var bezierTo = cc.bezierTo(this.animationDuration * 0.8, controlPointsTo);
        var scaleTo = cc.scaleTo(this.animationDuration * 0.8, 1);
        var spawn = cc.spawn(bezierTo, scaleTo);
        node.runAction(spawn);
    },
    // 加载[设置]
    loadSet : function(){
        var setBg = new cc.Sprite(res.front_monster_4_png);
        this.addChild(setBg);
        setBg.setPosition(cc.winSize.width / 2 - 350, 490);
        setBg.runAction(this.moveByTopAndBottomAction());

        var set = new cc.Sprite(res.front_btn_setting_normal_png);
        setBg.addChild(set);
        set.setPosition(157, 80);
    },
    // 加载[帮助]
    loadHelp : function(){
        var helpBg = new cc.Sprite(res.front_monster_6_hand_png);
        this.addChild(helpBg);
        helpBg.setPosition(cc.winSize.width / 2 + 270, 270);

        var help = new cc.Sprite(res.front_btn_help_normal_png);
        helpBg.addChild(help);
        help.setPosition(155, 365);

        var helpBody = new cc.Sprite(res.front_monster_6_png);
        this.addChild(helpBody);
        helpBody.setPosition(cc.winSize.width / 2 + 400, 280);
        helpBody.runAction(this.moveByTopAndBottomAction());
    },
    // 加载[怪物]底部1号和3号怪
    loadBackMonster : function(){
        var leftYellow = new cc.Sprite(res.front_monster_3_png);
        this.addChild(leftYellow);
        leftYellow.setPosition(cc.winSize.width / 2 - 360, 220);
        leftYellow.runAction(this.moveByTopAndBottomAction());

        var leftGreen = new cc.Sprite(res.front_monster_1_png);
        this.addChild(leftGreen);
        leftGreen.setPosition(cc.winSize.width / 2 - 300, 185);
        leftGreen.runAction(this.moveByLeftAndRightAction());

    },
    // 加载[云朵]底部遮挡在1号、5号以及6号怪之前的云朵
    loadBackSmoke : function(){
        var left = new cc.Sprite(res.front_smoke_1_png);
        this.addChild(left);
        left.setPosition(cc.winSize.width / 2 - 410, 188);

        var right = new cc.Sprite(res.front_smoke_3_png);
        this.addChild(right);
        right.setPosition(cc.winSize.width / 2 + 405, 190);
    },
    //加载[怪物]前面5号怪2号怪
    loadForeMonster : function(){
        var rightYellow = new cc.Sprite(res.front_monster_5_png);
        this.addChild(rightYellow);
        rightYellow.setPosition(cc.winSize.width / 2 + 290, 185);
        rightYellow.runAction(this.moveByLeftAndRightAction());

        var leftCambridgeBlue = new cc.Sprite(res.front_monster_2_png);
        this.addChild(leftCambridgeBlue);
        leftCambridgeBlue.setPosition(cc.winSize.width / 2 - 300, 150);

        //上下移动
        var action0 = cc.moveTo(this.actionDuration * 0.2, cc.p(cc.winSize.width / 2 - 220, 170));
        var action1 = cc.sequence(action0, cc.callFunc(function () {
            var blueMoveBy1 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, -5));
            var blueMoveBy2 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, 5));
            leftCambridgeBlue.runAction(cc.sequence(blueMoveBy1, blueMoveBy2).repeatForever());
        }, this));
        leftCambridgeBlue.runAction(action1);
    },
    // 加载[云朵]前面遮罩在5号怪身上
    loadForeSmoke : function(){
        var node = new cc.Sprite(res.front_smoke_2_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2 + 320, 150);
    },
    // 加载[前景]
    loadForeground : function(){
        var node = new cc.Sprite(res.front_front_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    //左右移动动画
    moveByLeftAndRightAction: function () {
        var leftMoveBy = cc.moveBy(this.actionDuration * 2, cc.p(-5, 0));
        var rightMoveBy = cc.moveBy(this.actionDuration * 2, cc.p(5, 0));
        return cc.sequence(leftMoveBy, rightMoveBy).repeatForever()
    },
    //上下移动动画
    moveByTopAndBottomAction: function () {
        var topMoveBy = cc.moveBy(this.actionDuration * 2, cc.p(0, 5));
        var bottomMoveBy = cc.moveBy(this.actionDuration * 2, cc.p(0, -5));
        return cc.sequence(topMoveBy, bottomMoveBy).repeatForever();
    },
    //添加事件
    registerEvent: function () {
        var listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName:jf.EventName.UNLOCK_UP,
            callback: this.onUnlockUp
        });
        cc.eventManager.addListener(listener, this);
    },
    //天天向上解锁事件
    onUnlockUp: function (event) {
        var target = event.getCurrentTarget();
        var data = event.getUserData();
        if (data.isSuccess !== undefined && data.isSuccess) {
            cc.sys.localStorage.setItem(Config.IS_UP_UNLOCK_KEY, "YES");
            target.isUpUnlock = true;
            target.upLock.removeFromParent();
        }
    }
})
