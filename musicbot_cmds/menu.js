const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
> 𝔪𝔲𝔰𝔦𝔠𝔟𝔬𝔱 
╭─────────────────
│⛓╭─────────────
│✰│▸ *мєиυ* 
│✰│▸ *мυиυ2* 
│✰╰──────────────
│✰│▸ *ρℓυgιиѕ* : ${cm.length} 
│✰│▸ *я.α.м* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│✰│▸ *ϐαяℓєγѕ* : ${os.platform()}
│✰│▸ *τнємє* : *𝔐𝔲𝔰𝔦𝔠𝔟𝔬𝔱*
│⛓╰──────────────
╰──────────────────\n`;
    
let menuMsg = ` *COMMANDS* `;

    for (const cat in coms) {
        menuMsg += `╭────────⛷ *${cat}* ❑`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│❐│▸ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `> 𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓 𝖎𝖘 𝖒𝖞 𝖔𝖜𝖓𝖊𝖗
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *☹︎ 𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓*, déveloper 𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓 𝖙𝖊𝖈𝖍" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓*, déveloper 𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓 𝖙𝖊𝖈𝖍" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
