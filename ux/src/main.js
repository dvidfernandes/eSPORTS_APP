init();

(function(){

    $("#top-search").keypress(function(e) {
        if(e.which == 13) {
            var search = $("#top-search").val();
            window.location.href = './results.html?search='+search; //relative to domain
        }
    });

    $("#main-search").keypress(function(e) {
        var search = $("#main-search").val();

        if(e.which == 13) {
            window.location.href = './results.html?search='+search; //relative to domain
        }
    });

    $("#main-search").keyup(function(e) {
        
        if (typeof pesq2B !== 'undefined'){
            if(!pesq2B){
                closeAudios();
                if (typeof pesq2 !== 'undefined')pesq2.play();
                pesq2B =true;
            }
        }
        
        
        var search = $("#main-search").val();
        var substring = "gravidez de risco";
        console.log(search);
        if(search.includes(substring)){
            //var audio3 = new Audio('./sounds/Gravação3.m4a');
            //audio3.play();
        }
    });

    $('.input-group input[type="text"]').on('focus', function(){
        $(this).closest('.input-group').addClass('is-focused');
    });

    $('.input-group input[type="text"]').on('blur', function(){
        $(this).closest('.input-group').removeClass('is-focused');
    });

    $('.form-group input[type="text"]').on('focus', function(){
        $(this).closest('.form-group').addClass('is-focused');
    });

    $('.form-group input[type="text"]').on('blur', function(){
        $(this).closest('.form-group').removeClass('is-focused');
    });

    $('#footer .langs-select select.select2').select2().on('select2:open', function(){
        $('body > .select2-container--open').addClass('langs')
    });

    function restartSelect( target ){
        var select = target.find('select.select2.form-control');

        select.each(function(){
            $(this).select2().select2('destroy').next('.select2-container').remove();
        });
        select.select2();
    }

    $('#noticias-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 4,
        dots: true,
        slideBy: 4,
        navText: ['<img src="images/left_arrow.png" height="22"/>','<img src="images/right_arrow.png" height="22"/>']
    });

    // alteracao de morada
    (function(){
        var $container = $('#alteracao-morada'),
            $controls = $('#alteracao-morada-controls'),
            $next_btns = $container.find('.btn.next'),
            $back_btns = $container.find('.btn.back'),
            $active_step,
            current_step = 0;

            $back_btns.on('click', function(event){
                event.preventDefault();
                $active_step = $container.find('.step.active');

                $container.height($active_step.height());



                $active_step.fadeOut(function(){
                    var $next, h;
                    $(this).removeClass('active');

                    // atualiza a barra de progresso
                    $controls.removeClass('step'+(current_step-1));
                    $controls.find('.progress-label label').eq(current_step).removeClass('completed');
                    current_step -= 1;
                    $controls.addClass('step'+(current_step-1));

                    console.log(current_step)

                    $next = $container.find('.step').eq(current_step);
                    $next.show();
                    h = $next.height();
                    $next.hide();

                    $("html, body").stop().animate({scrollTop:$('#alteracao-morada-header').offset().top - 30}, 500, 'swing', function() {
                        //alert("Finished animating");
                    });

                    $container.stop().delay(500).animate({height:h}, function(){
                        $next.show();
                        restartSelect($next);
                        $next.hide();

                        console.log($next);

                        $next.fadeIn(function(){
                            $container.css('height','auto');
                            $(this).addClass('active');

                            _transitionCompleted.call(null, current_step-1, $next);

                            return;
                        });
                    });
                });
            });

            $next_btns.on('click', function(event){
                event.preventDefault();
                $active_step = $container.find('.step.active');

                $container.height($active_step.height());



                $active_step.fadeOut(function(){
                    var $next, h;
                    $(this).removeClass('active');

                    // atualiza a barra de progresso
                    $controls.removeClass('step'+(current_step+1));
                    $controls.find('.progress-label label').eq(current_step).addClass('completed');
                    current_step += 1;
                    $controls.addClass('step'+(current_step+1));

                    console.log(current_step)

                    $next = $container.find('.step').eq(current_step);
                    $next.show();
                    h = $next.height();
                    $next.hide();

                    $("html, body").stop().animate({scrollTop:$('#alteracao-morada-header').offset().top - 30}, 500, 'swing', function() {
                        //alert("Finished animating");
                    });

                    $container.stop().delay(500).animate({height:h}, function(){
                        $next.show();
                        restartSelect($next);
                        $next.hide();

                        console.log($next);

                        $next.fadeIn(function(){
                            $container.css('height','auto');
                            $(this).addClass('active');

                            _transitionCompleted.call(null, current_step, $next);

                            return;
                        });
                    });
                });
            });

            function _transitionCompleted( step, section ){
                var maps = [];

                if(section.hasClass('loaded')){ return; }

                section.addClass('loaded');

                //console.log(section.find('.map'))

                section.find('.map').each(function(){
                    var lat = $(this).attr('data-lat'),
                        lng = $(this).attr('data-lng'),
                        id = $(this).attr('id'),
                        m;

                        if(!id){ id = 'map' + (new Date().getTime()); $(this).attr('id', id); }

                        if(!lat){
                            GMaps.geolocate({
                              success: function(position) {
                                    lat = position.coords.latitude;
                                    lng = position.coords.longitude;
                                    m = new GMaps({
                                        div: '#' + id,
                                        lat: lat,
                                        lng: lng
                                    });

                                    m.addMarker({
                                        lat: lat,
                                        lng: lng
                                    })
                              },
                              error: function(error) {
                                //alert('Geolocation failed: '+error.message);
                              },
                              not_supported: function() {
                                //alert("Your browser does not support geolocation");
                              },
                              always: function() {
                                //alert("Done!");
                              }
                            });
                        }else {
                            m = new GMaps({
                                div: '#' + id,
                                lat: lat,
                                lng: lng
                            });

                            m.addMarker({
                                lat: lat,
                                lng: lng
                            })
                        }
                });
            }

            _transitionCompleted(current_step,$container.find('.step.active'));

        return;

    })();


})();


    function pesquisarMorada(){

        $(".form-need-to-write").prop('disabled', false);

        $("#adress").val("Avenida da Liberdade");
        $("#selectFreguesia").val("Rato").trigger('change');
        $("#selectConcelho").val("Lisboa").trigger('change');
        $("#selectDistrito").val("Lisboa").trigger('change');
        var id = $("#novaMorada").find(".map").attr('id');
        var m;

        if(!id){ id = 'map' + (new Date().getTime()); $(this).attr('id', id); }

        m = new GMaps({div: '#' + id,lat: 38.720763,lng: -9.145881});

        m.addMarker({lat: 38.720763,lng: -9.145881});

    }

    function validateComplete(size,origin,next){
        var l = $("#"+origin).val().length;
        if(l >= size){
           $("#"+next).focus();
        }
    }

    function init(){
        $(".code4Validated").hide();
        $(".results").hide();
    }

    function updateSearch(elm){
        var val = $(elm).val().toLowerCase(), l = $(elm).val().length;

        if(l<2){$('.labels-container span.label').css('opacity',1);return;}

        $('.labels-container span.label').each(function(){

            var $this = $(this), txt = $this.text().toLowerCase();

            if(txt.indexOf(val) > -1){
                $this.css('opacity',1);
            } else {
                $this.css('opacity',0.2);
            }
        });

        /*
        if(l > 0){
            $(".myLabel2").show();
            $(".myLabel4").show();
            $(".myLabel8").show();
            $(".results").hide();
            if(l > 2){
                $(".myLabel2").hide();
                $(".results").show();
                if(l > 4){
                    $(".myLabel4").hide();
                    if(l > 8){
                        $(".myLabel8").hide();
                    }
                }
            }
        }
        */
    }

