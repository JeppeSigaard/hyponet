var doSpeak = function(event){
    
    var target = $(event.target),
        input = target.val()
        speak = $('.hyponet-speak');
    
    var brainLength = Object.keys(brainData).length;
    
    
    for (var l=0, i=brainLength; i>l; i--){
        
        
        speak.html(brainData[i]);
    } 
}