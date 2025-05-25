var txt = "[UNKNOWN]"

window.onload = () => {
    /**@type {HTMLElement} */
    const txtAnimate = document.querySelector(".console.animate > p");
    txt = txtAnimate.innerText;

     setTimeout(() => {
        obfuscate(txtAnimate);
        setTimeout(() => {
            deobfuscate(txtAnimate);
        }, 1000*0.7 + 120 * 22);
    }, 1000*0.7);

    setInterval(() => {
        setTimeout(() => {
            obfuscate(txtAnimate);
            setTimeout(() => {
                deobfuscate(txtAnimate);
            }, 1000*0.7 + 120 * 22);
        }, 1000*0.7);
    }, (1000 * 0.7 + 120 * 23) * 2)

    /**@param {HTMLElement} element */
    function obfuscate(element) {
        let l = element.innerText.length;

        /**@type {number[]} */
        var ia = [];
        for (let i = 0; i < l; i++) {
            if (element.innerText[i] !== " ") ia.push(i);
        }

        var txtr = element.innerText;
        for (let i = 0; i < txtr.length; i++) {
            setTimeout(() => {
                let deli = Math.floor(Math.random() * ia.length)
                const index = ia[deli];
                ia.splice(deli, 1);
                
                let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[{]}-_+\\/<>.*$@%~\"'=";
                txtr = txtr.replaceAt(index, chars[Math.floor(Math.random() * chars.length)])
                
                element.innerText = txtr.substring(0, txt.length);
            }, 120*i)
        }
    }

    /**@param {HTMLElement} element */
    function deobfuscate(element) {
        let l = element.innerText.length;

        /**@type {number[]} */
        var ia = [];
        for (let i = 0; i < l; i++) {
            if (element.innerText[i] !== " ") ia.push(i);
        }

        var txtr = element.innerText;
        for (let i = 0; i < ia.length; i++) {
            setTimeout(() => {
                const dex = ia[i];
                let chars = txt;
                txtr = txtr.replaceAt(dex, chars[dex]);
                element.innerText = txtr;
            }, 120*i);
        }
    }
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