/*
$('#input-search-wrapper').waypoint({
    handler: function(direction) {
        if(direction === 'down'){
            $('#header .search').stop().slideDown(200);
            $('#search-container .search-container').css({opacity:0.2});
            $('#search-container .search-bubbles--container').css({opacity:0.2});
        } else {
            $('#header .search').stop().slideUp(200);
            $('#search-container .search-container').css({opacity:1});
            $('#search-container .search-bubbles--container').css({opacity:1});
        }
    },
    offset: (101 + 20)
});*/


$('#search-container .read-more').on('click', function(event){
    event.preventDefault();
    $("html, body").animate({scrollTop: $('body > .wrapper').offset().top - 184 }, 500, 'swing');
});

function closeAudios(){
    if (typeof intro !== 'undefined')intro.pause();
    if (typeof intro2 !== 'undefined')intro2.pause();
    if (typeof intro3 !== 'undefined')intro3.pause();
    if (typeof pesq1 !== 'undefined')pesq1.pause();
    if (typeof autenticar1 !== 'undefined')autenticar1.pause();

    if (typeof chat1 !== 'undefined')chat1.pause();
    if (typeof chat2 !== 'undefined')chat2.pause();
}

function closeAudiosAuth(){
    if (typeof chat1 !== 'undefined')chat1.pause();
    if (typeof chat2 !== 'undefined')chat2.pause();
    if (typeof chat3 !== 'undefined')chat3.pause();
}
