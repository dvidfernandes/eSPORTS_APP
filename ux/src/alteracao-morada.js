(function(){


	initAlteracaoMorada();

	$('.radio-choose-morada').on("click",function() {
		$('.radio-choose-morada').closest(".caixa").removeClass("caixa-selected");
  		$('.radio-choose-morada:checked').closest(".caixa").addClass("caixa-selected");
	});


	function initAlteracaoMorada(){
		$('.radio-choose-morada:checked').closest(".caixa").addClass("caixa-selected");
		$(".successButton").hide();
	}

	$('#validar4c').on("click",validar);

    $(".code4Validated").on("click", function(){
        closeSoundsMorada();
        morada4.play();
    });

    $(".concluir-button").on("click", function(){
        closeSoundsMorada();
        morada9.play();
    });

    $(".go-to-3").on("click", function(){
        closeSoundsMorada();
        morada8.play();
        var id = $("#novaMorada2").find(".map").attr('id');
        var m;

        if(!id){ id = 'map' + (new Date().getTime()); $(this).attr('id', id); }

        m = new GMaps({div: '#' + id,lat: 38.720763,lng: -9.145881});

        m.addMarker({lat: 38.720763,lng: -9.145881});
    });


	function validar(){
        var l = $("#inputCod4").val().length;
        if(l===4){
            closeSoundsMorada();
            morada3.play();
            $('#validar4c').closest(".form-group").addClass("success");
            $(".successButton").show();
            $('#validar4c').hide();
            $(".code4Validated").show();
        }else{
            $('#validar4c').closest(".form-group").removeClass("success");
        }
    }
})();

function handEdit(){
    $(".form-control").prop('disabled', false);
    $(".disabled").removeClass("disabled")
}
