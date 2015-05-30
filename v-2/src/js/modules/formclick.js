var clickhandlerForm = function(form,log){
form.on('click keypress',function(event){
    
    var target = $(event.target),
        input = form.children('input');
    
    
    
    if(target.is('a') || event.which == 13){
    
        event.preventDefault();
        
        var log_obj = $('<div></div>');
        log_obj.append(input.val());
        log.append(log_obj);
        
        var data = form.serialize();
    
        input.val('');
        
        $.ajax({
            url : 'src/php/writeString.php',
            type : 'POST',
            data : data,
            dataType : 'json',
            success : function(response){
                
                
            },
        });
        
    }

});

}