/**
 * Created by rayootech on 2017/12/8.
 */

var GameManager = {
    level: 0,
    levelData: [],
    themeID: 0,
    monsterGroup: [],
    group: 0,
    maxGroup: 0,
    _groupIndex: 0,
    carrotBlood: 0,
    gold: 0,
    enemyInterval: 0,
    groupInterval: 0,
    levelName: 0,

    //获取下一个怪物数据相关属性
    _teamIndex: 0,
    _teamCount: 0,
    _teamMonsterCount: 0,
    _teamMonsterIndex: 0,
    isMonsterGetFinish: false,
    _monsterDataArray: [],

    currMonsterDataPool: [],
    currMonsterPool: [],
    currBulletPool: [],

    isWin: false,

    //加载关卡数据
    loadLevelData: function (level) {
        this.level = level;
        this.levelData = LevelData[level];
        this.themeID = this.levelData.themeID;
        this.monsterGroup = this.levelData.monsterGroup;
        this.group = 0;
        this.maxGroup = this.monsterGroup.length - 1;
        this._groupIndex = 0;
        this.carrotBlood = this.levelData.blood;
        this.gold = this.levelData.gold;
        this.enemyInterval = this.levelData.enemyInterval;
        this.groupInterval = this.levelData.groupInterval;
        this.levelName = this.levelData.levelName;

        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[0].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount =  this.monsterGroup[0].team[0].count - 1;
        this.isMonsterGetFinish = false;

        this._monsterDataArray = [];
        this.currMonsterDataPool = [];
        this.currMonsterPool = [];
        this.currBulletPool = [];

        this.isWin = false;

        this._loadMonsterData();
    },
    //加载怪物数据
    _loadMonsterData: function () {
        var group;
        var team;
        var unit;
        var data = {};
        this._monsterDataArray = [];
        for (group = 0; group < this.monsterGroup.length; group++) {
            this._monsterDataArray[group] = [];
            for (team = 0; team < this.monsterGroup[group].team.length; team ++) {
                for (unit = 0; unit < this.monsterGroup[group].team[team].count; unit++) {
                    data = this._getNextMonsterData();
                    this._monsterDataArray[group].push(data);
                }
            }
        }
    },
    //获取下一个怪物数据
    _getNextMonsterData: function () {
        if (this.isMonsterGetFinish == true) {
            return
        }

        var teamData = this.monsterGroup[this._groupIndex].team[this._teamIndex];
        var monsterData = {};
        monsterData.group = this._groupIndex;
        monsterData.name = teamData.name;
        monsterData.blood = teamData.blood;
        monsterData.speed = teamData.speed;
        monsterData.index = this._teamMonsterIndex;

        this._teamMonsterIndex++;
        if (this._teamMonsterIndex > this._teamMonsterCount) {
            this._enterNextTeam();
        }
        return monsterData;
    },
    //进入到下一队
    _enterNextTeam: function () {
        this._teamMonsterIndex = 0;
        this._teamIndex++;
        //进入下一组
        if (this._teamIndex > this._teamCount) {
            this._enterNextGroup();
        }
        //进入下一队
        else {
            this._teamMonsterCount = this.monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
        }
    },
    //进入下一组
    _enterNextGroup: function () {
        this._groupIndex++;
        //添加完毕
        if (this._groupIndex > this.maxGroup) {
            this.isMonsterGetFinish = true;
            return;
        }
        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[this._groupIndex].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this.monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
    },
    //弹出下一组怪物数据
    popNextMonsterGroupData: function () {
        var groupData = [];
        if (this.group <= this.maxGroup) {
            this.group++;
            groupData = this._monsterDataArray[0];
            this._monsterDataArray.splice(0, 1);
            
            //抛出事件组别更新
            var event = new cc.EventCustom(jf.EventName.GP_UPDATE_GROUP);
            event.setUserData({
               group: this.group 
            });
            cc.eventManager.dispatchEvent(event);
        }else {
            groupData = [];
        }
        return groupData;
    },
    //////////////////////////////
    // getter && setter
    //////////////////////////////
    getLevel : function(){
        return this.level;
    },
    setLevel : function(level){
        this.level = level;
    },
    getLevelData : function(){
        return this.levelData;
    },
    getThemeID : function(){
        return this.themeID;
    },
    getMonsterGroup : function(){
        return this.monsterGroup;
    },
    getGroup : function(){
        return this.group;
    },
    getMaxGroup : function(){
        return this.maxGroup;
    },
    getGold : function(){
        return this.gold;
    },
    getEnemyInterval : function(){
        return this.enemyInterval;
    },
    getGroupInterval : function(){
        return this.groupInterval;
    },
    getLevelName : function(){
        return this.levelName;
    },
    getCarrotBlood : function(){
        return this.carrotBlood;
    },
    setCarrotBlood : function (blood) {
        this.carrotBlood = blood;
    },
    getCurrMonsterDataPool : function(){
        return this.currMonsterDataPool;
    },
    getCurrMonsterPool : function(){
        return this.currMonsterPool;
    },
    getCurrBulletPool : function(){
        return this.currBulletPool;
    },
    getIsWin : function(){
        return this.isWin;
    },
    setIsWin : function(isWin){
        this.isWin = isWin;
    }
}
