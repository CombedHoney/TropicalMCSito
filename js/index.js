// LOADING
const loading = document.getElementById("loading");
let loaded = false;
let time = 0;
const loadingTime = 1;
document.body.style.overflow = "hidden";

const int = setInterval(() => {
    if (time >= loadingTime && loaded) {
        loading.style.animation = "loaded 0.5s ease";
        setTimeout(() => {
            loading.style.display = "none";
            document.body.style.overflow = "auto";
        }, 480)
    } else {
        time += 0.5;
    }
}, 500)

window.onload = () => loaded = true;

// COPY IP
const ipText = document.getElementById("ip-text");

function copy(text) {
    const temp = document.createElement('textarea');
    temp.value = text;

    document.body.appendChild(temp);

    temp.select();
    document.execCommand('copy');

    document.body.removeChild(temp);

    const startText = ipText.innerText;
    ipText.innerText = "IP Copiato";

    setTimeout(() => {
        ipText.innerText = startText;
    }, 3000)
}
// Menu
$( document ).ready(function() {
    $( ".hamburger" ).on('click', function() {
        $( ".menu" ).toggleClass("menu--open");
    })
});

//Minecraft
function initServerData(serverIp,serverPort){
    const serverIpElement = document.getElementById('server-ip');
    serverIpElement.innerHTML = serverIp;

    console.log('https://mcapi.us/server/status?ip='+serverIp+'&port='+serverPort);
    fetch('https://mcapi.us/server/status?ip='+serverIp+'&port='+serverPort)
    .then(response => response.json())
    .then(data => handleServerStatus(data));

    function handleServerStatus(data){
        if(data.status=='error'){
            console.log(data.error);
            return false;
        }

        const playerCounter = document.getElementById("player-count");
        playerCounter.innerHTML = data.players.now;
    } 

}

initServerData("play.tropiaclmc.it","25565");