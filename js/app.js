/* Example of page switching */
var removeMe = document.querySelector("#remove_me");
removeMe.onclick = function () {
    switchToPage(1);
}

/* Back button */
var editorBack = document.querySelector("#editor-back");
editorBack.onclick = function () {
    switchToPage(0);
}

/* Effect button */
var editorEffect = document.querySelector("#editor-effect");
editorEffect.onclick = function () {
    // todo
}

/* Share button */
var editorShare = document.querySelector("#editor-share");
editorShare.onclick = function () {
    // todo
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
