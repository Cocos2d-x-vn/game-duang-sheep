var Effect = require('Effect');
var animData = [
    {
        name: "sheep_run_",
        count: 4,
        startIdx: 1,
        delay: 0.1,
        loop: true
    },
    {
        name: "sheep_jump_",
        count: 3,
        startIdx: 1,
        delay: 0.1
    },
    {
        name: "sheep_jump_",
        count: 3,
        startIdx: 3,
        delay: 0.1
    },
    {
        name: "sheep_down_",
        count: 3,
        startIdx: 1,
        delay: 0.1
    },
    {
        name: "sheep_touch_",
        count: 1,
        startIdx: 1,
        delay: 0.1
    }
];

var sheepAnims = [];
var initAnimation = function() {
    for (var i = 0; i < animData.length; ++i) {
        var info = animData[i];
        sheepAnims[i] = Effect.createAnimation(info.name, info.count, info.startIdx, info.delay);
    }
};

var play = function(state, sheep) {
    sheep.stopAllActions();
    var loop = animData[state].loop;
    var anim = sheepAnims[state];
    var action = cc.animate(anim);
    if (loop) {
        sheep.runAction( cc.repeatForever(action) );
    }
    else if (sheep.onPlayEnd) {
        var callback = cc.callFunc(sheep.onPlayEnd, sheep);
        sheep.runAction( cc.sequence(action, callback) );
    }
    else {
        sheep.runAction( action );
    }
};

module.exports = {
    play: play,
    initAnimation: initAnimation
};
