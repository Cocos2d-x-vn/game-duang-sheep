var Sheep = require('./Sheep');

var GameState = Fire.defineEnum({
    Ready: -1,
    Run : -1,
    Over: -1
});

Fire.Class({
    extends: Fire.Behavior,

    properties: {
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
        }
    },

    onLoad: function () {
        // 游戏状态
        this.gameState = GameState.Ready;
        // 分数
        this.score = 0;

        var scene = cc.director.getRunningScene();
        this.pipeMgr = scene.getChildByName( 'bgLayer' ).getChildByName( 'pipeMgr' );
        this.sheep = scene.getChildByName( 'gameLayer' ).getChildByName( 'sheep' );
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
                }
                // var sheepRect = this.sheep.renderer.getWorldBounds();
                // var gameOver = this.pipeGroupMgr.collisionDetection(sheepRect);
                // if (gameOver) {
                //     // 背景音效停止，死亡音效播放
                //     this.gameBgAudio.stop();
                //     this.dieAudio.play();
                //     this.gameOverAudio.play();

                //     this.gameState = GameState.Over;
                //     this.sheep.state = Sheep.State.Dead;

                //     this._pauseUpdate(false);

                //     this.gameOverMenu.active = true;
                // }
                // // 计算分数
                // this.updateScore();
                break;
            default:
                break;
        }
    },

});
