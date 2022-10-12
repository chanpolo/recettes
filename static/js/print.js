function printDivContent() {
    var contentOfDiv = document.getElementById("divCon").innerHTML;
    var newWin = window.open('', '', 'height=650, width=650');
    newWin.document.write('');
    newWin.document.write('<title>{{ if .Params.Titleshort}}{{.Params.Titleshort}}{{else}}{{.Title}}{{end}}</title>');
    newWin.document.write(' <center><h1>{{ if .Params.Titleshort}}{{.Params.Titleshort}}{{else}}{{.Title}}{{end}}</h1></center> ');
    newWin.document.write(contentOfDiv);
    newWin.document.write('');
    newWin.document.close();
    newWin.print();
}
