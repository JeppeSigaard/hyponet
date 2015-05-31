function updateBrainData(brainData,value,obj,data){
    if(value && value !== '' && data !== null){
    
        var pos = Object.keys(brainData).length + 1;
        brainData[pos] = value;
        console.log('value "' + value + '" added to brain');
        
        $.ajax({
            url : 'src/php/writeString.php',
            type : 'POST',
            data : data,
            dataType : 'json',
            success : function(response){  
            },
        });
        
    }
    
    if(obj && obj !== '' && data !== null){
        
        var pos = Object.keys(brainData).length + 1;
        brainData[pos] = obj;
        console.log('object "'+obj+'" added to brain');
        
        $.ajax({
            url : 'src/php/writeObject.php',
            type : 'POST',
            data : data,
            dataType : 'json',
            success : function(response){
            },
        });
    }
}