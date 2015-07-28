module.exports = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        // foo: {
        //     default: null,
        //     type: Fire,
        //     serializable: true, // [optional], default is true
        //     visible: true,      // [optional], default is true
        //     displayName: 'Foo', // [optional], default is property name
        //     readonly: false,    // [optional], default is false
        // },
        // ...
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
    },

    update: function (dt) {
        // do your update here
    },
});
