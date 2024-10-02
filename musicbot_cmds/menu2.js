const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
╭────《《𝕸𝖚𝖘𝖎𝖈𝖇𝖔𝖙♫︎》》────
┴  ╭─────────────
│♫︎│ *𝖚𝖘𝖊𝖗* : ${s.OWNER_NAME}
│♫︎│⁠⁠⁠⁠ *𝕯𝖆𝖙𝖊* : ${date}
│♫︎│⁠⁠⁠⁠ *𝕻𝖗𝖊𝖋𝖎𝖝* : ${s.PREFIXE}
│♫︎⁠⁠⁠⁠│⁠⁠⁠ *𝕸𝖔𝖉𝖊* : ${mode} mode
│♫︎│⁠⁠⁠⁠ *𝕺𝖗𝖉𝖊𝖗𝖘* : ${cm.length} 
│♫︎│⁠⁠⁠⁠ *𝕽𝖆𝖒* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│♫︎│⁠⁠⁠⁠ *𝖕𝖑𝖆𝖙𝖋𝖔𝖗𝖒* : ${os.platform()}
│♫︎│⁠⁠⁠⁠ *𝕿𝖍𝖊𝖒𝖊* :*𝖒𝖚𝖘𝖎𝖈𝖇𝖔𝖙*
┬  ╰──────────────
╰─── ··《《𝖒𝖚𝖘𝖎𝖈𝖇𝖔𝖙》》··──\n`;
    
let menuMsg = `
 ─────────
  *𝕸𝖚𝖘𝖎𝖈𝖇𝖔𝖙 ♫︎* 
 ─────────


 *𝖈𝖔𝖒𝖒𝖆𝖓𝖉𝖘*
`;

    for (const cat in coms) {
        menuMsg += ` ╭─⬡ *${cat}* ⬡─`;
        for (const cmd of coms[cat]) {
            menuMsg += `
⬡│▸ *${cmd}*`;
        }
        menuMsg += `
  ╰────────────·· \n`
    }

    menuMsg += `

|♫︎ 𝕬𝖗𝖑𝖔𝖉𝖗𝖆𝖌𝖔𝖓 ♫︎
*⁠⁠⁠♫︎——————————⁠⁠⁠♫︎——————————♫︎⁠⁠⁠⁠*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *kavishanmd*, déveloper kavishan Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *kavishanmd*, déveloper kavishan Tech" }, { quoted: ms });
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
