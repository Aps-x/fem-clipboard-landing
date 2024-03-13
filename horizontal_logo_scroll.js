const scrollers = document.querySelectorAll(".scroller");
let animationAdded = false;

// Function to check if animation should be added
function checkAnimation() {
    // Check if the user is on desktop
    if (window.innerWidth >= 600) {
        // Check for preferred reduced motion and if the animation has already been
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !animationAdded) {
            addAnimation();
        }
    } else {
        // Remove the animation if the window is resized
        removeAnimation();
    }
}

// Initial check
checkAnimation();

// Event listener for window resize
window.addEventListener("resize", checkAnimation);

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
    // Set the flag to indicate that the animation has been added
    animationAdded = true;
}

function removeAnimation() {
    scrollers.forEach((scroller) => {
        // If the animation has not been removed, remove it
        if (animationAdded) {
            // Remove data-animated attribute
            scroller.removeAttribute("data-animated");

            // Remove duplicated items
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const duplicatedItems = scrollerInner.querySelectorAll("[aria-hidden=true]");
            duplicatedItems.forEach((item) => {
                scrollerInner.removeChild(item);
            });
        }
    });
    // Set the flag to indicate that the animation has been removed
    animationAdded = false;
}
