$(document).ready(function(){

	/*$( "#reset" ).click(inputContent);

	function inputContent(content){
		this.content = $("#inputTextField").val();
		alert( this.content );
	}*/
	var alertInfo = $("#inputTextField").val();
	
	$(function() {
		$("#reset").click(postRequest);
	});

	/*function inputContent(content){
		this.content = $("#inputTextField").val();
	}*/


function postRequest () {

     $.ajax({
         method: "GET",
         url: "http://localhost:8080/api/",
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         data:{format:'json'},
         success: function (data, status, jqXHR) {
              alert(data);
         },
     
         error: function (jqXHR, status) {            
              // error handler
              alert(status);
         }

     });
}

});