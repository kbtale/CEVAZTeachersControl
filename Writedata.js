tEmails = [
  "narraiz@cevaz.com",
  "j.gonben@gmail.com",
  "ehernandez@cevaz.com",
  "alainsalazar91@gmail.com",
  "andreau@cevaz.com",
  "afuentes@cevaz.com",
  "brayes@cevaz.com",
  "danielescalona0397@gmail.com",
  "ebenavides@cevaz.com",
  "joaquin.machado.13@gmail.com",
  "l.camacho@cevaz.com",
  "teachermsalazar@cevaz.com",
  "margaretgilbert778@gmail.com",
  "ing.comp.moisesgonzalez@gmail.com",
  "ramirovillaloboscnu2014@gmail.com",
  "ronald.enrique.ab@gmail.com",
  "s.calatayud@cevaz.com",
  "carlosdelgado1025@gmail.com",
  "carlosmiguel.ventoardin@gmail.com"
]
tNames = [
  "Nelly Arraiz",
  "Juan González",
  "Evy Hernández",
  "Alain Salazar",
  "Andrea Urdaneta",
  "Aura Fuentes",
  "Badr El Rayes",
  "Daniel Escalona",
  "Ernesto Benavides",
  "Joaquín Machado",
  "Luis Camacho",
  "Mariela Salazar",
  "Margaret Gilbert",
  "Moisés González",
  "Ramiro Villalobos",
  "Ronald Almarza",
  "Sergio Calatayud",
  "Carlos Delgado",
  "Carlos Vento"
]
gradesProfiles = [
  [
    {
      name: "Workshop 1",
      cell: "c3",
    },
    {
      name: "Workshop 2",
      cell: "c5",
    },
    {
      name: "Workshop 3",
      cell: "c7",
    },
    {
      name: "Final Workshop",
      cell: "c9",
    },
    {
      name: "Final Exam",
      cell: "c10",
    }
  ],
  [
    {
      name: "Final Speaking",
      cell: "c9",
    },
    {
      name: "Final Exam",
      cell: "c10",
    }
  ],
  [
    {
      name: "Diagnostic",
      cell: "c3",
    },
    {
      name: "Writing 1",
      cell: "c4",
    },
    {
      name: "Speaking 1",
      cell: "c5",
    },
    {
      name: "Validation 1",
      cell: "c6",
    },
    {
      name: "Writing 2",
      cell: "c7",
    },
    {
      name: "Speaking 2",
      cell: "c8",
    },
    {
      name: "Validation 2",
      cell: "c9",
    },
    {
      name: "Writing 3",
      cell: "c10",
    },
    {
      name: "Speaking 3",
      cell: "c11",
    },
    {
      name: "Validation 3",
      cell: "c12",
    },
    {
      name: "Writing 4",
      cell: "c13",
    },
    {
      name: "Speaking 4",
      cell: "c14",
    },
    {
      name: "Validation 4",
      cell: "c15",
    },
    {
      name: "Final Speaking",
      cell: "c16",
    },
    {
      name: "Final Oral",
      cell: "c17",
    },
    {
      name: "Final Writing",
      cell: "c18",
    },
    {
      name: "Diagnostic 2",
      cell: "c19",
    }
  ]
]

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
(urlParams.get('group') == 0) ? validGroup = false : validGroup = true
teachersList = []

if (validGroup){
  table = document.getElementById("user-grades")
  groupsSelect = document.getElementsByName("group")[0]
  sCount = table.getElementsByClassName("user c0").length
  tCount = table.getElementsByClassName("useremail c2")
  emails = []
  tableCounts = []

  for (var i = 0; i < tCount.length; i++) {
  emails[i] = tCount[i].innerHTML
  }
  emails.forEach((email, i) => {
     if (tEmails.includes(email)){
       teachersList.push(tNames[tEmails.indexOf(email)]);
     }
  });
  studentsCount = emails.length - teachersList.length;

  groupType = detectGroupType();
  for (var i = 0; i < gradesProfiles[groupType].length; i++) {
    tableCounts[i] = doCount(gradesProfiles[groupType][i].cell);
  }

  createTable();
  teachersList = teachersList.join(', ')

  groupsSelect.addEventListener("change", (e) => {
    (urlParams.get('group') == 0) ? validGroup = false : validGroup = true
    if (validGroup){
      sCount = table.getElementsByClassName("user").length
    }
  })
}

