var output,old_output;
function makeOutput(brainData,brainLength,input,output,speak){
    
    old_output = output;
    
    for (var i=0, l=brainLength; i<l; i++){
        
        // Unbreak proto
        if (!brainData.hasOwnProperty(i)) {continue;}
        
        if($.type(brainData[i]) !== 'string'){
        
            if(brainData[i].one.toLowerCase() === input.toLowerCase()){
                output = brainData[i].two;
            }
        }
    }
    
    if(old_output !== output){
        makeOutput(brainData,brainLength,output,output,speak);
    }
    
    else{
    
        if(output === ''|| !output){

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
    
        // Hvis intet resultat, returner et spørgsmålstegn
        if(output === '' || !output){output = '?';}


        speak.html(output);
    
    
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
    
    
    makeOutput(brainData,brainLength,input,output,speak);
}