const highlight = () => {
	const currentImage = document.querySelector('#slideshow img:not(.hidden)');

	let nextImage = currentImage.nextElementSibling;

	if (nextImage === null) {
		nextImage = document.querySelector('#slideshow :first-child');
	}

	currentImage.classList.add('hidden');
	nextImage.classList.remove('hidden');
};

setInterval(highlight, 1000);