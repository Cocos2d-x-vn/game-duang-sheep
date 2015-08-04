var createEffect = function  (animInfo, position, scale) {
    var animation = createAnimation(animInfo.name, animInfo.count, animInfo.startIdx, animInfo.delay);

    var action = cc.animate(animation);
    var sprite = new cc.Sprite();
    cc.director.getRunningScene().addChild( sprite );

    sprite.x = position.x;
    sprite.y = position.y;

    if (scale) sprite.scale = scale;

    var callback = cc.callFunc(sprite.removeFromParent, sprite);
    sprite.setName('fx');
    sprite.runAction( cc.sequence(action, callback) );

    return sprite;
};

var createAnimation = function(animName, count, startIdx, delay) {
    var animFrames = [];
    var frame,str;
    // init run animation
    for (var i = startIdx; i < startIdx + count; i++) {
        var num = i;
        if (num < 10) {
            num = "0" + i;
        }
        str = animName + num + ".png";
        frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    return new cc.Animation(animFrames, delay);
};

module.exports = {
    createEffect: createEffect,
    createAnimation: createAnimation
};
