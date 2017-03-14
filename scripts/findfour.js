module.exports = 

class FindFour
{
    constructor(players)
    {
        this.players = players;
        this.board = []; // [c][r]
        this.turn = -1;
        this.gameover = false;
    }

    start()
    {
        for (let i = 1; i <= 7; i++)
        {
            this.board[i] = [];
            for (let j = 1; j <= 7; j++)
            {
                this.board[i][j] = -1;
            }
        }

        let index = 0;
        this.players.forEach(player => 
        {
            player.infindfourlobby = false;
            player.findfour = [];
            player.findfour.instance = this;
            player.findfour.index = index;
            jcmp.events.CallRemote('StartGame', player, this.players[0].name, this.players[1].name, index == 0);
            index++;
        });

        setTimeout(() =>
        {
            this.switch_turns(0);
        }, 1000);


    }

    switch_turns(index)
    {
        this.turn = index;
        this.players.forEach(player => 
        {
            jcmp.events.CallRemote('ChangeTurn', player, player.findfour.index == this.turn);
        })

        if (index == 1 && this.players.length == 1) // For testing
        {
            setTimeout(() => 
            {
                this.place_piece(1, Math.ceil(Math.random() * 7));
            }, 1500);
        }
    }

    place_piece(index, column)
    {
        column = parseInt(column);
        if (column > 7 || column < 1 || this.turn != index || this.gameover)
        {
            return;
        }

        let length = 0;
        this.board[column].forEach(entry => 
        {
            if (entry != -1)
            {
                length++;
            }
        });

        let row = 7 - length;

        if (row < 1 || row > 7)
        {
            return;
        }

        this.board[column][row] = index;
        this.players.forEach(p => 
        {
            jcmp.events.CallRemote('PlacePiece', p, column, row, (index == 0) ? "red" : "blue");
        });

        let winner = this.check_for_winner(column, row, index);
        if (winner != null)
        {
            this.player_win(winner);
        }
        else
        {
            this.switch_turns((index == 0) ? 1 : 0);
        }
    }

    player_win(index, left)
    {
        this.gameover = true;
        if (index == "cats")
        {
            this.players.forEach(p => 
            {
                ff.chat.send(p, `[#FFAE00]The game of Find Four ended in a tie!`);
            });
        }
        else if(!left)
        {
            let loser = this.players[(index == 0) ? 1 : 0].name;
            let winner = this.players[index].name;
            ff.chat.send(this.players[index], `[#FFAE00]You won the game of Find Four against ${loser}!`);
            ff.chat.send(this.players[(index == 0) ? 1 : 0], `[#FFAE00]You lost the game of Find Four against ${winner}.`);
        }

    }

    check_for_winner(c, r, p)
    {
        if (c + 3 < 8) // Horizontally
        {
            if (this.board[c+1][r] == p && this.board[c+2][r] == p && this.board[c+3][r] == p)
            {
                return p;
            }
        }

        if (c - 3 > 0) // Horizontally
        {
            if (this.board[c-1][r] == p && this.board[c-2][r] == p && this.board[c-3][r] == p)
            {
                return p;
            }
        }

        if (r + 3 < 8) // Vertically
        {
            if (this.board[c][r+1] == p && this.board[c][r+2] == p && this.board[c][r+3] == p)
            {
                return p;
            }
        }

        if (r - 3 > 0 && c - 3 > 0) // Diagonal
        {
            if (this.board[c-1][r-1] == p && this.board[c-2][r-2] == p && this.board[c-3][r-3] == p)
            {
                return p;
            }
        }

        if (r + 3 < 8 && c + 3 < 8) // Diagonal
        {
            if (this.board[c+1][r+1] == p && this.board[c+2][r+2] == p && this.board[c+3][r+3] == p)
            {
                return p;
            }
        }

        if (r + 3 < 8 && c - 3 > 0) // Diagonal
        {
            if (this.board[c-1][r+1] == p && this.board[c-2][r+2] == p && this.board[c-3][r+3] == p)
            {
                return p;
            }
        }

        if (r - 3 > 0 && c + 3 < 8) // Diagonal
        {
            if (this.board[c+1][r-1] == p && this.board[c+2][r-2] == p && this.board[c+3][r-3] == p)
            {
                return p;
            }
        }

        let filled = 0; // Keep track of all filled spaces in case of cats game
        for (let c = 1; c <= 7; c++)
        {
            for (let r = 1; r <= 7; r++)
            {
                if (this.board[c][r] != -1)
                {
                    filled++;
                }
            }
        }

        if (filled == 49)
        {
            return "cats";
        }
        else
        {
            return null;
        }
    }

    quit(index)
    {
        let name = this.players[index].name;
        this.players[index] = undefined;
        ff.chat.send(this.players[(index == 0) ? 1 : 0], `[#FFAE00]${name} left the Find Four game. You win!`);
        this.player_win((index == 0) ? 1 : 0, true);
    }


}