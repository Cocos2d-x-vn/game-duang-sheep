module.exports = Fire.Class({
    constructor: function () {
        this._init = false;

    },

    properties: {
        // foo: {
        //     default: null,
        //     type: Fire.Node,
        //     serializable: true, // [optional], default is true
        //     visible: true,      // [optional], default is true
        //     displayName: 'Foo', // [optional], default is property name
        //     readonly: false,    // [optional], default is false
        // },
        // ...
    },

    update: function (dt) {
        // do your update here

        if ( !this._init ) {

            this._init = true;
        }
    },
});
