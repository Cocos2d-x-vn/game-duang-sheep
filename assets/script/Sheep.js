var Effect = require('Effect');

//-- 绵羊状态
var State = Fire.defineEnum({
    Run    : -1,
    Jump   : -1,
    Drop   : -1,
    DropEnd: -1,
    Dead   : -1
});

Fire.Class({
    extends: Fire.Behavior,

    properties: {

        jumpAudioAsset: {
            default: null,
            type: Fire.AudioClip
        },

        jumpEffectAsset: {
            default: null,
            type: Runtime.SpriteAnimationAsset
        },

        groundY: {
            default: 100
        },

        state: {
            get: function () {
                return this._state;
            },
            set: function(value){
                if (value !== this._state) {
                    this._state = value;

                    this.play(this._state);
                }
            },
            type: State
        },

        jumpSpeed: 500,

        gravity: 9.8,

        _state: {
            default: State.Run,
            type: State
        }
    },

    onLoad: function () {

        this.currentSpeed = 0;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBegan.bind(this)
        }, this);

        // this._initAnimation();
    },

    update: function (dt) {

        this._updateState();
        this._updateMotion(dt);

    },

    _updateState: function () {
        switch (this.state) {
            case State.Jump:
                if (this.currentSpeed < 0) {
                    this.state = State.Drop;
                }
                break;
            case State.Drop:
                if (this.y <= this.groundY) {
                    this.y = this.groundY;
                    this.state = State.DropEnd;
                    // 播放灰尘特效
                    // var pos = cc.p(this.x - 80, this.y + 10);
                    // Effect.createEffect(this.jumpEffect, pos);
                }
                break;
            default:
                break;
        }

    },

    _updateMotion: function (dt) {
        var flying = this.state === State.Jump || this.y > this.groundY;
        if (flying) {
            this.currentSpeed -= (dt * 100) * this.gravity;
            this.y += dt * this.currentSpeed;
        }
    },

    _jump: function () {
        this.state = State.Jump;
        this.currentSpeed = this.jumpSpeed;

        if (this.jumpAudioAsset) {
            cc.audioEngine.playEffect( this.jumpAudioAsset.url, false );
        }

        // 播放灰尘特效
        var pos = cc.p(this.x - 80, this.y + 10);
        Effect.createEffect(this.jumpEffectAsset, pos, 0.5);
    },

    onTouchesBegan: function (touches, event) {
        if (this.state !== State.Dead) {
            this._jump();
        }
    },

    onPlayEnd: function () {
        if (this.state === State.DropEnd) {
            this.state = State.Run;
        }
    }
});

module.exports = {
    State: State
};
