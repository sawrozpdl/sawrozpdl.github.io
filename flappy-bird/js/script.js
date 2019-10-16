var div = document.createElement('div');
for (var i = 0; i < 5;i++) {
    var p = document.createElement('p');
    for (var j = 0; j<=i ; j++) {
        p.innerHTML += "*";
    }
    div.appendChild(p);
}

document.body.appendChild(div);

// ------------------------------------------------  //

var domParser = function (data, destination) {
    var table = document.createElement('table');
    var headRow = document.createElement('tr');
    var headDataLeft = document.createElement('th');
    var headDataRight = document.createElement('th');
    headDataLeft.innerHTML = "Key";
    headDataRight.innerHTML = "Value";
    headRow.appendChild(headDataLeft);
    headRow.appendChild(headDataRight);
    table.appendChild(headRow);
    for (var key in data) {
        var row = document.createElement('tr');
        var left = document.createElement('td');
        var right = document.createElement('td');
        left.innerText = key;
        if (typeof data[key] == 'object') {
            domParser(data[key], right);
        }
        else {
            right.innerText = data[key];
        }
        row.appendChild(left);
        row.appendChild(right);
        table.appendChild(row);  
    }
    destination.appendChild(table);
}

var saroj = {
    name : "Saroj",
    age : 19,
    email : "sarojpaudyal53@gmail.com",
    college : "Herald College Kathmandu",
    location : "Kathmandu",
    male: true,
    hobbies : ['Swimming', 'Watching Movies', 'Coding'],
    education : [{
        name : 'New Light School',
        date_Joined : '2004'
    }, {
        name : 'New Horizon School',
        date_Joined : '2006'
    }, {
        name : 'New Horizon School',
        date_Joined : '2016'
    }, {
        name : 'Herald College',
        date_Joined : '2018'
    }],
    work : false
}

var table = document.createElement("div");
domParser(saroj, table)
document.body.appendChild(table);
