var doSpeak = function(event){
    
    var target = $(event.target),
        input = target.val()
        speak = $('.hyponet-speak'),
        brainLength = Object.keys(brainData).length,
        diff = {},
        output = '';
    
    // Ryd speak
    speak.html('');
    
    // returner hvis input er tomt
    if(input === ''){speak.html('');return;}
    
    
    
    for (var i=0, l=brainLength; i<l; i++){
        
        // Unbreak proto
        if (!brainData.hasOwnProperty(i)) {continue;}
        
        if($.type(brainData[i]) !== 'string'){
            
            diff = JsDiff.diffWords(brainData[i].one, brainData[i].two);
            
            if(brainData[i].one.toLowerCase() === input.toLowerCase()){
                
                
                for (var key in diff) {
                    if (diff.hasOwnProperty(key)) {

                        if(diff[key].added === true){

                            output += diff[key].value + ' ';
                            console.log(diff);
                            
                        }
                    }
                }
                
                
            }
            
            if (brainData[i].two.toLowerCase() === input.toLowerCase()){
                
                for (var key in diff) {
                    if (diff.hasOwnProperty(key)) {

                        if(diff[key].removed === true){

                            output += diff[key].value + ' ';
                            console.log(diff);
                            
                        }
                    }
                }
            }
        }
    }
    
    
    // Hvis intet resultat, returner et spørgsmålstegn
    if(output === ''){output = '?';}
    speak.html(output);
}