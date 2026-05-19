const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async(req,res)=>{

try{

const url =
"https://live2.rtpedi.info/?game=pg";

const response =
await axios.get(url);

const $ =
cheerio.load(response.data);

let games = [];

/*
====================================
AMBIL SEMUA CARD
====================================
*/

$("div").each((i,el)=>{

const text =
$(el).text();

if(
text.includes("%")
&&
text.includes("Jam")
){

const image =
$(el).find("img").attr("src");

const rtpMatch =
text.match(/(\d+)%/);

const rtp =
rtpMatch
? parseInt(rtpMatch[1])
: 0;

const jamMatch =
text.match(
/Jam[: ]*([\d:]+\s*-\s*[\d:]+)/
);

const jam =
jamMatch
? jamMatch[1]
: "--";

const label =
text.includes("HOT")
? "HOT"
: "TOP";

/*
====================================
POLA
====================================
*/

let pola = [];

const polaRegex =
/(Auto\s\d+|Manual\s\d+)\s+(Turbo\s(?:On|Off))/gi;

let match;

while(
(match =
polaRegex.exec(text)) !== null
){

pola.push([
match[1],
match[2]
]);

}

if(image && rtp){

games.push({

name:"PG SLOT",
image,
rtp,
jam,
label,
pola

});

}

}

});

res.status(200)
.json(games);

}
catch(error){

res.status(500).json({

error:true,
message:error.message

});

}

}