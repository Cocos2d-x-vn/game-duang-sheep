
Fire.Class({
    extends: Fire.Behavior,

    properties: {
        speed: {
            default: 2
        },
        width: {
            default: 890
        }
    },

    onLoad: function () {
        this.enabled = true;

        cc.eventManager.addCustomListener('game-over', function(event){
            this.enabled = false;
        }.bind(this) );
    },


    update: function (dt) {
        if ( !this.enabled ) return;
        var childNodes = this.getChildren();
        for (var i = 0; i < childNodes.length; ++i) {
            var child = childNodes[i];
            child.x -= this.speed * dt;

            if (child.x < - child.width ) {
                child.x = child.width*2;
            }
        }
    },
});
