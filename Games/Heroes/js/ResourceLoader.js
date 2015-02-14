/**
 * Created by vasil on 12/20/14.
 */

var ResourceLoader = Class.extend({
    init: function(resourses) {
        this.loaded = false;
        this.resources = $.extend({}, resourses);
    },
    load: function() {
        var cnt = 0;
        var _this = this;
        for (var i in this.resources) {
            cnt++;
            var img = new Image();
            img.onload = function() {
                cnt--;
                if (cnt == 0) {
                    _this.loaded = true;
                }
            };
            img.src = this.resources[i];
            this.resources[i] = img;
        }
    },
    get: function(key) {
        return this.resources[key];
    }

})
