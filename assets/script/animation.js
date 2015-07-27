var proto = {
    extends: Fire.Behavior,

    properties: {

        animationIndex: {
            default: -1,
            type: Fire.Integer,
            range: [-1, 4]
        }
    },

    play: function (index) {
        this.stopAllActions();

        var action = this._actions[index].action;
        var loop = this._actions[index].loop;

        if (loop) {
            this.runAction( action.repeatForever() );
        }
        else if (this.onPlayEnd) {
            var callback = cc.callFunc(this.onPlayEnd, this);
            this.runAction( cc.sequence(action, callback) );
        }
        else {
            this.runAction( action );
        }

        this.animationIndex = index;
    },

    onLoad: function () {
        this._actions = {};

        this._initAnimation();
    },

    _initAnimation: function () {
        for (var i = 0; i<5; i++) {
            ( function (name) {
                var asset = this[name];
                if ( !asset ) return;

                var animation = new cc.Animation();

                for (var i = 0; i<10; i++) {
                    var texture = asset[i];
                    if ( !texture ) continue;
                    animation.addSpriteFrameWithFile( texture.url );
                }

                animation.setDelayPerUnit(asset.delay);

                var loop = asset.loop;
                var action = cc.animate(animation);

                this._actions[name] = {
                    action: action,
                    loop: loop
                }
            }.bind(this) )(i);
        }

        this.play( this.animationIndex );
    }
}


for (var i = 0; i<5; i++) {

    (function (name) {
        var uuidName = name + 'Uuid';
        var privateName = '_' + name;

        var assetDef = {
            default: null,
            type: Runtime.SpriteAnimationAsset,
            displayName: name
        };

        proto.properties[name] = assetDef;
    })(i.toString());
}

var Animation = Fire.Class(proto);

