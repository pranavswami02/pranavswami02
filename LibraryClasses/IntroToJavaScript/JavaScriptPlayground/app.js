var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

run()

function output(s) {
    document.getElementById('output-area').innerHTML+=s+'\n'
}

function run() {
    document.getElementById('output-area').innerHTML='';
    try {
        eval(document.getElementById('input-code').value)
    } catch(e) {
        output(e.message)
    }
}