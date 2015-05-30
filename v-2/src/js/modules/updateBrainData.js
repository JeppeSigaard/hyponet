function updateBrainData(brainData,value,obj){
    if(value && value !== ''){
    
        var pos = Object.keys(brainData).length + 1;
        brainData[pos] = value;
    }
    
    if(obj && obj !== ''){
        
        var pos = Object.keys(brainData).length + 1;
        brainData[pos] = obj;
    }
}