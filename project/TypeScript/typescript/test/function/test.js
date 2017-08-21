/**
 * Created by Administrator on 2017/8/21.
 */
var shape = {
    name: "rectangle",
    popup: function () {
        var _this = this;
        console.log('this inside popup():' + this.name);
        setTimeout(function () {
            console.log('this inside setTimeOut():' + _this.name);
            console.log("I'm a " + _this.name);
        }, 3000);
    }
};
