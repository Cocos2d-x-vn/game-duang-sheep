var Sheep = require('Sheep');
var Effect = require('Effect');

var GameState = Fire.defineEnum({
    Ready: -1,
    Run : -1,
    Over: -1
});

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        pipeMgr: {
            default: null,
            type: cc.Node
        },

        sheep: {
            default: null,
            type: cc.Node
        },

        scoreText: {
            default: null,
            type: cc.Node
        },

        bgAudioAsset: {
            default: '',
            url: Fire.AudioClip,
        },

        readyAudioAsset: {
            default: '',
            url: Fire.AudioClip
        },

        dieAudioAsset: {
            default: '',
            url: Fire.AudioClip
        },

        gameOverAudioAsset: {
            default: '',
            url: Fire.AudioClip
        },

        scoreAudio: {
            default: '',
            url: Fire.AudioClip
        },

        addScoreFont: {
            default: '',
            url: Fire.BitmapFont
        },

        hitEffect: {
            default: '',
            type: Runtime.SpriteAnimationAsset
        }
    },

    onLoad: function () {
        // 游戏状态
        this.gameState = GameState.Ready;
        // 分数
        this.score = 0;
        this.scoreText.string = 0;
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(900, 640, policy);
    },

    update: function (dt) {

        switch( this.gameState ) {
            case GameState.Ready:
                cc.audioEngine.playMusic( this.readyAudioAsset, false );
                this.gameState = GameState.Run;
                break;
            case  GameState.Run:
                if ( !cc.audioEngine.isMusicPlaying() ) {
                    cc.audioEngine.playMusic( this.bgAudioAsset, true );
                }

                var gameOver = this.pipeMgr.collisionDetection( this.sheep );
                if ( gameOver ) {
                    this.gameState = GameState.Over;
                    cc.audioEngine.playEffect( this.dieAudioAsset, false );
                    cc.audioEngine.playMusic( this.gameOverAudioAsset, false );
                    this.sheep.state = Sheep.State.Dead;

                    cc.eventManager.dispatchCustomEvent("game-over", this.score);
                }
                // 计算分数
                this._updateScore();
                break;
            default:
                break;
        }
    },

    _updateScore: function () {
        var nextPipeGroup = this.pipeMgr.getNext();
        if (nextPipeGroup) {
            var sheepRect = this.sheep.getBoundingBoxToWorld();
            var pipeGroupRect = nextPipeGroup.bottom.getBoundingBoxToWorld();
            // 当绵羊的右边坐标越过水管右侧坐标
            var crossed = sheepRect.x > pipeGroupRect.x+pipeGroupRect.width;
            if (crossed) {
                // 分数+1
                this.score++;
                this.scoreText.string = this.score;
                this.pipeMgr.setAsPassed(nextPipeGroup);
                // 分数增加音效
                cc.audioEngine.playEffect( this.scoreAudio, false );

                this._playScoreEffect();
            }
        }
    },

    _playScoreEffect: function (  ) {
        var pos = new cc.p(this.sheep.x - 30, this.sheep.y + 50);

        var node = new cc.LabelBMFont( '+1', this.addScoreFont );
        cc.director.getRunningScene().addChild( node );

        node.x = pos.x;
        node.y = pos.y;
        node.scale = 0.7;

        var action = new cc.MoveBy(1, cc.p(0, 60));
        var callback = cc.callFunc( function () {
            node.removeFromParent();

            var effect = Effect.createEffect( this.hitEffect, node.getPosition() );
            effect.color = cc.color(255, 0, 0);
            effect.scale = 0.6;
        }, this );
        node.runAction( cc.sequence(action, callback) );
    }

});
