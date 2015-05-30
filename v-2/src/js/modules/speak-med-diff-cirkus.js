var diff = {},
output;
function loopThroughBrainForExactMatch(brainData,brainLength,input,output){
    
    var old_output = output;
    
    for (var i=0, l=brainLength; i<l; i++){
        
        // Unbreak proto
        if (!brainData.hasOwnProperty(i)) {continue;}
        
        if($.type(brainData[i]) !== 'string'){
            
            diff = JsDiff.diffWords(brainData[i].one, brainData[i].two);
            
            if(brainData[i].one.toLowerCase() === input.toLowerCase()){
                
                output = '';
                for (var key in diff) {
                    if (diff.hasOwnProperty(key)) {

                        if(diff[key].added === true){

                            output += diff[key].value + ' ';             
                        }
                    }
                }
                
                
            }
            
            if (brainData[i].two.toLowerCase() === input.toLowerCase()){
                output = '';
                for (var key in diff) {
                    if (diff.hasOwnProperty(key)) {

                        if(diff[key].removed === true){

                            output += diff[key].value + ' ';
                        }
                    }
                }
            }
        }
    }
    output = output.trim();
    console.log(old_output+' : '+output);
    
    if(old_output !== output){
        loopThroughBrainForExactMatch(brainData,brainLength,output,output);
    }
    else{
        return;
    }
}

var doSpeak = function(event){
    
    var target = $(event.target),
        input = target.val(),
        speak = $('.hyponet-speak'),
        brainLength = Object.keys(brainData).length;
    
    // Ryd speak
    speak.html('');
    
    // returner hvis input er tomt
    if(input === ''){return;}
    loopThroughBrainForExactMatch(brainData,brainLength,input,output);
    
    
    
    if(output === ''){
    
        // Tæl ord
        inputArray = input.trim().split(' ');
        inputCount = Array();
        var arrayLength = inputArray.length;
        
        for (var count = 0; count < arrayLength; count++) {
            if (!inputArray.hasOwnProperty(count) || $.type(brainData[count]) === undefined ) {continue;}
            
            inputCount[count] = 0; 
            
            for (var i=0, l=brainLength; i<l; i++){
                if (!brainData.hasOwnProperty(i)) {continue;}
                
                if($.type(brainData[i]) === 'string'){
                    /*
                    var str = brainData[i].toLowerCase(),
                    word = inputArray[count].toLowerCase();
                
                    if ((str.indexOf(word)+1) > 0){
                        inputCount[count] += 1;
                    };
                    */
                    
                    continue;
                }
                
                else{
                    
                    var str = brainData[i].one.toLowerCase() + ' ' + brainData[i].two.toLowerCase(),
                    word = inputArray[count].toLowerCase()+' ';
                
                    if ((str.indexOf(word)+1) > 0){
                        
                        inputCount[count] += 1;
                    };
                    
                }
                
            }
        }
        
        console.log(inputCount);
    }
    
    for (var i=0, l=brainLength; i<l; i++){
    }
    
    // Hvis intet resultat, returner et spørgsmålstegn
    if(output === ''){output = '-';}
    speak.html(output);
}