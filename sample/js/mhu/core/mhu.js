class MHU{
    constructor(){
        this.version = '0.1';
        this.author = 'jjlim@muhayu.com';
        this.name = '무하유 UI 코어';
    }


}

class MhuEvent extends MHU{
    constructor(){
        super();
        this.name = '무하유 Event 코어';
    }
}


/*=========================================================== [ Global Variables ] =======================================================================*/
const GlobalVars = {
    WindowInfo: {
        width: '',
        height: '',
    },
    ScrollInfo:{
        top:'',
        bottom:'',
        direction:'',
    },

}

/*=========================================================== [ Global Event Name ] =======================================================================*/
const GlobalEvent = {
    SCROLL:'scroll',
    RESIZE:'resize',
    MOUSE_WHEEL:'mousewheel'
};

export {
    MHU,
    MhuEvent,
    GlobalEvent,
    GlobalVars
}