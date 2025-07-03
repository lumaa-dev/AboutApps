var web = {
    prevMobile: false,
}

window.onload = () => {
    web.prevMobile = window.innerWidth < 1150;
    prepareAlbums();
}

window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    const scrollPercentage = scrollTop / (scrollHeight - window.innerHeight);
    const albumsImg = document.querySelectorAll('.albums > img');

    albumsImg.forEach((img, index) => {
        let defOff = img.style.top;
        const offset = (index + 1) * 10 + 10; 
        img.style.transform = `translateY(-${scrollPercentage * offset}vh)`;
    });
}

window.onresize = () => {
    prepareAlbums(false);
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function prepareAlbums(force = true) {
    let isMobile = window.innerWidth < 1150;
    
    if (web.prevMobile !== isMobile || force) {
        const albumsContainer = document.querySelector('.albums');
        albumsContainer.innerHTML = '';
    } else {
        return
    }
    web.prevMobile = isMobile;

    var pad = (isMobile ? 90 : 230) / 2;
    var amount = isMobile ? 4 : 5;

    const albumsContainer = document.querySelector('.albums');

    var albumImages = [
        'america.png',
        'around_fur.png',
        'attitudes.png',
        'avicii_forever.png',
        'bbl.png',
        'dttd.png',
        'foulard_rouge.png',
        'ginkgo.png',
        'good_faith.png',
        'in_rainbows.png',
        'making_moves.png',
        'numbers.png',
        'ram.png',
        'ruptures.png',
        'stafad.png',
        'the_doors.png',
        'the_wall.png',
        'zzccmxtp.png'
    ];

    shuffle(albumImages);
    albumImages = albumImages.slice(0, amount);

    albumImages.forEach(image => {
        let idx = albumImages.indexOf(image);
        let max = (idx / (albumImages.length - 1)) * 100
        
        const img = document.createElement('img');
        img.src = `../assets/images/cider/tracks/${image}`;
        img.style.left = `calc(${max}vw - ${Math.floor(Math.random() * 55 + pad)}px)`;
        img.style.top = `${Math.floor(Math.random() * 70) + 5}vh`;
        albumsContainer.appendChild(img);
    });
}