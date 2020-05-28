console.log("Hello");
showNote();

//Take Note Input;
let noteAdd = document.getElementById("noteAddition");

noteAdd.addEventListener("click", function (e) {
  let noteText = document.getElementById("noteText");
  let title = document.getElementById("title");
  let titles = localStorage.getItem("titleGet");
  
  if (titles == null) {
    titleList = [];
  } else {
    titleList = JSON.parse(titles);
  }
  titleList.push(title.value);
  ;
  let notes = localStorage.getItem("notes");
 
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }
  notesList.push(noteText.value);
  localStorage.setItem("notes", JSON.stringify(notesList));
  localStorage.setItem("titleGet", JSON.stringify(titleList));
  noteText.value = "";
  showNote();
});

// Add notes onto the div;
function showNote() {
  let card = ``;
  let titles = localStorage.getItem("titleGet");
  
  if (titles == null) {
    titleList = [];
  } else {
    titleList = JSON.parse(titles);
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }

  notesList.forEach(function (element, index) {
    var final = titleList[index];
    
    if (index % 2 == 0) {
      card += `
        
        <div class="card text-dark bg-dark mb-3 mx-4 my-2 chang"  style="max-width: 18rem; background:#e6df29 !important;">
        <div class="card-header" id="titleChange">${final}
        <i class="fas fa-bookmark right" id="k" onclick="addBookMark(${index})"></i>
        </div>
        <div class="card-body" id="${index}">
        <hr class="dark1" />
          <p class="card-text">${element}</p>
         <hr class="dark1" /> 
         <button class="btn btn-dark" id="${index}" onclick="edit(this.id)">Edit my Note!</button>
        
        <button class="btn btn-primary" id="${index}" onclick="remove(this.id)">Delete Note</button>
        </div>
        
        </div>`;
    } else {
      card += `
        
        <div class="card text-dark bg-dark mb-3 mx-4 my-2 chang "  style="max-width: 18rem; background:skyblue !important;">
        <div class="card-header">${final}
        <i class="fas fa-bookmark right" id="k" onclick="addBookMark(${index})"></i></div>
        <div class="card-body" id="${index}">
        <hr class="dark1" />
          <p class="card-text">${element}</p>
         <hr class="dark1" /> 
         <button class="btn btn-dark" id="${index}" onclick="edit(this.id)">Edit my Note!</button>
        
        <button class="btn btn-primary" id="${index}" onclick="remove(this.id)">Delete Note</button>
        </div>
        
        </div>`;
    }
  });

  let div = document.getElementById("notes");
  if (div.length == 0) {
    div.innerHTML = "No Notes Added! Add some now.";
  } else {
    div.innerHTML = card;
  }


  title.value = "";
}
//Remove a particular note;
function remove(index) {
  let titles = localStorage.getItem("titleGet");
  
  if (titles == null) {
    titleList = [];
  } else {
    titleList = JSON.parse(titles);
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }

  notesList.splice(index, 1);
  titleList.splice(index, 1);
  
  localStorage.setItem("notes", JSON.stringify(notesList));
  localStorage.setItem("titleGet", JSON.stringify(titleList));
  showNote();
}
// Search For Text in NOtes;
let search = document.getElementById("searchNote");
search.addEventListener("input", function () {
  let tobeSearched = search.value.toLowerCase();
  console.log(tobeSearched);
  let cards = document.getElementsByClassName("chang");
  Array.from(cards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    
    if (cardTxt.includes(tobeSearched)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
//Delete All Notes;
function deleteall() {
  let titles = localStorage.getItem("titleGet");
  
  if (titles == null) {
    titleList = [];
  } else {
    titleList = JSON.parse(titles);
  }
  let notes = document.getElementById("notes");
  notes.innerHTML = "";
  localStorage.clear();
  titleList.splice(0, titleList.length);
 
}
function edit(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }
  let card = document.getElementById(index);
 

  let text = ` 
    <p class="lead">Edit here:</p>

    <br/>
    <textarea class="form-control" id="editcard" rows="4">${notesList[index]}</textarea>
    <p></p>
    <button onclick="end(this.id)" id="${index}" class="btn btn-success">Save</button>
    
   
   
    `;
  card.innerHTML = text;
}

//Move out of edit mode
function end(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }
  let updated = document.getElementById("editcard");
  notesList[index]=updated.value;
  localStorage.setItem("notes", JSON.stringify(notesList));
  showNote();
}


function addBookMark(index){
  let titles = localStorage.getItem("titleGet");
  
  if (titles == null) {
    titleList = [];
  } else {
    titleList = JSON.parse(titles);
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesList = [];
  } else {
    notesList = JSON.parse(notes);
  }
  let bookmarks = localStorage.getItem("bookMarks");
  if (bookmarks == null){
     bookmarksList = []
  }else{
    bookmarksList = JSON.parse(bookmarks);
  }
  let boolean = {}
  for(i of notesList){
    boolean[i] = 1;
  }
  for(i of bookmarksList){
    boolean[i] = 0;
  }
  if(boolean[notesList[index]]==1){
  bookmarksList.push(notesList[index]);
  }
  bookmarkstitleList = {};
  for(let i=0; i<notesList.length;++i){
    bookmarkstitleList[notesList[i]] = titleList[i];
  }
  console.log(bookmarkstitleList);
  localStorage.setItem("bookMarks", JSON.stringify(bookmarksList));
  let card = ``;
  bookmarksList.forEach(function(element, index){
    var Final = bookmarkstitleList[element];
    card +=`<div class="card text-dark bg-dark mb-3 mx-4 my-2 chang"  style="max-width: 18rem; background:Firebrick !important;">
    <div class="card-header" id="titleChange">${Final}
    <i class="fa fa-sticky-note right" id="k"></i>
    </div>
    <div class="card-body" id="${index}">
    <hr class="dark1" />
      <p class="card-text">${element}</p>
     <hr class="dark1" /> 
    </div>
    
    </div>`
  });
  let bookmarkarea = document.getElementById("bookMarks");
  bookmarkarea.innerHTML = card;

  let deletebookmarks = document.getElementById("deletall");
  deletebookmarks.addEventListener("click", function(e){
   let bookmarkarea = document.getElementById("bookMarks");
  bookmarkarea.innerHTML = "";
  });

  

}
