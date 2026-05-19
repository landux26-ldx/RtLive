const container =
document.getElementById("container");

const search =
document.getElementById("search");

let allGames = [];

/*
=====================================
DATE
=====================================
*/

const now = new Date();

document.getElementById("tanggal")
.innerHTML =
now.toLocaleDateString(
"id-ID",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

/*
=====================================
LOAD API
=====================================
*/

async function loadRTP(){

try{

/*
=====================================
GANTI URL VERCEL
=====================================
*/

const response =
await fetch(
"https://YOUR-VERCEL.vercel.app/api/rtp"
);

const games =
await response.json();

games.sort((a,b)=>b.rtp-a.rtp);

allGames = games;

renderGames(games);

}
catch(error){

container.innerHTML = `
<div class="loading">
Gagal load realtime RTP
</div>
`;

console.log(error);

}

}

/*
=====================================
RENDER
=====================================
*/

function renderGames(games){

container.innerHTML = "";

games.forEach(game=>{

container.innerHTML += `

<div class="card">

<div class="
label
${game.label=="HOT"
? "hot"
: ""}
">

${game.label}

</div>

<img src="${game.image}">

<div class="content">

<div class="game-name">
${game.name}
</div>

<div class="pola-title">
📊 Pola Slot:
<b>PG</b>
</div>

<div class="line"></div>

${game.pola.map(item=>`

<div class="pola-item">

<span>${item[0]}</span>

<span class="
${item[1].includes("On")
? "green"
: "red"}
">

${item[1]}

</span>

</div>

`).join("")}

<div class="jam">
⏰ Jam:
${game.jam}
</div>

<div class="bar">

<div class="fill"
style="
width:${game.rtp}%
">

${game.rtp}%

</div>

</div>

</div>

</div>

`;

});

}

/*
=====================================
SEARCH
=====================================
*/

search.addEventListener("keyup",()=>{

const value =
search.value.toLowerCase();

const filtered =
allGames.filter(game=>

game.name
.toLowerCase()
.includes(value)

);

renderGames(filtered);

});

/*
=====================================
AUTO REFRESH
=====================================
*/

loadRTP();

setInterval(()=>{

loadRTP();

},30000);