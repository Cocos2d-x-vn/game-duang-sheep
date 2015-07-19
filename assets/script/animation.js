var proto = {
    constructor: function () {
        this._current = -1;
        this._actions = {};

        this._init = false;
    },

    properties: {

        animationIndex: {
            default: -1,
            type: Fire.Integer,
            range: [-1, 4]
        }
    },

    play: function (name) {
        this.stopAllActions();

        var action = this._actions[name].action;
        var loop = this._actions[name].loop;

        if (loop)
            this.runAction( action.repeatForever() );
        else
            this.runAction( action );
    },

    update: function (dt) {
        this.updateAnimation(dt);
    },

    updateAnimation: function (dt) {
        if (!Fire.engine.isPlaying) {
            return;
        }

        var self = this;

        if ( !this._init ) {
            for (var i = 0; i<5; i++) {
                (function (name) {
                    var privateName = '_' + name;

                    self[name] = self[privateName];
                })(i);
            }
            this._init = true;
        }

        if ( this.animationIndex !== this._current ) {
            this._current = this.animationIndex;
            this.play( this._current );
        }
    }
}


for (var i = 0; i<5; i++) {

    (function (name) {
        var uuidName = name + 'Uuid';
        var privateName = '_' + name;

        var assetDef = {
            set: function (value) {
                if (value) {
                    var animation = new cc.Animation();

                    for (var i = 0; i<10; i++) {
                        var texture = value[i];
                        if ( !texture ) continue;
                        animation.addSpriteFrameWithFile( texture.url );
                    }

                    animation.setDelayPerUnit(value.delay);
                    animation.setRestoreOriginalFrame(true);

                    var loop = value.loop;
                    var action = cc.animate(animation);

                    this._actions[name] = {
                        action: action,
                        loop: loop
                    }

                    this[privateName] = value;
                }
            }
        }

        var uuidDef = {
            get: function () {
                var asset = this[privateName];
                return asset ? asset._uuid : '';
            },
            set: function (value) {
                if ( value ) {
                    var self = this;
                    Fire.AssetLibrary.loadAsset(value, function (err, asset) {
                        if (err) {
                            Fire.error('Failed to load texture from uuid, ' + err);
                        }
                        else {
                            self[name] = asset;
                        }
                    });
                }
            },

            type: Runtime.SpriteAnimationAsset,
            displayName: name,
        }

        proto.properties[name] = assetDef;
        proto.properties[uuidName] = uuidDef;
        proto.properties[privateName] = {
            default: null,
            type: Runtime.SpriteAnimationAsset
        };

    })(i.toString());
}

var Animation = Fire.Class(proto);

module.exports = Animation;
