
    $('#chatbot-trigger').on('click', function(event){
        closeAudiosAuth();
        if (typeof chat2 !== 'undefined')chat2.play();
        event.preventDefault();
        var $chatbot = $('#chatbot');

        if($chatbot.hasClass('open')){
            $('#chatbot-trigger').find("i").removeClass("fa-times");
            $('#chatbot-trigger').find("i").addClass("chatIcon");
            $('#chatbot-trigger').removeClass("chatOpen");
            $('#chatbot-trigger').addClass("chatClosed");
            $chatbot.stop().fadeOut(function(){
                $(this).removeClass('open');
                $(".message-block").remove();
            });
        } else {
            $('#chatbot-trigger').find("i").addClass("fa-times");
            $('#chatbot-trigger').find("i").removeClass("chatIcon");
            $('#chatbot-trigger').addClass("chatOpen");
            $('#chatbot-trigger').removeClass("chatClosed");
            $chatbot.stop().fadeIn(function(){
                $(this).addClass('open');
                $('#chatbot .message-waiting').stop().fadeIn(); 
                setTimeout(function(){ 
                    printMessage('Olá! Eu sou o Assistente Virtualdo Portal do Cidadão.'); 
                    $('#chatbot .message-waiting').stop().fadeIn();
                    setTimeout(function(){  printMessage('Se precisar de algum ajuda, escreva o que precisa. Para uma ajuda mais eficaz, coloque as questões individualmente.'); },2000);
                },1000);
            });
        }
    });

    function send(event){
        event.preventDefault();
        var wrapper = $('#chatbot .chat-wrapper');
        var val = $('#chatbot-input').val();
        var chat = $('#chatbot .chat');
        var html = '<div class="message-block"><p class="message in"><span>' + $('#chatbot-input').val() + '</span></p></div>';


        if(wrapper.height() > wrapper.parent().height()){
            chat.scrollTop(wrapper.outerHeight()-wrapper.parent().outerHeight() );
        }

        $('#chatbot-input').val('').focus();

        $(html).insertBefore($('#chatbot .chat-wrapper .message-waiting'));
        var element = $(".chat");
        element[0].scrollTop = element[0].scrollHeight;

        sendResponse(val);
    }

    $("#chatbot-input").keypress(function(e) {
        if(e.which == 13) {
            send(e);
        }
    });

    $('#chatbot-send').on('click', function(event){
        send(event);
    });

    function printMessage(mensagem){
        $('#chatbot .message-waiting').stop().hide();

        var html = '<div class="message-block"><p class="message out"><span>' + mensagem + '</span></p></div>';
        $(html).insertBefore($('#chatbot .chat-wrapper .message-waiting'));

    }

    function sendResponse(val){

        var mensagem = '';

        var split = val.toLowerCase().split(' ');

            console.log($.inArray('mudar', split));

            if( ($.inArray('mudar', split) > -1  ||
                $.inArray('alterar', split) > -1||
                $.inArray('mudança', split) > -1||
                $.inArray('mudanca', split) > -1||
                $.inArray('alteração', split) > -1||
                $.inArray('alteracao', split) > -1||
                $.inArray('alteracão', split) > -1||
                $.inArray('alteraçao', split) > -1 ) &&
                $.isArray('morada', split) > -1 ){

                closeAudiosAuth();
                if (typeof chat4 !== 'undefined')chat4.play();

                $('#chatbot .message-waiting').stop().fadeIn(); 
                var element = $(".chat");
                element[0].scrollTop = element[0].scrollHeight;
                setTimeout(function(){ 
                    printMessage('Alterar a morada no cartão de cidadão é um processo rápido e simples, com apenas 3 passos.');
                    var element = $(".chat");
                    element[0].scrollTop = element[0].scrollHeight; 
                    $('#chatbot .message-waiting').stop().fadeIn();
                    var element = $(".chat");
                    element[0].scrollTop = element[0].scrollHeight;
                    setTimeout(function(){  
                        printMessage('Escolha uma das opções:'); 
                        var element = $(".chat");
                        element[0].scrollTop = element[0].scrollHeight;
                        setTimeout(function(){  
                            var html = '<a href="/alteracao-morada.html" class="search-bubble">Alteração da minha morada</a><a href="./alteracao-morada.html" class="search-bubble">Alteração da morada por terceiros</a>';
                            $(html).insertBefore($('#chatbot .chat-wrapper .message-waiting'));
                            var element = $(".chat");
                            element[0].scrollTop = element[0].scrollHeight;
                        },500);
                    },2000);
                },2000);
                

            } else {
                $('#chatbot .message-waiting').stop().fadeIn(); 
                var element = $(".chat");
                element[0].scrollTop = element[0].scrollHeight;
                setTimeout(function(){ 
                    printMessage('Não percebi, pode explicar me por outras palavras?');
                    var element = $(".chat");
                    element[0].scrollTop = element[0].scrollHeight;
                },3000);
            }

    }

