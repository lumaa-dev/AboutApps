var selectedTab = "iphone";

window.onload = () => {
	/**@type {[{ name: string, variable: any }]} */
	let params = fetchParameters();
	if (typeof params != "undefined") {
		/**@type {{ name: string, variable: any }} */
		let device = params.filter(function ({ name }) {
			return name == "device";
		})[0];
		
		if (device != undefined) {
			if (device.name == "device") {
				if (device.variable != "iphone" && device.variable != "ipad") {
					console.error(new Error("Parameters don't match requirements"));
				} else {
					selectedTab = device.variable == "iphone" ? "iphone" : "ipad";
				}
			}
		}
	}
};

const iphone = document.getElementById("i");
const ipad = document.getElementById("p");

clickbtn(iphone);
clickbtn(ipad);

updateDevice();

function clickbtn(/**@type {HTMLElement} */ elm) {
	elm.onclick = (e) => {
		selectedTab = elm.innerText.toLowerCase();
		updateDevice();
	};
}

function updateDevice() {
	if (selectedTab == "iphone") {
		iphone.classList.add("selected");
		ipad.classList.remove("selected");

		document.getElementById("iphone").style.display = "flex";
		document.getElementById("ipad").style.display = "none";
	} else {
		iphone.classList.remove("selected");
		ipad.classList.add("selected");

		document.getElementById("iphone").style.display = "none";
		document.getElementById("ipad").style.display = "flex";
	}
}

function fetchParameters(url) {
	/**@type {String} */
	let href = url || window.location.href;
	if (!href.includes("?") && !href.includes("=")) return;
	let l = href.toLowerCase().split("?").slice(1).join("").split("&");
	/**@type {{ name: string, variable: string }[]} */
	var params = [];
	l.forEach((k) => {
		let param = {
			name: k.split("=")[0],
			variable: recognize(k.split("=")[1]),
		};
		params.push(param);
	});

	return params;

	/**@param {String} paramString  */
	function recognize(paramString) {
		if (!isNaN(Number(paramString))) {
			return Number(paramString);
		} else if (paramString == "true" || paramString == "false") {
			return paramString == "true";
		} else if (paramString.startsWith("{") && paramString.endsWith("}")) {
			return JSON.parse(paramString);
		} else {
			return paramString;
		}
	}
}
