(function($) {

    skel
        .breakpoints({
            desktop: '(min-width: 737px)',
            tablet: '(min-width: 737px) and (max-width: 1200px)',
            mobile: '(max-width: 736px)'
        })
        .viewport({
            breakpoints: {
                tablet: {
                    width: 1080
                }
            }
        });

    $(function() {

        var	$window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function() {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });

        // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            alignment: 'center'
        });

        // Off-Canvas Navigation.

        // Title Bar.
        $(
                '<div id="titleBar">' +
                '<a href="#navPanel" class="toggle"></a>' +
                '</div>'
        )
            .appendTo($body);

        // Navigation Panel.
        $(
                '<div id="navPanel">' +
                '<nav>' +
                $('#nav').navList() +
                '</nav>' +
                '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#titleBar, #navPanel, #page-wrapper')
                .css('transition', 'none');

    });
    $('.single-item').slick(
        {
            arrows: false,
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000
        }
    );
    function formTester(){
        var form    = $("#form");
        var tested  =(typeof $("#miel").value == "undefined");
        var data    = {};

        //limiar campos obligatorios del texto Default.
        var flag=0,campos=["#nombre","#email","#telefono","#message"];

        //Comprobar contenido de los campos y mostrar alerta si es necesario.
        var alerta="Necesario indicar: ";//Texto a completar.

        for(i=0;i<campos.length;i++){
            if($(campos[i])[0].value == ""){
                alerta+=$(campos[i]).attr('placeholder') + " ";
            }else{
                var campo = campos[i].substring(1,campos[i].length);//limpia la # del campo
                data[campo] = $(campos[i])[0].value;
                flag++
            }
        }
        if(tested===true && flag == campos.length){
            //form.action="/contact.php";//Si todos los campos están completados se envía al servidor, donde se comprobarán de nuevo.
            $("#loading").addClass("loading-on");
            $("#response").text("Enviando...");
            $.ajax({
                url: "contact.php",
                method: "POST",
                data: data,
                dataType: "json"
            }).done(function(res){
                $("#loading").removeClass("loading-on");
                $("#response").text(res.msg);
                if(res.focus){
                    $( res.focus ).focus();
                }
            }).fail(function(err){
                $("#loading").removeClass("loading-on");
                $("#response").text("Oops! Por favor, inténtelo más tarde.");
            });
        }else{
            alert(alerta);
        }
    }
    $("#submit").on('click',function(e){e.preventDefault();formTester()});
})(jQuery);

