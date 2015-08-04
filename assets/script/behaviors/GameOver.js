module.exports = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        dropTime: 0.7
    },

    // use this for initialization
    onLoad: function () {
        this.scoreText = this.getChildByName( 'score' );

        cc.eventManager.addCustomListener('game-over', this.onGameOver.bind(this) );
    },

    onGameOver: function ( event ) {
        var action = cc.moveBy( this.dropTime, cc.p(0, -500) );
        this.runAction(action);

        this.scoreText.string = event.getUserData();
    }
});
