
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
        this.enabled = false;

        cc.eventManager.addCustomListener('game-over', function(event){
            this.enabled = false;
        }.bind(this) );
    },


    update: function (dt) {
        if ( !this.enabled ) return;

        this.x -= this.speed;

        if (this.x < - this.width ) {
            this.x = this.width*2;
        }
    },
});
