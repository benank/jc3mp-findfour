$(document).ready(function() 
{
    $('.window').draggable({handle: ".title", stack: 'div', disabled: false});
    
    let my_turn = false;
    let me_first = false;

    $('.window').fadeOut("fast", function() {$('.window').css('visibility', 'hidden'); $("#close-button").css("color", "white");});

    function ResetBoard()
    {
        $('.game-board').empty();
        $('#player1name').text("Waiting for player...");
        $('#player1name').css('font-style', 'italic');
        $('#player2name').text("Waiting for player...");
        $('#player2name').css('font-style', 'italic');

        pieces = [];
        for (let i = 1; i <= 7; i++)
        {
            pieces[i] = [];
        }

        for (let r = 1; r <= 7; r++)
        {
            for (let c = 1; c <= 7; c++)
            {
                let piece = document.createElement("div");
                piece.id = "piece_" + c + "" + r;
                piece.className = "piece";
                piece.onclick = function() 
                {
                    ClickSpace("piece_" + c + "" + r);
                }
                $('.game-board').append(piece);

            }
        }
    }

    function SwitchTurns(myturn)
    {
        my_turn = myturn;

        if (my_turn)
        {
            if (me_first)
            {
                $('#player1name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '0px 0px 5px #70DBFF, 0px 0px 10px #70DBFF');
                $('#player1name').css('text-shadow', '0px 0px 5px black, 0px 0px 10px black, 2px 2px 1px black');
            }
            else
            {
                $('#player1name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '');
                $('#player1name').css('text-shadow', '0px 0px 5px #70DBFF, 0px 0px 10px #70DBFF');
                $('#player2name').css('text-shadow', '0px 0px 5px black, 0px 0px 10px black, 2px 2px 1px black');
            }

            for (let r = 1; r <= 7; r++) // columns
            {
                for (let c = 1; c <= 7; c++) // rows
                {
                    $('#piece_' + r + '' + c).css("cursor", "pointer");
                }
            }
        }
        else
        {
            if (me_first)
            {
                $('#player1name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '');
                $('#player1name').css('text-shadow', '0px 0px 5px #70DBFF, 0px 0px 10px #70DBFF');
                $('#player2name').css('text-shadow', '0px 0px 5px black, 0px 0px 10px black, 2px 2px 1px black');
            }
            else
            {
                $('#player1name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '');
                $('#player2name').css('text-shadow', '0px 0px 5px #70DBFF, 0px 0px 10px #70DBFF');
                $('#player1name').css('text-shadow', '0px 0px 5px black, 0px 0px 10px black, 2px 2px 1px black');
            }

            for (let r = 1; r <= 7; r++) // columns
            {
                for (let c = 1; c <= 7; c++) // rows
                {
                    $('#piece_' + r + '' + c).css("cursor", "default");
                }
            }
        }
    }

    function ClickSpace(id)
    {
        if (my_turn)
        {
            jcmp.CallEvent('findfour/ClickSpace', id.substring(id.length-2,id.length-1));
        }
    }

    $(".close-icon").hover(function()
    {
        $("#close-button").css("color", "red");
    }, function()
    {
        $("#close-button").css("color", "white");
    });

    $(".close-icon").click(function()
    {
        $('.window').fadeOut("fast", function() {$('.window').css('visibility', 'hidden'); $("#close-button").css("color", "white");});
        jcmp.HideCursor();
        jcmp.CallEvent('findfour/CloseWindow');
    });

    ResetBoard();

    jcmp.AddEvent('findfour/PlacePiece', (column, row, color) => 
    {
        let piece_inside = document.createElement("div");
        piece_inside.className = "piece inside " + color;
        $("#piece_" + column + "" + row).append(piece_inside);
    })

    jcmp.AddEvent('findfour/ChangeTurn', (myturn) => 
    {
        SwitchTurns(myturn);
    })

    jcmp.AddEvent('findfour/EndGame', () => 
    {
        ResetBoard();
        jcmp.HideCursor();
        $('.window').fadeOut("fast", function() {$('.window').css('visibility', 'hidden'); $("#close-button").css("color", "white");});
    })

    jcmp.AddEvent('findfour/StartGame', (player1, player2, first) => 
    {
        me_first = first; // If true, playername is red
        ResetBoard();
        $('#player1name').text(player1);
        $('#player1name').css('font-style', 'normal');
        $('#player2name').text(player2);
        $('#player2name').css('font-style', 'normal');
        jcmp.ShowCursor();
        $('.window').fadeIn("fast", function() {$('.window').css('visibility', 'visible'); $("#close-button").css("color", "white");});
    })

})
