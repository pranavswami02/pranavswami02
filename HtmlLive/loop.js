function run() {
    var inpI = document.getElementById('text-input-index')
    var index = inpI.value
    var inpT = document.getElementById('text-input-title')
    var title = inpT.value
    if(index==""||index==null||title==""||title==null)
        return;
    inpI.value = parseInt(inpI.value)+1
    
    window.open('Webpages/runner.html?'+title+"/index="+index,"_blank")
    
}

window.addEventListener('keyup', function(e){
    if(e.keyCode==13)
        run()
})
 