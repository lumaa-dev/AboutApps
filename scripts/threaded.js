window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

window.onload = () => {
	window.scrollTo(0, 0);

	let signButton = document.querySelector(".signup > button");
	signButton.onclick = () => {
		signUp()
	}

	let iconZone = document.querySelector(".t-scroll");
	let mover = document.querySelector(".t-scroll .mover");
	let logo = document.querySelector(".t-scroll img");
	let labels = document.querySelectorAll(".t-scroll .labels > p");

	let elmsMaxDrag = iconZone.clientHeight - logo.clientHeight;

	mover.style.top = `${window.innerHeight / 2 - logo.clientHeight}px`;
	logo.style.transform = `scale(1)`;

	const iconAnimatic = new Animatic(iconZone);
	iconAnimatic.onScroll = (scroll) => {
		mover.style.top = `${scroll * elmsMaxDrag}px`;

		// Labels
		if (scroll > 0.15 && scroll < 0.25) {
			labels.item(0).classList.add("show");
		} else {
			labels.item(0).classList.remove("show");
		}

		if (scroll > 0.35 && scroll < 0.45) {
			labels.item(1).classList.add("show");
		} else {
			labels.item(1).classList.remove("show");
		}

		if (scroll > 0.55 && scroll < 0.65) {
			labels.item(2).classList.add("show");
		} else {
			labels.item(2).classList.remove("show");
		}

		if (scroll > 0.75 && scroll < 0.85) {
			labels.item(3).classList.add("show");
		} else {
			labels.item(3).classList.remove("show");
		}

		// Change logo size

		if (scroll > 0.9) {
			let size = Math.max(1 - (scroll - 0.9) / 0.1, 0.5);
			logo.style.transform = `scale(${size})`;
		} else {
			logo.style.transform = `scale(1)`;
		}
	};
};

function signUp() {
	const emailEl = document.querySelector("input[type='email']");
	let email = emailEl.value

	if (!email.match(/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/g)) {
		return console.error("Content is not email")
	}

	var data = `service=Threaded&email=${email}`;

	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "http://localhost:3000/sub/join");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.send(data);
}
