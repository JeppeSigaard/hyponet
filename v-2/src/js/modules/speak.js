var output = '',old_output = '';


function makeOutput(brainData,brainLength,input,output,speak){
    
    old_output = output;
    
    for (var i=0, l=brainLength; i<l; i++){
        
        // Unbreak proto
        if (!brainData.hasOwnProperty(i)) {continue;}
        
        if($.type(brainData[i]) !== 'string' || brainData[i] !== null ){
        
            if(brainData[i].one.toLowerCase() === input.toLowerCase()){
                output = brainData[i].two;
            }
        }
    }
    
    if(output !== '' && old_output !== output){
        makeOutput(brainData,brainLength,output,output,speak);
    }
    
    else{
    
        if(output === ''|| !output){

            // opret samtlige mulige substrings 
            inputArray = makeSubstrings(input);
            
            // Tæl alle tilstedeværelser af uddybelser af hver tegnsætning i hjernen
            var inputCount = Array();
            var arrayLength = inputArray.length;

            for (var count = 0; count < arrayLength; count++) {
                if (!inputArray.hasOwnProperty(count) || $.type(brainData[count]) === undefined ) {continue;}

                inputCount[count] = 0; 

                for (var i=0, l=brainLength; i<l; i++){
                    if (!brainData.hasOwnProperty(i)) {continue;}

                    else if($.type(brainData[i]) === 'string'){
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

                        var str = brainData[i].one.toLowerCase(),
                            word = inputArray[count].toLowerCase();

                        if ((str.indexOf(word)+1) > 0){
                            
                            var diff = JsDiff.diffWords(brainData[i].one, brainData[i].two),
                                replaced = '';
                            
                            diff.forEach(function(part){
                                replaced += part.removed ? part.value : '';
                                
                            });
                            
                            if(replaced.toLowerCase() === word){
                                inputCount[count] += 1;
                            }
                        };

                    }
                }
            }
            
            var resultArray = new Array();
            for (var i = 0; i < inputArray.length; i++){
                resultArray[inputArray[i]] = inputCount[i];
            }
            
            var biggestWord = '',
                biggestWordSize = 1;
            for(var key in resultArray){
            
                if( resultArray[key] >= biggestWordSize){
                    
                    biggestWord = key;
                    biggestWordSize = resultArray[key];
                }
                
            }
            if(biggestWord !== ''){
                for (var i=0, l=brainLength; i<l; i++){
                    if (!brainData.hasOwnProperty(i)) {continue;}

                    else if($.type(brainData[i]) === 'string'){}

                    else{

                        if( brainData[i].one.toLowerCase().indexOf(biggestWord) >= 0){

                            output = brainData[i].two;
                        }

                    }
                }
            }
            
        }
    
        // Hvis intet resultat, returner et spørgsmålstegn
        if(output === '' || !output){output = '?';}
        
        //else{updateBrainData(brainData,output,false,{data:output});}
        
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