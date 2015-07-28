

var createEffect = function  (asset, position, scale) {
    var animation = new cc.Animation();

    for (var i = 0; i<10; i++) {
        var texture = asset[i];
        if ( !texture ) continue;
        animation.addSpriteFrameWithFile( texture.url );
    }

    animation.setDelayPerUnit(asset.delay);

    var action = cc.animate(animation);
    var sprite = new cc.Sprite();
    cc.director.getRunningScene().addChild( sprite );

    sprite.x = position.x;
    sprite.y = position.y;

    if (scale) sprite.scale = scale;

    var callback = cc.callFunc(sprite.removeFromParent, sprite);
    sprite.runAction( cc.sequence(action, callback) );

    return sprite;
}

module.exports = {
    createEffect: createEffect
}