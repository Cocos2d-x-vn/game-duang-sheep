
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

    update: function (dt) {
        this.x -= this.speed;

        if (this.x < - this.width ) {
            this.x = this.width*2;
        }
    },
});
