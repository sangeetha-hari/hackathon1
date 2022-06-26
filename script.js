// basic skeleton on html page.....
document.body.innerHTML = `
<div class="firstpart">
<h1 class="head">Welcome to National API search</h1><br/><br/>
    <div class="secCon">
        <label  class="lab"> Enter Name:  </label>
        <input type="text" placeholder="Name" id="ipName">
        <button   class="button btn btn-primary" onclick="getdata()">search</button>
    </div>
        </div> <br/> <br/>
<div class="twoSearch container pt-2 flex-wrap">
        <div class="normalDisplay flex-fill"></div>
        <div class="advDisplay flex-fill"></div>
        </div>
        `;


// function for read input from the user and fect the data
async function getdata() {
  // Read the data from the input tag given by user
  let name = document.querySelector("#ipName").value;
  letters = /^[A-Za-z]+$/;
  //Validate the input
  if(!name.match(letters))
     {
        alert("enter valid name");
     
     }
  // Set the url with the user input
  const url = `https://api.nationalize.io/?name=${name}`;
  try {
    let data = await fetch(url); // fetch the data
    let result = await data.json(); // convert to json format
    let prob1 = result.country[0].probability;
    // console.log(prob1.toFixed(2));
    Display(result);
    advSearch(result);
  } catch (error) {
    console.log(error);
  }
}

function Display(result) {
  //Display the content
  basicDisplay = document.querySelector(".normalDisplay");
  basicDisplay.innerHTML = ` <h5> Search result</h5>
<span><b> Country1: </b>${result.country[0].country_id} </span> 
<span> <b> Probability:</b> ${result.country[0].probability.toFixed(2)} </span><br/>
<span> <b>Country2: </b>${result.country[1].country_id} </span> 
<span><b> Probability: </b>${result.country[1].probability.toFixed(2)} </span>
`;
}

function advSearch(result) {
  let advancedSearch = document.querySelector(".advDisplay");
  advancedSearch.innerHTML = `<div class="my-4 container-fluid "> <h5> Advanced search</h5>
<input type="text" placeholder="Search country..." id="ipCountry" oninput="filter_list()">
<div class="list overflow-auto"> <ul class="list-group"> </ul></div>
</div>
`;
  let listconatiner = document.querySelector(".list-group");
  let countries = result.country;
  countries.forEach((ele) => {
    console.log(ele.country_id);
    listconatiner.innerHTML += `<li> ${ele.country_id}</li>`;
  });
}

function filter_list() {
  let inp = document.querySelector("#ipCountry");
  let list = document.querySelector(".list .list-group").querySelectorAll("li");
  let re = new RegExp(inp.value, "i");
  list.forEach((x) => {
    if (re.test(x.textContent)) {
      x.innerHTML = x.textContent.replace(re, "<b>$&</b>");
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
}
