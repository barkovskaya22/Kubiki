$(document).ready(function () {
    $('.menu-mobile').click(function () {
        $('nav ul').slideToggle('fast');
    })

        document.getElementById("scrollup").style.opacity = "0";
})

///20px show button when scroll
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollup").style.opacity = "1";
    } else {
        document.getElementById("scrollup").style.opacity = "0";
    }
}



//part

var d = document,
    $d = $(d),
    w = window,
    $w = $(w),
    wWidth = $w.width(),
    wHeight = $w.height(),
    credit = $('.credit > a'),
    particles = $('.particles'),
    particleCount = 20,
    sizes = [
      15, 20, 25, 35, 45
    ],
    colors = [
      'url(img/particuadrado_rojo.png)',
      'url(img/particuadrado.png)', 'url(img/particuadrado_turq.png',
      'url(img/particuadrado_vio.png)'
    ],

    mouseX = $w.width() / 2,
    mouseY = $w.height() / 2;

function updateParticleCount() {
    $('.particle-count > .number').text(particleCount);
};

$w
    .on('resize', function () {
        wWidth = $w.width();
        wHeight = $w.height();
    });

$d
    .on('mousemove touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
        mouseX = event.clientX;
        mouseY = event.clientY;
        if (!!event.originalEvent.touches) {
            mouseX = event.originalEvent.touches[0].clientX;
            mouseY = event.originalEvent.touches[0].clientY;
        }
    })
    .on('mousedown touchstart', function (event) {
        if (event.target === credit.get(0)) {
            return;
        }
        mouseX = event.clientX;
        mouseY = event.clientY;
        if (!!event.originalEvent.touches) {
            mouseX = event.originalEvent.touches[0].clientX;
            mouseY = event.originalEvent.touches[0].clientY;
        }
        var timer = setInterval(function () {
            $d
                .one('mouseup mouseleave touchend touchcancel touchleave', function () {
                    clearInterval(timer);
                })
            createParticle(event);
        }, 1000 / 60)

    });


function createParticle(event) {
    var particle = $('<div class="particle"/>'),
        size = sizes[Math.floor(Math.random() * sizes.length)],
        color = colors[Math.floor(Math.random() * colors.length)],
        negative = size / 2,
        speedHorz = Math.random() * 10,
        speedUp = Math.random() * 25,
        spinVal = 360 * Math.random(),
        spinSpeed = ((36 * Math.random())) * (Math.random() <= .5 ? -1 : 1),
        otime,
        time = otime = (1 + (.5 * Math.random())) * 1000,
        top = (mouseY - negative)-40,
        left = (mouseX - negative),
        direction = Math.random() <= .5 ? -1 : 1,
        life = 5;

    particle
        .css({
            height: size + 'px',
            width: size + 'px',
            top: top + 'px',
            left: left + 'px',
            backgroundImage: color,
//            backgroundImage: "url(../img/particuadrado.png)",
            //    Linea que da color a los circulos
            //    background: color,
            transform: 'rotate(' + spinVal + 'deg)',
            webkitTransform: 'rotate(' + spinVal + 'deg)'
        })
        .appendTo(particles);
    particleCount++;
    updateParticleCount();

    var particleTimer = setInterval(function () {
        time = time - life;
        left = left - (speedHorz * direction);
        top = top - speedUp;
        speedUp = Math.min(size, speedUp - 1);
        spinVal = spinVal + spinSpeed;


        particle
            .css({
                height: size + 'px',
                width: size + 'px',
                top: top + 'px',
                left: left + 'px',
                opacity: ((time / otime) / 2) + .25,
                transform: 'rotate(' + spinVal + 'deg)',
                webkitTransform: 'rotate(' + spinVal + 'deg)'
            });

        if (time <= 0 || left <= -size || left >= wWidth + size || top >= wHeight + size) {
            particle.remove();
            particleCount--;
            updateParticleCount();
            clearInterval(particleTimer);
        }
    }, 1000 / 50);
}

