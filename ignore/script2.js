var repoCounter = 0;
var table2 = document.getElementById('tablebodytwo');

var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/sawrozpdl/sawrozpdl.github.io/contents/', true);
request.onload = function () {
  var data = JSON.parse(this.response); //this.response is basically the data received which is arraylist of JSON
  if (request.status >= 200 && request.status < 400) {
    data.forEach(repo => {
      
      var title = repo.name;
      if (title == "index.html" || title == "ignore") {
          
      }
      else {
      var directUrl = title + "/index.html";
      var codeUrl = "https://github.com/sawrozpdl/sawrozpdl.github.io/tree/master/" + title;
      repoCounter++;

      var row = document.createElement('tr');
      row.innerHTML = "<td>" + title + `</td> <td> <a href="${directUrl}">Link<a/> </td> <td> <a href="${codeUrl}">Link<a/> </td>`;
      table2.appendChild(row);
      }
      
    });
  } else {
    console.log("Error lol!");
  }
}
request.send();
