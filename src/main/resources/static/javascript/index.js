var mousePressed = false;
var lastX, lastY;
var ctx;
var socket = null;
var stompClient = null;
var isConnected = false;
var clear = null;
var eraser = false;
var color = "black";
var colorcheck = null;
$(document).ready(function() {

    socket = new SockJS('http://localhost:8080/skribble-socket');
    stompClient = Stomp.over(socket);


    ctx = document.getElementById('myCanvas').getContext("2d");
    stompClient.connect({}, function(frame) {

        stompClient.subscribe('/topic/draw', function(data) {
            var obj = jQuery.parseJSON(data.body);

            console.log(obj);
            console.log(obj.x);
            console.log(obj.y);

            lastX = obj.lastX;
            lastY = obj.lastY;
            clear = obj.clear;
            mousePressed = obj.mousePressed;
            if (clear == true) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                clear = null;
            }
            Draw(obj.x, obj.y, obj.isDown, obj.eraser);

        });
        isConnected = true;

    });





    $('input.eraser[type="checkbox"]').click(function() {
        if ($(this).prop("checked") == true) {
            eraser = true;
        } else if ($(this).prop("checked") == false) {
            eraser = false;

        }
    });



    $('#myCanvas').mousedown(function(e) {

        mousePressed = true;

        $('input.checkbox[type="checkbox"]').click(function() {
            if ($(this).prop("checked") == true) {
                colorcheck = true;

            } else if ($(this).prop("checked") == false) {
                colorcheck = false;
            }
        });

        if (colorcheck == true) {


            docolor(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, color);

        }









        if (isConnected) {
            stompClient.send("/app/data", {},
                JSON.stringify({
                    'lastX': lastX,
                    'lastY': lastY,
                    'x': e.pageX - $(this).offset().left,
                    'y': e.pageY - $(this).offset().top,
                    'clear': clear,
                    'eraser': eraser,
                    'isDown': false,
                    'mousePressed': mousePressed

                })

            );


        }


    });

    $('#myCanvas').mousemove(function(e) {
        if (mousePressed) {
            if (isConnected) {
                stompClient.send("/app/data", {},
                    JSON.stringify({
                        'lastX': lastX,
                        'lastY': lastY,
                        'x': e.pageX - $(this).offset().left,
                        'y': e.pageY - $(this).offset().top,
                        'clear': clear,
                        'eraser': eraser,
                        'isDown': true,
                        'mousePressed': mousePressed

                    })

                );


            }

        }
    });

    $('#myCanvas').mouseup(function(e) {
        mousePressed = false;







        if (isConnected) {
            stompClient.send("/app/data", {},
                JSON.stringify({
                    'mousePressed': mousePressed
                })

            );

        }

    });
    $('#myCanvas').mouseleave(function(e) {
        mousePressed = false;

        if (isConnected) {
            stompClient.send("/app/data", {},
                JSON.stringify({
                    'mousePressed': mousePressed
                })

            );
        }

    });

});

function Draw(x, y, isDown, eraser) {
    if (isDown && x != null && y != null && lastX != null && lastY != null) {

        if (eraser == true) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

        }
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();

    }
    lastX = x;
    lastY = y;
}


function clearArea() {


    stompClient.send("/app/data", {},
        JSON.stringify({
            'lastX': null,
            'lastY': null,
            'x': null,
            'y': null,
            'clear': true,
            'eraser': null,
            'isDown': null,
            'mousePressed': null

        })

    );

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}