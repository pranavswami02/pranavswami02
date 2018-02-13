$(document).ready( function() {
    
    $('.js--projects').waypoint(function(direction) {
        if(direction == "down") {
            $('nav').addClass('sticky');
            document.getElementById('title').innerHTML = 'Projects';
        } else {
            $('nav').removeClass('sticky');
            document.getElementById('title').innerHTML = 'Home Page';
        }
    }, {
        offset: '100px;'
    });
    
    $('header').waypoint(function(direction) {
        document.getElementById('title').innerHTML = 'Home Page';
    });
})