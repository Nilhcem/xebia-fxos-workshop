/* About */
var about = document.querySelector("#about");
about.onclick = function () {
    alert("Hands-on Firefox OS\nXKE 2013");
}

/* Choose a picture */
var pickImage = document.querySelector("#pick-image");
pickImage.onclick = function () {
    var pick = new MozActivity({
        name: "pick",
        data: {
            type: ["image/png", "image/jpg", "image/jpeg"]
	}
    });

    pick.onsuccess = function () {
	switchToPage(1);
        var imageContainer = document.querySelector("#original-image-container");
	var prevImg = document.querySelector("#original-image");
	if (prevImg) {
	    imageContainer.removeChild(prevImg);
	}

	var img = document.createElement("img");
	img.setAttribute("id", "original-image");
        img.src = window.URL.createObjectURL(this.result.blob);

        imageContainer.appendChild(img);
        imageContainer.style.display = "block";
    };

    pick.onerror = function () {
        alert("Can't view the image!");
    };
}

/* Back button */
var editorBack = document.querySelector("#editor-back");
editorBack.onclick = function () {
    switchToPage(0);
}

/* Effect button */
var editorEffect = document.querySelector("#editor-effect");
editorEffect.onclick = function () {
    toggleEffectSelectionDialog(true);
}

/* Share button */
var editorShare = document.querySelector("#editor-share");
editorShare.onclick = function () {
    var canvasToShare = document.querySelector("#canvas-image");

    if (hasClass(canvasToShare, "hidden")) {
	// Current selected image is the original one, which means there is no canvas
	// Create dummy canvas
	var origImage = document.querySelector("#original-image");
        canvasToShare = document.createElement("canvas");
        canvasToShare.width = origImage.width;
        canvasToShare.height = origImage.height;
        // Get context and draw image
        var canvasContext = canvasToShare.getContext("2d");
        canvasContext.drawImage(origImage, 0, 0);
    }

    // Share canvas
    canvasToShare.toBlob(function (blob) {
        var sharingImage = new MozActivity({
	    name: "share",
	    data: {
                type: "image/*",
                number: 1,
                blobs: [blob]
	    }
        });
    });
}

/* Whether element has a CSS class */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/* Switch to page $pageId
 * 0: #photo-selection
 * 1: #photo-editor
 */
function switchToPage(pageId) {
    var photoSelection = document.querySelector("#photo-selection");
    var photoEditor = document.querySelector("#photo-editor");

    if (pageId == 0) {
	photoEditor.classList.add("hidden");
	photoSelection.classList.remove("hidden");
    } else {
	photoSelection.classList.add("hidden");
	photoEditor.classList.remove("hidden");
    }
}

/* (Show | Hide) Effect Selection Dialog */
function toggleEffectSelectionDialog(show) {
    var effectSelection = document.querySelector("#effect-selection");
    if (show) {
	effectSelection.classList.remove("hidden");
    } else {
	effectSelection.classList.add("hidden");
    }
}

/* Apply an effect from the original image to the canvas */
function applyEffect(type) {
    var orig = document.querySelector("#original-image");
    var canvas = document.querySelector("#canvas-image");

    if (type == null) {
	orig.classList.remove("hidden");
	canvas.classList.add("hidden");
    } else {
	performEffect(type, orig, canvas);
	canvas.classList.remove("hidden");
	orig.classList.add("hidden");
    }
    toggleEffectSelectionDialog(false);
}
