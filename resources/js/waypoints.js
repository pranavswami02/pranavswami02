$(document).ready( function() {
    
    $('.js--projects').waypoint(function(direction) {
        document.getElementById('title').innerHTML = 'Projects';
        if(direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '100px;'
    });
    
    $('header').waypoint(function(direction) {
        document.getElementById('title').innerHTML = 'Home Page';
    });
})