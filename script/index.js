function loadCategories() {
	// Fetch The Data
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		// Convert Promise to json
		.then((res) => res.json())
		// Send data to display
		.then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
	// get the container
	const categoryContainer = document.getElementById("category-container");
	// Loop operation on array of objects
	for (const category of categories) {
		// Create Element
		const categoryDiv = document.createElement("div");
		categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
		// Add Element
		categoryContainer.appendChild(categoryDiv);
	}
}

loadCategories();
