// GLOBALE VARS, DON'T FUCK WITH THESE YOU ASSHAT //
var readout_edit_prev_text = "";
var submitNewWord = false;
var editing = false;
// GLOBALE VARS, DON'T FUCK WITH THESE YOU ASSHAT // 

function spanClicked(){
	
	$("#readOut span").click(function(){
		if(!$(this).hasClass('editing')){
		jaxGetAssoc($(this).html());
		
		readout_edit_prev_text = $(this).html();
		$('span.editing').removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder');
		$(this).addClass('editing').attr('contenteditable','true').attr('placeholder',$(this).html());
		$(this).empty();
		
		
		$('#readOut span.editing').keypress(function(e){ 
			var code = e.keyCode || e.which;
			 	if(code == 13) {
				if(submitNewWord == false){
				submitNewWord = true; 
				e.preventDefault();
				input = $(this).html();
				$(this).html(readout_edit_prev_text);
				$(this).removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder').addClass('marked');
				if(input !== readout_edit_prev_text){
					var str1 = readout_edit_prev_text;
					jaxAddHypoCon(str1,input,'false');
					jaxAddInput(input);
				}}
			}});
			
		$(this).blur(function(){
			if($(this).html() == ""){$(this).html(readout_edit_prev_text)}
			$(this).removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder');
			});
		
		setTimeout(function(){$('#readOut span.editing').focus()},20);
		
		}});
	
	}

function spanClicked2(){
	
	$("#assoc span").click(function(){
		if(!$(this).hasClass('editing')){
		
		readout_edit_prev_text = $(this).html();
		$('span.editing').removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder');
		$(this).addClass('editing').attr('contenteditable','true').attr('placeholder',$(this).html());
		$(this).empty();
		
		
		$('span.editing').keypress(function(e){ 
			var code = e.keyCode || e.which;
			 	if(code == 13) {
				if(submitNewWord == false){
				e.preventDefault();
				$(this).removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder');
				var id = $(this).parent('.assoc-res').attr('id').replace('res-','');
				if($(this).html() !== readout_edit_prev_text){
					var str1 = readout_edit_prev_text;
					var str2 = $(this).html();
					jaxAddHypoCon(str1,str2,id);
					console.log(id);
					
				}}
			}});
			
		$(this).blur(function(){
			if($(this).html() == ""){$(this).html(readout_edit_prev_text)}
			$(this).removeAttr('contenteditable').removeClass('editing').removeAttr('placeholder');
			});
		
		setTimeout(function(){$('span.editing').focus()},20);
		
		}});
	
	}
	
function spanDrag(){
	
	}

function jaxNewInput(input){
				var xmlhttp;
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
				else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
						$('#opgInput').val('');
						$('#assoc').empty();
						var spinput = input.split(' ').join('</span> <span>');
						$("#readOut").append('<div><span>'+spinput+'</span></div>');
						spanClicked();
						submitNewWord = false;
						console.log('returned New Input');
						}
					}
				xmlhttp.open("POST","db/newInput.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send('input='+input);			
	}
	

function jaxAddInput(input){
				var xmlhttp;
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
				else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
						submitNewWord = false;
						console.log('returned Add Input');
						var spinput = input.split(' ').join('</span> <span>');
						$("#readOut").append('<div><span>'+spinput+'</span></div>');
						spanClicked();
						}
					}
				xmlhttp.open("POST","db/newInput.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send('input='+input);			
	}
	

function jaxCheckUnix(){
				var xmlhttp;
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
				else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
						if(xmlhttp.response == 'yes'){
							jaxGetLatest();
							console.log('returned unix check');
							}
						}
					}
				xmlhttp.open("POST","db/checkUnix.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send();
				}
	

function jaxGetLatest(){
				var xmlhttp;
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
				else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
						$('#readOut').html('<div>'+xmlhttp.response+'</div>');
						spanClicked();
						console.log('returned get latest');
						
						}
					}
				xmlhttp.open("POST","db/getLatest.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send();			
	}
	
function jaxGetAssoc(input){
				$('#assoc').addClass('loading');
				var schminput = input.replace(' ','');
				var xmlhttp;
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
				else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
						$('#assoc').slideUp(100);
						setTimeout(function(){
							$('#assoc').html(xmlhttp.response).slideDown(100).removeClass('loading');
							spanClicked2();
							},100)
						console.log('returned Assoc');
						}
					}
				xmlhttp.open("POST","db/getAssoc.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send('input='+schminput);			
	}
	
function jaxAddHypoCon(str1,str2,id){
	var idstring = "";
	if(id !== 'false'){idstring = '&id='+id;}
	var xmlhttp;
	if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
	else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
	//retur
	console.log(xmlhttp.response);
	}
	}
	
	xmlhttp.open("POST","db/addHypoCon.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send('str1='+str1+'&str2='+str2+idstring);
	
	}
	
$(document).ready(function(){
	
	//Hent seneste
	jaxGetLatest();

	
	$('#opgInput').bind('keypress', function(e) {
		var code = e.keyCode || e.which;
 		if(code == 13) { //Enter keycode
			var input = $('#opgInput').val();
			if(input !== ''){
			jaxNewInput(input);
			}}
		});
			
		
	setInterval(function(){
		jaxCheckUnix();
		},2000);
	
	});