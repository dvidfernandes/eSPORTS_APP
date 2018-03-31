($(function(){
    var $container = $('#search-container'),
        $search = $('#main-search'),
        $search_cats = $('#search-bubbles'),
        $level1 = $('#search-bubbles-level-1'),
        $level1_car, $level2_car,
        $level2 = $('#search-bubbles-level-2'),
        filterClassPref = 'search-bubble',
        animating = false;

    if(!$('#header .search-container').hasClass('scroll-disabled')){
        $(window).scroll(function(){

            if($(window).scrollTop() >= 1 ){
                $('#header .search-container').addClass('opened');
            } else {
                $('#header .search-container').removeClass('opened');
            }
        });
    }

    var hint_text = 'Gravidez';
    var hint_text2 = 'Gravidez de risco';

    $search.on('keyup', function(){
        var val = $(this).val(), val1 = val.toLowerCase(), split = val1.split(' '),
            hint = $(this).siblings('.hint');


        $search_cats.find('.search-bubble').removeClass('search-bubble--enabled');
        $search_cats.find('.search-bubble').addClass('search-bubble--disabled');

        if( val !== '' ){
            $container.find('.search-wrapper').addClass('no-padding');
            $container.find('.read-more').fadeOut();
        } else {
            setTimeout(function(){$container.find('.search-wrapper').removeClass('no-padding');}, 250);
            $container.find('.read-more').fadeIn();
            hint.hide();
            $search_cats.find('.search-bubble').removeClass('search-bubble--disabled');
            $search_cats.find('.search-bubble').removeClass('search-bubble--enabled');
            return;
        }

        $('#search-results .search-results--list').fadeOut();
        $('#search-results .search-results--filters').fadeOut();
        $('#header-bubbles').slideUp();

        $search_cats.find('.search-bubble--active').removeClass('search-bubble--active');
        $search_cats.find('.search-bubble--inactive').removeClass('search-bubble--inactive');

        closeLevel1();

        if(hint_text.toLowerCase().indexOf(val.toLowerCase()) === 0){
            showResults("familia",true);
            hint.show();

            var tmp_text = val.split(''), hint_tmp = hint_text.split('');
            for( var i = 0; i < hint_text.length; i++ ){
                if( i < val.length ){
                    tmp_text[i] = val[i];
                } else {
                    tmp_text[i] = hint_tmp[i];
                }
            }
            hint.text(tmp_text.join(''));

            $search_cats.find('.search-bubble').addClass('search-bubble--disabled');
            $search_cats.find('.search-bubble.saude, .search-bubble.eventos-vida, .search-bubble.seg-social-main').removeClass('search-bubble--disabled');
        } else {
            if(hint_text2.toLowerCase().indexOf(val.toLowerCase()) === 0){
                showResults("maternidade",true);
            hint.show();

            var tmp_text = val.split(''), hint_tmp = hint_text2.split('');
            for( var i = 0; i < hint_text2.length; i++ ){
                if( i < val.length ){
                    tmp_text[i] = val[i];
                } else {
                    tmp_text[i] = hint_tmp[i];
                }
            }
            hint.text(tmp_text.join(''));

            $search_cats.find('.search-bubble').addClass('search-bubble--disabled');
            $search_cats.find('.search-bubble.saude, .search-bubble.eventos-vida, .search-bubble.seg-social-main').removeClass('search-bubble--disabled');
        }else{
            hint.hide();
        }
    }

    });

    function openLevel1(c){

        var d = $.Deferred(), newBubbles;

        $level1.show().addClass('open');

        if( c !== '') {
            newBubbles = $level1.find('.bubbles-placeholder .' + c );
        } else {
            newBubbles = [];
        }

        $level1_car = $level1.find('.owl-carousel').owlCarousel('destroy').empty().append(newBubbles.clone());

        if(newBubbles.length > 0){
            $level1_car = $level1.find('.owl-carousel').owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                items: 1,
                autoWidth: true,
                stagePadding: 200,
                navText: ['<img src="images/left_arrow.png" height="22"/>','<img src="images/right_arrow.png" height="22"/>']
            });
        }


        $level1.hide();

        $level1.find('.owl-carousel').css({opacity:0, visibility:'hidden'});
        $level1.slideDown(300, function(){
            $level1.find('.owl-carousel').css({visibility:'visible'}).animate({opacity:1}, 200, function(){
                d.resolve();
            });
        });

        return d.promise();
    }

    function closeLevel1(){
        var d = $.Deferred();
        $level1.slideUp(function(){
            d.resolve();
        });
        return d.promise();
    }

    function showResults(className, showFilters){
        var d = $.Deferred();
        $('#search-results .search-results--loader').hide();
        $('#search-results').children('.row').show();
        $('#search-results').fadeIn(function(){
            var $this = $(this);
            $('#search-results .search-results--loader').fadeIn(function(){

                $(this).fadeOut(function(){
                    $this.find('.search-result').addClass('hidden');
                    $this.find('.search-result.' + className).removeClass('hidden');
                    $this.find('.search-results--list').fadeIn();


                    if(showFilters){
                        $('#search-results').delay(500).find('.search-results--filters').fadeIn(function(){
                            var $that = $(this);

                            if(!$that.hasClass('has-waypoint')){
                                //$('#search-results-filters').waypoint({
                                $that.waypoint({
                                    handler: function(direction){
                                        //alert('teste')
                                        if(direction === 'down'){
                                            $('#header-filters').show();

                                        } else {
                                            $('#header-filters').hide();

                                        }
                                    },
                                    offset: 239
                                });
                                $that.addClass('has-waypoint');
                            }

                            $this.find('.search-results--list').slideDown();
                        });
                    }

                    d.resolve();
                });
            });
        });

        return d.promise();
    }

    $search_cats.find('.search-bubble').on('click', function(event){
        event.preventDefault();

        if($(this).hasClass(filterClassPref+'--disabled')){ return false;}

        if(animating) { return false };
        animating = true;

        $(this).siblings().addClass(filterClassPref + '--inactive').removeClass(filterClassPref+'--active');
        $(this).removeClass(filterClassPref + '--inactive').addClass(filterClassPref + '--active');

        var className = $(this)[0].className.split(' ');

        className = $.map($(this)[0].className.split(' '), function(value){
                if(value.indexOf(filterClassPref) === -1){
                    return value;
                }
        }).join('');

        $container.find('.search-wrapper').addClass('no-padding');
        $container.find('.read-more').fadeOut();

        $search_cats.find('.search-bubble.search-bubble--active').removeClass('search-bubble--active');
        $level1.find('.search-bubble.search-bubble--active').removeClass('search-bubble--active');
        $search_cats.find(event.target).addClass(filterClassPref + '--active');

        $('#search-results .search-results--list').fadeOut();
        $('#search-results .search-results--filters').fadeOut();
        $('#header-bubbles').slideUp();

        if($level1.hasClass('open')){
            $.when(closeLevel1()).then(function(){
                $.when(openLevel1(className)).then(function(){
                    animating = false;
                    showResults(className);
                });
            });
        } else {
            $.when(openLevel1(className)).then(function(){
                animating = false;
                showResults(className);
            });
        }

        return;
    });

    $(document).on('click', '#search-bubbles-level-1 .search-bubble', function(event){
        event.preventDefault();

        var $level1 = $('#search-bubbles-level-1');

        if(animating) { return false };
        animating = true;

        var className = $(this).attr('href').replace('#','');

        $level1.find('.search-bubble.search-bubble--active').removeClass('search-bubble--active');
        $(event.target).addClass(filterClassPref + '--active');


        $level1_car.trigger('to.owl.carousel', $level1.find('.search-bubble.search-bubble--active').parent().index());

        $('#search-results .search-results--filters').fadeOut();
        $('#search-results .search-results--list').fadeOut(function(){
            showResults(className, true).then(function(){
                $("html, body").animate({scrollTop: $('#search-results').offset().top - 239 + 10 }, 500, 'swing', function(){});
            });

            animating = false;
        });

        $('#search-bubbles-results')
            .empty()
            .show()
            .append($search_cats.find('.search-bubble--active').clone())
            .append($('#search-bubbles-level-1').find('.search-bubble--active').clone())

        $('#search-bubbles-results').find('.search-bubble--active').removeClass('search-bubble--active').addClass('nmb');

        $('#header-filters').find('.wrapper').html($('#search-results-filters').clone().removeAttr('id').show()).removeClass('np');
        $('#header-bubbles').slideDown();
    });
}));
