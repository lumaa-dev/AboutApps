window.onload = () => {
	let selectors = document.querySelectorAll(".apps button");
	selectors.forEach((elm, key) => {
        let changer = document.getElementById(`sel-${key}`);
		if (key !== 0) {
			if (changer) {
				changer.style.display = "none";
			}
		} else {
            let sections = document.querySelectorAll(".section:not(.force-show)");
            sections.forEach((elm) => elm.style.display = "none");
            changer.style.display = "initial";

            elm.classList.add("selected")
        }

        elm.onclick = () => {
            let oldSelected = document.querySelector(".selector.selected")
            oldSelected.classList.remove("selected")
            elm.classList.add("selected")
            
            let sections = document.querySelectorAll(".section:not(.force-show)");
            sections.forEach((elm) => elm.style.display = "none");
            changer.style.display = "initial";
        }
	});
};
