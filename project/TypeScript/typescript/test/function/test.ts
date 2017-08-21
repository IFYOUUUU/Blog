/**
 * Created by Administrator on 2017/8/21.
 */
var shape = {
    name:"rectangle",
    popup:function(){
        console.log('this inside popup():' + this.name);

        setTimeout(()=>{
            console.log('this inside setTimeOut():' + this.name);
            console.log("I'm a " + this.name);
        },3000);
    }
}