var submitObject = function(one,two,obj){
    
    var data = {
        'one' : one,
        'two' : two, 
    }
    updateBrainData(brainData,data.two,data,data);
    
}

var clickhandlerLog = function(log){

    var one,two;
    
    log.on('click',function(event){
        var target = $(event.target);
        if ( !target.is('.editing') && target.is('div') ){
            
            
            $('.editing').removeClass('editing').removeAttr('contentEditable').html(one);
            
            
            one = target.html(),
            two = '';
            
            target.attr('contentEditable',true).addClass('editing');
        
        }
    }).on('keypress',function(event){
        var target = $(event.target);
        if(target.is('.editing') && target.is('div')){
            
            if ( event.which == 13 ){
                
                event.preventDefault();
                target.removeClass('editing').removeAttr('contentEditable').blur();
                two = target.html().replace('  ',' ').trim();
                submitObject(one,two,target);
                
                one = '';
                two = '';
            }
        }

    });
}