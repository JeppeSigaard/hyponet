// opret alle substrings af string
function makeSubstrings(string){ 
    
    var returnArray = new Array();

    for(var i = 0; i<string.length +1; i++){
    
        returnArray[i] = Array();
        
        for (var s = 0; s<string.length +1; s++){
            
            var newVal = string.substring(s,s+i);
            
            if(newVal !== '' && newVal !== ' ' && newVal.length >= i){
                
                returnArray[i][s] = newVal;
            
            }
        }
    }
    
    var merged = [];
    
    merged = merged.concat.apply(merged, returnArray);
    
    return merged;

}


// find array max
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

// sort by number
function sortNumber(a,b) {
    return a - b;
}