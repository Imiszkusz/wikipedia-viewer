var randomURL = "https://en.wikipedia.org/wiki/Special:Random";

document.getElementById("random").addEventListener("click", function(){
  window.open(randomURL);
})


var searchBox = document.getElementById("searchbox");
var resultBox = document.getElementById("resultbox");
var newSearch = document.getElementById("newsearch");
var inputForm = document.getElementById("searchform");
var searchBar = document.getElementById("searchbar");
var inputVal;

newSearch.addEventListener("click", function(){
  newSearch.style.display = "none";
  resultBox.innerHTML = "";
  resultBox.style.display = "none";
  searchBox.style.display = "flex";
  searchBar.value = "";
})


inputForm.addEventListener("submit", search);





function search(event){
  
  event.preventDefault();
  inputVal = searchBar.value;
  

  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&exsentences=1&exlimit=10&explaintext=true&generator=search&gsrsearch=" + inputVal + "&gsrwhat=text&origin=*&format=json",
    dataType: "json",
    type: "GET",
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
      
       var pages = data.query.pages;
       searchBox.style.display = "none";
       resultBox.style.display = "flex";
       newSearch.style.display = "initial";
      
     for(var i in pages){
        var resultDiv = document.createElement("div");
        var p = document.createElement("p");
        var h = document.createElement("h4");

        resultDiv.appendChild(h);
        h.innerHTML = "<a href='https://en.wikipedia.org/?curid=" + pages[i].pageid + "' target='_blank'>" + pages[i].title + "</a>";
        resultDiv.appendChild(p);
        resultDiv.style.borderBottom = "2px solid blue";
        p.textContent = pages[i].extract;
        resultBox.appendChild(resultDiv);
       }
      
    resultBox.lastChild.style.border = "none";   
   }
  })
 }
