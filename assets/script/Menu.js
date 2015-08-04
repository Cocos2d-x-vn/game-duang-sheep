Fire.Class({
    extends: Fire.Behavior,
    onLoad: function() {
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(900, 640, policy);
    }
});
