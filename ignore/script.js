var repoCounter = 0;
var table = document.getElementById('tablebodyone');

var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/users/sawrozpdl/repos', true);
request.onload = function () {
  var data = JSON.parse(this.response); //this.response is basically the data received which is arraylist of JSON
  if (request.status >= 200 && request.status < 400) {
    data.forEach(repo => {
      
      var title = repo.name;
      var directUrl = "https://sawrozpdl.github.io/" + title;
      var htmlUrl = repo.html_url;
      var desc = repo.description;
      repoCounter++;
      var status = "In-Development";
      var colorClass = "red"; 
      var keywords = desc.split(" ");
      if (keywords.includes("completed")) {
          status = "Completed";
          colorClass = "green";
      }
      

      var row = document.createElement('tr');
      row.innerHTML = "<td>" + title + `</td> <td> <a href="${directUrl}">Link<a/> </td> <td class = "${colorClass}">` + status + `</td> <td> <a href = "${htmlUrl}">Link</a></td>`;
      table.appendChild(row);
    });
  } else {
    console.log("Error lol!");
  }
}
request.send();
