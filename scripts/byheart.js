window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

window.onload = () => {
    let ranint = document.querySelector("#ranint")
    ranint.innerText = `${Math.floor(Math.random() * 999)}`

    let albumZone = document.querySelector(".a-scroll")
    let mover = document.querySelector(".a-scroll .mover")
    let cover = document.querySelector(".a-scroll img")
    let stats = document.querySelector(".a-scroll .stats")

    let elmsMaxDrag = (albumZone.clientHeight - cover.clientHeight) * 1.5

    cover.style.transform = `rotateY(0deg)`
        stats.style.transform = `rotateY(270deg)`

    const animatic = new Animatic(albumZone)
    animatic.onScroll = (scroll) => {
        let coverDeg = Math.min(scroll * 2 * 180, 90)
        
        mover.style.top = `${scroll * elmsMaxDrag}px`

        cover.style.transform = `rotateY(${coverDeg}deg)`

        if (coverDeg >= 90) {
            let statsDeg = Math.min((scroll * 2 * 360) + 90, 360)
            stats.style.transform = `rotateY(${statsDeg}deg)`
        } else {
            stats.style.transform = `rotateY(${90}deg)`
        }
    }
}