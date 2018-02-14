function copyToClip(tag) {
                                
    var copyText = tag
    selectElementTest(copyText)
    document.execCommand("Copy")
    window.getSelection().removeAllRanges();

}

function selectElementTest(el) {
    var range = document.createRange();
    range.selectNodeContents(el)
    var selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range);
}

function contactCopy(index) {
    copyToClip(document.getElementsByClassName('contact-content')[index]);
}
function contactNotCopy(index) {
    copyToClip(document.getElementsByClassName('contact-type')[index]);
}