function doCount(c){
  cellClass = "grade " + c;
  grades = table.getElementsByClassName(cellClass)
  for (var count = j = 0; j < grades.length; j++) {
    if (grades[j].innerText != '-')
      count++;
  }
  return count;
}

function createTable(){
  var countTable = document.createElement('table');
  countTable.className = "minimalistBlack"
  var info = document.createElement("div");
  var nofs = document.createElement('span')
  var teachers = document.createElement('span')
  nofs.textContent = "Registered: " + studentsCount;
  teachers.textContent = "Teachers: " + teachersList.join(', ');
  info.appendChild(nofs);
  info.appendChild(document.createElement("br"))
  info.appendChild(teachers);
  info.classList = "infotext";
  document.getElementsByClassName("gradeparent")[0].insertAdjacentElement("beforebegin", info);


  var thead = document.createElement('thead');

  for (var i = 0; i < gradesProfiles[groupType].length; i++) {
    var th = document.createElement('th');
    th.innerText = gradesProfiles[groupType][i].name
    thead.appendChild(th);
  }
  countTable.appendChild(thead);

  var tr = document.createElement('tr');
  for (var i = 0; i < gradesProfiles[groupType].length; i++) {
    var td = document.createElement('td');
    var centerText = document.createElement("center");
    centerText.innerText = tableCounts[i]
    td.appendChild(centerText)
    if (tableCounts[i] == studentsCount)
      td.classList = "success";
    else if (tableCounts[i] > 0)
      td.classList = "onProgress";

    tr.appendChild(td);
  }
  countTable.appendChild(tr);
  console.log(countTable);
  document.getElementsByClassName("gradeparent")[0].insertAdjacentElement("beforebegin", countTable);
}

function detectGroupType(){
  gts = ["KIDS", "TEENS", "ADULTS"]
  groupType = document.getElementsByClassName("gradeitemheader")[0].innerHTML
  try {
    gts.some((t, i) => {
      if (groupType.includes(t)) {
        groupType = i;
        return true;
      }
    });
  return groupType;
  }
  catch {
    console.log("Error, is not a kids, teens or adults group.")
  }
}

/*
  function startChange(){
    if (document.getElementById('id_sessiontype_1')){
      document.getElementById('id_sessiontype_1').checked = true;
      document.getElementById('id_sessiontype_0').checked = false;
    }
    document.getElementsByName("addmultiply")[0].checked = true;
    document.getElementById("id_headeraddmultiplesessions").classList.remove("collapsed");

    var scheduleSelect = document.createElement("select");
    scheduleSelect.id = "schedule_select";
    scheduleSelect.classList = "select";
    var option = document.createElement("option");
    option.text =  "-- Select an option --";
    option.disabled = true;
    option.selected = true;
    scheduleSelect.appendChild(option);
    for (var i = 0; i < formats.length; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = formats[i].name;
      scheduleSelect.appendChild(option);
    }
    document.getElementById("fitem_id_groups").insertAdjacentElement("afterend",scheduleSelect);
  }

  window.addEventListener('load', (event) => {
    startChange();
  });

  document.addEventListener('change',function(e){
      if(e.target && e.target.id == 'schedule_select'){
        selection = document.getElementById("schedule_select").value;
        console.log(selection)
        useFormat(formats[selection].options);
      }
  });

  document.getElementById("id_groups").addEventListener('change', (event) => {
    secondHour = [];
    hoursSkipped = 0;

    selection = document.getElementById("id_groups").options[document.getElementById("id_groups").selectedIndex].text;
    days.forEach((day, i) => {
      (selection.includes(day)) ? document.getElementById(days_id[i]).checked = true : document.getElementById(days_id[i]).checked = false;
    })

    for (const [i, hour] of hours.entries()) {
      if (selection.includes(hour)){
        document.getElementsByName("sestime[starthour]")[0].value = hours_input[i][0];
        document.getElementsByName("sestime[startminute]")[0].value = hours_input[i][1];
        secondHour = hours.slice(i+1, hours.length);
        hoursSkipped = i+1;
        break;
      }
    }

    for (const [i, hour] of secondHour.entries()) {
      if (selection.includes(hour)){
        document.getElementsByName("sestime[endhour]")[0].value = hours_input[hoursSkipped+i][0];
        document.getElementsByName("sestime[endminute]")[0].value = hours_input[hoursSkipped+i][1];
        break;
      }
    }

  });
*/
