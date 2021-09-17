let codeBtn = document.getElementById('coding');
let decodeBtn = document.getElementById('decoding');

lzwCode = () => {
    let msgFinal = "";
    let msg = document.getElementById("msgToCode").value;
    let dir = buildDic(msg);
    let w = "";
    let i = 0;
    while (msg.length > i) {
        let k = msg.charAt(i);
        let wk = (w + k);

        if (dir.indexOf(wk) != -1) {
            w = wk;
        } else {
            dir.push(wk);
            msgFinal += dir.indexOf(w) + " ";
            w = k;
        }
        i++;
    }
    console.log(dir);
    msgFinal += dir.indexOf(w);
    document.getElementById("RCode").innerText = "R : " + msgFinal;
}

lwdDecode = () => {
    let msg = document.getElementById("codeToMsg").value;
    let dir = buildDicWithString();
    let old = parseInt(msg.charAt(0));
    let ch = dir[parseInt(msg.charAt(0))];
    let c = "";
    let msgFinal2 = ch;
    let i = 1;

    while (msg.length > i) {
        let newCode = "";

        if (msg.charAt(i) == " " && msg.charAt(i + 2) == " ") {
            newCode = parseInt(msg.charAt(i + 1));
            i += 2;
        } else {
            newCode = parseInt(msg.charAt(i + 1) + msg.charAt(i + 2));
            i += 3;
        }

        if (newCode > dir.length) {
            c = dir[old];
            c = c + ch;
        } else {
            c = dir[newCode];
        }

        msgFinal2 += c;
        ch = c.charAt(0);
        dir.push(dir[old] + ch);
        old = newCode;

    }
    console.log(dir);
    document.getElementById("RDecode").innerText = "R : " + msgFinal2;
}

buildDic = (msg) => {
    let dir = [];
    let i = 0;
    while (msg.length > i) {
        let aux = msg.charAt(i);
        if (dir.indexOf(aux) == -1) {
            dir.push(aux);
        }
        i++;
    }
    return dir;
}

buildDicWithString = () => {

    let dir = document.getElementById("dir").value + "";
    return dir.split("-");
}

codeBtn.addEventListener('click', lzwCode);
decodeBtn.addEventListener('click', lwdDecode);