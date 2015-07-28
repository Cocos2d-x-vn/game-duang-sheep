module.exports = Fire.Class({
    extends: Fire.Behavior,
    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this.addTouchEventListener(this.touchEvent, this);
    },

    touchEvent: function ( sender, type ) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                Fire.engine.loadScene( 'game' );
                break;

            default:
                break;
        }
    }
});
