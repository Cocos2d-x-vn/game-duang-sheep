Fire.Class({
    extends: Fire.Behavior,

    properties: {
        // 基础移动速度
        speed: 200,
        // 超出这个范围就会被销毁
        minX: -900,
        // 上方管子坐标范围 Min 与 Max
        topPosRange: {
            default: new Fire.Vec2(100, 160)
        },
        // 上方与下方管道的间距 Min 与 Max
        spacingRange: {
            default: new Fire.Vec2(210, 230)
        },
        // PipeGroup初始坐标
        initPipeGroupPos: {
            default: new Fire.Vec2(600, 0)
        },
        // 创建PipeGroup需要的时间
        spawnInterval: 3,

        // asset
        pipeAsset: {
            default: '',
            url: Fire.Texture
        }
    },

    // use this for initialization
    onLoad: function () {
        this.pipeGroups = [];
        this.lastTime = 0;

        this._createPipeGroup();
    },

    update: function (dt) {

        this._updateGroup(dt);
    },

    _updateGroup: function (dt) {

        // 每过一段时间创建障碍物
        this.lastTime += dt;
        if (this.lastTime >= this.spawnInterval) {
            this.lastTime = 0;
            this._createPipeGroup();
        }

        var groupToRemove = [];

        var groups = this.pipeGroups;
        groups.forEach( function (group) {
            group.x -= dt * this.speed;
            if (group.x < this.minX) {
                groupToRemove.push( group );
            }
        }.bind(this) );

        groupToRemove.forEach( function (group) {
            groups.splice( groups.indexOf(group), 1 );
            group.removeFromParent();
        });
    },

    _createPipeGroup: function () {
        var group = new cc.Node();

        group.top = new cc.Sprite( this.pipeAsset );
        group.bottom = new cc.Sprite( this.pipeAsset );

        group.top.setAnchorPoint(0.5, 0);
        group.bottom.setAnchorPoint(0.5, 0);

        group.addChild( group.top );
        group.addChild( group.bottom );

        this.addChild( group );
        this.pipeGroups.push( group );

        // 初始化水管坐标
        var topYpos = Math.randomRange(this.topPosRange.x, this.topPosRange.y);
        var randomSpacing = Math.randomRange(this.spacingRange.x, this.spacingRange.y);
        var bottomYpos = topYpos - randomSpacing;

        group.x = this.initPipeGroupPos.x;
        group.top.y = topYpos;
        group.bottom.y = bottomYpos;

        group.top.scaleX = 0.7;
        group.top.scaleY = 0.15;

        group.bottom.scaleX = 0.7;
        group.bottom.scaleY = -0.15;

        group.passed = false;
    },

    getNext: function () {
        var groups = this.pipeGroups;
        for (var i = 0; i<groups.length; i++) {
            var group = groups[i];
            if ( !group.passed ) {
                return group;
            }
        }

        return null;
    },

    collisionDetection: function (target) {
        var rect = target.getBoundingBoxToWorld();

        // 降低难度

        rect.x += 20;
        rect.y += 15;
        rect.width -= 40;
        rect.height -= 30;

        var groups = this.pipeGroups;
        for (var i = 0; i<groups.length; i++ ) {
            var group = groups[i];

            var topPipeRect = group.top.getBoundingBoxToWorld();
            var bottomPipeRect = group.bottom.getBoundingBoxToWorld()

            if ( cc.rectIntersectsRect(rect, topPipeRect) || cc.rectIntersectsRect(rect, bottomPipeRect) ) {
                return true;
            }
        }

        return false;
    },

    setAsPassed: function (group) {
        group.passed = true;
    }
});
