// Made by © Lumaa 2023-2025

/**
 * The Animatic class, allows native scroll animations
 */
class Animatic {
	/**
	 * Create a new scroll animation
	 * @param {HTMLElement} element Targetted element
	 */
	constructor(element) {
		this.element = element;
		let rect = element.getBoundingClientRect();
		this.activateScroll = rect.y;
		this.deactivateScroll = rect.y + element.clientHeight;

		document.addEventListener("scroll", () => {
			let actualScroll =
				document.documentElement.scrollTop + window.innerHeight / 2;

			if (
				actualScroll >= this.activateScroll &&
				document.documentElement.scrollTop <= this.deactivateScroll
			) {
				let begin = actualScroll - this.activateScroll;
				let scrollPourcentage = Math.min(begin / this.deactivateScroll, 1);

				this.onScroll(scrollPourcentage, this.element);
			} else if (actualScroll < this.activateScroll) {
				this.onScroll(0, this.element);
			} else if (document.documentElement.scrollTop > this.deactivateScroll) {
				this.onScroll(1, this.element);
			}
		});
	}

	/**
	 * Executes when the user scrolls, often use for changing style variables
	 * @param {Number} scroll Number between 0 and 1 representing the scroll pourcentage
	 * @param {HTMLElement} element The selected element
	 */
	onScroll(scroll, element) {
		console.warn(`[DEVELOPER] Replace the "onScroll" Animatic function!`);
	}

	/**
	 * Detect if a certain element is visible in the viewport
	 * @param {HTMLElement?} element
	 * @returns {boolean} The visible in the viewport or not
	 */
	isInViewport(element) {
		const rect =
			element != null
				? element.getBoundingClientRect()
				: this.element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	/**
	 * Create a new Animatic object with a pre-set `onScroll` function
	 * @param {ElementCSSInlineStyle?} initialStyle The initial style to set to the element that is not on screen
	 * @param {ElementCSSInlineStyle?} viewingStyle The viewing style to set to the element that is on screen
	 */
	appearPrefab(initialStyle, viewingStyle) {
		if (initialStyle == null && viewingStyle == null)
			this.element.style.transition = "opacity 0.5s ease-in-out";
		this.onScroll = (_, elm) => {
			if (this.isInViewport(elm)) {
				if (initialStyle == null) {
					elm.style.opacity = "1";
				} else {
					elm.style = initialStyle;
				}
			} else {
				if (viewingStyle == null) {
					elm.style.opacity = "0";
				} else {
					elm.style = initialStyle;
				}
			}
		};
	}
}
