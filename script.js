function generateCatImage() {
    const catImagesContainer = document.getElementById("user-data");
    // Clear any existing image
    catImagesContainer.innerHTML = "";

    // Define the array of HTTP status codes
    const statusCodes = [
        200, 201, 204, 301, 302, 400, 401, 403, 404, 418, 500, 503,
    ];

    // Pick a random code
    const randomIndex = Math.floor(Math.random() * statusCodes.length);
    const code = statusCodes[randomIndex];

    // Create the image element
    const catImage = document.createElement("img");
    catImage.src = `https://http.cat/${code}`;
    catImage.alt = `HTTP Cat ${code}`;
    catImage.className = "cat-img"; // Use your CSS to style this image
    catImage.style.cursor = "pointer"; // Indicate it's clickable

    // When the image is clicked, generate a new one
    catImage.addEventListener("click", generateCatImage);

    // Append the image to the container
    catImagesContainer.appendChild(catImage);
}

// Generate an image on page load
generateCatImage();

// Toggle between two YouTube videos in the Extra Info Section
const toggleVideoBtn = document.getElementById("toggle-video");
const infoVideo = document.getElementById("info-video");

// Define the two YouTube embed URLs
const videoURL1 = "https://www.youtube.com/embed/1sjxXucqU_8";
const videoURL2 = "https://www.youtube.com/embed/05j6c06iFWE";

toggleVideoBtn.addEventListener("click", () => {
    // Check the current src and toggle
    if (
        infoVideo.src === videoURL1 ||
        infoVideo.src === videoURL1 + "?enablejsapi=1"
    ) {
        infoVideo.src = videoURL2;
    } else {
        infoVideo.src = videoURL1;
    }
});

// Extra Interactivity: A cat paw GIF that replaces the mouse cursor
const catPaw = document.createElement("img");
catPaw.src = "img/bap-paw.gif";
catPaw.style.position = "absolute";
catPaw.style.width = "50px"; // Adjust size as needed
catPaw.style.pointerEvents = "none"; // Allow clicks to pass through
document.body.appendChild(catPaw);

document.addEventListener("mousemove", (e) => {
    // Position the GIF so it centers on the cursor
    catPaw.style.left = e.pageX - catPaw.offsetWidth / 2 + "px";
    catPaw.style.top = e.pageY - catPaw.offsetHeight / 2 + "px";
});

// Smooth Image Transition on Click with Toggling
const profilePhoto = document.getElementById("profilePhoto");

profilePhoto.addEventListener("click", () => {
    // Start fade-out by setting opacity to 0
    profilePhoto.style.opacity = "0";
});

profilePhoto.addEventListener("transitionend", (event) => {
    // Ensure the opacity transition has ended and the image is fully faded out
    if (
        event.propertyName === "opacity" &&
        getComputedStyle(profilePhoto).opacity === "0"
    ) {
        // Toggle the image source based on the current image.
        // Since profilePhoto.src returns the full URL, check for the filename.
        const currentSrc = profilePhoto.src;
        const newImageSrc = currentSrc.includes("pidan2.jpeg")
            ? "img/pidan.jpeg"
            : "img/pidan2.jpeg";

        // Preload the new image
        const preloader = new Image();
        preloader.src = newImageSrc;
        preloader.onload = () => {
            // Once the new image is loaded, update the src and fade the image back in
            profilePhoto.src = newImageSrc;
            // Force reflow so the browser registers the change immediately
            void profilePhoto.offsetWidth;
            profilePhoto.style.opacity = "1";
        };

        preloader.onerror = () => {
            console.error("Error loading new image:", newImageSrc);
        };
    }
});

document.addEventListener("click", function (e) {
    // Create a span element to serve as the ripple
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    // Calculate the position of the ripple (adjusting for its size)
    const size = 10; // size in pixels; adjust as needed
    const x = e.pageX - size / 2;
    const y = e.pageY - size / 2;

    // Apply position and size
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    // Append ripple to the document body
    document.body.appendChild(ripple);

    // Remove the ripple element after the animation ends
    ripple.addEventListener("animationend", function () {
        ripple.remove();
    });
});
