const ui = new WebUIWindow('findfour', 'package://findfour/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.ui.AddEvent('findfour/ClickSpace', (column) => 
{
    jcmp.events.CallRemote('ClickSpace', column);
})

jcmp.ui.AddEvent('findfour/CloseWindow', () => 
{
    jcmp.localPlayer.controlsEnabled = true;
    jcmp.events.CallRemote('CloseWindow');
})

jcmp.events.AddRemoteCallable('PlacePiece', (column, row, color) => 
{
    jcmp.ui.CallEvent('findfour/PlacePiece', column, row, color);
})

jcmp.events.AddRemoteCallable('StartGame', (player1, player2, first) => 
{
    jcmp.ui.CallEvent('findfour/StartGame', player1, player2, first);
    ui.hidden = false;
    jcmp.localPlayer.controlsEnabled = false;
})

jcmp.events.AddRemoteCallable('ChangeTurn', (myturn) => 
{
    jcmp.ui.CallEvent('findfour/ChangeTurn', myturn);
})

jcmp.events.AddRemoteCallable('EndGame', () => 
{
    ui.hidden = true;
    jcmp.ui.CallEvent('findfour/EndGame');
})