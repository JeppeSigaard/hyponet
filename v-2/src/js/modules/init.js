$(function(){

    // Hent hjernen
    var brain = $.getJSON('src/data/brain.json'),
        brainData;
    
    // Tjek at der findes en hjerne
    brain.fail(function(){console.log('Error fetching brain');});

    // opret hyponet container, hvis den mangler
    if(!$('#hyponet').length){
        console.log('container not found, auto creating');
        var hyponet = $('<div id="hyponet"></div>');
        $('body').prepend(hyponet);
    }
    // Definer container
    var hyponet = $('#hyponet');
    
    
    // definer styleheet
    var style = $('<link>');
    style.attr({
        'rel':'stylesheet',
        'href': 'src/css/style.css',
    });
    
    $('head').append(style);
    
    
    
    // Hjernen er klar
    brain.done(function(){
    
        // Kontruer log
        var log = $('<div class="hyponet-log"></div>'),
            logWrap = $('<div class="hyponet-log-wrapper"></div>');
        brainData = brain.responseJSON;
        var brainLength = Object.keys(brainData).length,
            brainIteration = 0;
        
        $.each(brainData, function(i, val) {
            
            if($.type(val) !== 'string'){
                brainLength --;
            }
            
            else {
                brainIteration ++;
                if(brainIteration > brainLength - 10){
                    log.append('<div>'+val+'</div>');
                }
            }
        });
        
        logWrap.append(log);
        hyponet.append(logWrap);
        clickhandlerLog(log);
    
    
        // Konstruer form
        var form = $('<form class="hyponet-form"></form>'),
            input = $('<input type="text" name="data">'),
            send = $('<a href="#">send</a>');
        form.append(input).append(send);
        hyponet.append(form);
        clickhandlerForm(form,log);
        
        
        // Konstruer talerør
        var speak = $('<div class="hyponet-speak"></div>');
        hyponet.append(speak);
    });
});