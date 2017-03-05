
global.ff = 
{
    findfour: require('./scripts/findfour'),
    chat: jcmp.events.Call('get_chat')[0],
    lobby: []

}

require('./scripts/events');

setInterval(() => {}, 500); // If things break because NODEJS, this will make them work again