
module.exports = Fire.Class({
    properties: {
        speed: {
            default: 1
        }
    },

    update: function (dt) {
        this.x -= this.speed;

        if (this.x < - this.width ) {
            this.x = this.width*2;
        }
    },
});
