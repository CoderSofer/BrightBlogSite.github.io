// Ensures that your JavaScript code runs only after the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	// Enable us to grab every image tag and save into a variable
	const images = document.querySelectorAll("img");

	// Loop to go through all images
	for(const image of images){
		// Creating a request from this website 
		fetch("https://dog.ceo/api/breeds/image/random ")
		// processes the response from the fetch call
		.then(response => response.json())
		.then(data => {
			image.src = data.message
			image.width = 200
			image.height = 200
		
		})

	}

})