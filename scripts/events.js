
jcmp.events.AddRemoteCallable('findfour/ClickSpace', (player, column) => 
{
    if (typeof player.findfour != 'undefined')
    {
        player.findfour.instance.place_piece(player.findfour.index, column);
    }
})

jcmp.events.AddRemoteCallable('findfour/CloseWindow', (player) => 
{
    player.infindfourlobby = false;
    if (typeof player.findfour != 'undefined')
    {
        if (!player.findfour.instance.gameover)
        {
            player.findfour.instance.quit(player.findfour.index);
            ff.chat.send(player, "[#FFAE00]You quit the Find Four game.");
        }
        player.findfour = undefined;
    }
})

jcmp.events.Add('chat_command', (player, msg) => 
{
    if (msg == "/findfour")
    {
        if (typeof player.findfour == 'undefined' && (typeof player.infindfourlobby == 'undefined' || !player.infindfourlobby))
        {
            ff.lobby.push(player);
            player.infindfourlobby = true;
            ff.chat.send(player, "[#FFAE00]You entered the queue for Find Four!");
            if (ff.lobby.length == 2)
            { 
                const findfour = new ff.findfour(ff.lobby);
                findfour.start();
                ff.lobby = [];
            }
        }
        else if (player.infindfourlobby == true && typeof player.findfour == 'undefined')
        {
            ff.lobby = ff.lobby.filter(p => p.networkId != player.networkId);
            player.infindfourlobby = false;
            ff.chat.send(player, "[#FFAE00]You left the queue for Find Four.");
        }
    }
})

jcmp.events.Add('PlayerDestroyed', (player) => 
{
    if (typeof player.findfour != 'undefined')
    {
        if (!player.findfour.instance.gameover)
        {
            player.findfour.instance.quit(player.findfour.index);
        }
    }
    ff.lobby = ff.lobby.filter(p => p.networkId != player.networkId);
})