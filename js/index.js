"use strict";
const mealsRow                                      = document.querySelector("#mealsRow");
const searchByNameInput                             = document.querySelector("#searchByNameInput");
const userName                                      = document.querySelector("#name");
const email                                         = document.querySelector("#email");
const age                                           = document.querySelector("#age");
const phone                                         = document.querySelector("#phone");
const password                                      = document.querySelector("#password");
const repassword                                    = document.querySelector("#repassword");
const invalidUserName                               = document.querySelector("#invalidName");
const invalidEmail                                  = document.querySelector("#invalidEmail");
const invalidAge                                    = document.querySelector("#invalidAge");
const invalidPhone                                  = document.querySelector("#invalidPhone");
const invalidPassword                               = document.querySelector("#invalidPassword");
const invalidRepassword                             = document.querySelector("#invalidRepassword");
let count                                           = 0; // a variable to count valid inputs for the contact us

// Event Listeners
// Side navigation button
$("#openBtn").click(function(){
    if ($("#mySidenav").width() =="250"){
        $("#openBtn").text("≣");
        $("#content").animate({marginLeft:"0px"},"slow");
        $("#mySidenav").animate({width:"0px"});
        $("#list a").animate({top:"300px"},500);

    }else{
        $("#openBtn").text("X");
        $("#sidenavFooter").show();
        $("#mySidenav").animate({width:"250px"},"slow");
        for (let i = 0; i < 5; i++) {
            $("#list a").eq(i).animate({top: 0}, (i + 5) * 100);
        }
        $("#content").animate({marginLeft:"250px"},"slow");
    }
})
// Side Navigation search tab
$(".search").click(function(){
    $("#home").hide();
    $("#openBtn").click();
    $("#contact").hide();
    $("#search").show();
})
// Side Navigation categories tab
$(".categories").click(function(){
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").hide();
    $("#home").show();
    getCategories();
})
// Side Navigation area tab
$(".area").click(function(){
    $("#openBtn").click();
    getArea();
})
// Side Navigation ingredients tab
$(".ingredients").click(function(){
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").hide();
    $("#home").show();
    getIngredients();
})
// logo to home screen
$("#logo").click(function(){
    searchByName([]);
    $("#contact").hide();

})
$(".contact").click(function(){
    $("#home").hide();
    $("#openBtn").click();
    $("#search").hide();
    $("#contact").css({"display":"flex",
    "justify-content"                               : "center",
    "align-items"                                   : "center",
    "min-height"                                    : "100vh",
    "margin-top"                                    : "auto",});
})
$(userName).blur(function(){
    validateName();
})
$(email).blur(function(){
    validateEmail();
})
$(phone).blur(function(){
    validatePhone();
})
$(age).blur(function(){
    validateAge();
})
$(password).blur(function(){
    validatePassword();
})
$(repassword).blur(function(){
    validateRepassword();
})

// Functions 
// UI meals display function
function displayMeals(arr) {
    let cartoona                                    = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona                                    += `
        <div class                                  = "col-md-3">
        <figure class                               = " position-relative overflow-hidden rounded-2 ">
            <img src                                = "${arr[i].strMealThumb}" class=" w-100" alt="...">
            <figcaption onclick                     = "getMealFullDetails(${arr[i].idMeal})" id="figCap" class=" position-absolute d-flex align-items-center text-black p-2"><h3>${arr[i].strMeal}</h3></figcaption>
        </figure>
    </div>
        `
    };
    mealsRow.innerHTML                              = cartoona;
}

// Search by meal name 
async function searchByName(term) {
    mealsRow.innerHTML                              = "";
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response                                        = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals)   : displayMeals([]);
    $("#loading").fadeOut(500);
    $("#contact").hide();
}

// empty function call to display random meals on website first load
searchByName([]);

// Search by meal name 
async function searchByFirstLetter(term) {
    mealsRow.innerHTML                              = ``;
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response                                        = await response.json();
    console.log(displayMeals(response.meals) );
    $("#home").show();
    response.meals ? displayMeals(response.meals)   : displayMeals([]);
    $("#loading").fadeOut(500);
}

// get the available categories from the API and prepare them for the UI
async function getCategories(){
    mealsRow.innerHTML                              = ``;
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response                                        = await response.json();
    $("#home").show();
    displaCategoryMeals(response.categories);
    $("#loading").fadeOut(500);
}

// show the available categories fetched from the API on the UI
function displaCategoryMeals(arr) {
    let cartoona                                    = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona                                    += `
        <div class                                  = "col-md-3 ">
        <figure onclick                             = "displayCategories('${arr[i].strCategory}')" class                     = "position-relative overflow-hidden rounded-2 ">
            <img src                                = "${arr[i].strCategoryThumb}" class="w-100 " alt="...">
            <figcaption id                          = "figCap" class=" position-absolute d-flex align-items-center flex-column  text-black p-2">
            <h3 onclick                             = "displayCategories('${arr[i].strCategory}')" class="fw-bold ">${arr[i].strCategory}</h3>
            <p onclick                              = "displayCategories('${arr[i].strCategory}')" class="text-center ">${(arr[i].strCategoryDescription)}</p>
            </figcaption>
        </figure>
    </div>
        `
    };
    mealsRow.innerHTML                              = cartoona;
}

//  get the clicked category meals from API and send them to the UI 
async function displayCategories(term){
    mealsRow.innerHTML                              = ``;
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    response                                        = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals)   : displayMeals([]);
    $("#loading").fadeOut(500);
}

// list the available areas from the API and prepare them for the UI
async function getArea() {
    mealsRow.innerHTML                              = "";
    $("#loading").fadeIn(500);
    let respone                                     = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    respone                                         = await respone.json();
    displayArea(respone.meals);
    $("#loading").fadeOut(500);
}

//  show the available areas fetched from the API on the UI 
function displayArea(arr) {
    let cartona                                     = "";
    for (let i = 0; i < arr.length; i++) {
        cartona                                     += `
        <div class                                  = "col-md-3">
                <div onclick                        = "getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center ">
                        <i class                    = "fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    };
    mealsRow.innerHTML                              = cartona;
}
//  get the clicked category meals from API and send them to the UI 
async function getAreaMeals(term){
    mealsRow.innerHTML                              = ``;
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    response                                        = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals)   : displayMeals([]);
    $("#loading").fadeOut(500);
}

// list the available ingredients from the API and prepare them for the UI
async function getIngredients() {
    mealsRow.innerHTML                              = "";
    $("#loading").fadeIn(500);
    let respone                                     = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    respone                                         = await respone.json();
    console.log(respone.meals);
    displayIngredients(respone.meals);
    $("#loading").fadeOut(500);
}
//  show the available ingredients fetched from the API on the UI 
function displayIngredients(arr) {
    let cartona                                     = "";
    for (let i = 0; i < arr.length; i++) {
        cartona                                     += `
        <div class                                  = "col-md-3 ">
        <figure onclick                             = "getIngredientMeals('${arr[i].strIngredient}')" class="position-relative overflow-hidden rounded-2 ">
            <img src                                = "https://www.themealdb.com/images/ingredients/${arr[i].strIngredient}.png" class="w-100 " alt="...">
            <figcaption id                          = "figCap" class=" position-absolute d-flex align-items-center flex-column  text-black p-2">
            <h3 onclick                             = "getIngredientMeals('${arr[i].strIngredient}')" class="fw-bold ">${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription!=null?arr[i].strDescription:""}</p>           
            </figcaption>
        </figure>
    </div>
        `
    };
    mealsRow.innerHTML                              = cartona;
}
// Filter by main ingredient
async function getIngredientMeals(term){
    mealsRow.innerHTML                              = ``;
    $("#loading").fadeIn(500);
    let response                                    = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    response                                        = await response.json();
    $("#home").show();
    response.meals ? displayMeals(response.meals)   : displayMeals([]);
    $("#loading").fadeOut(500);
}
// Lookup full meal details by id
async function getMealFullDetails(id){
    mealsRow.innerHTML                              = "";
    $("#loading").fadeIn(500);
    let respone                                     = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    respone                                         = await respone.json();
    displayMealDetails(respone.meals[0]);
    $("#loading").fadeOut(500);
}
// UI meals display function
function displayMealDetails(arr) {
    $("#search").hide();
    let recipe                                      = "";
    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]!=null && arr[`strIngredient${i}`]!="") {
            recipe                                  += `
            <li class                               = "alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>
            `
        };
    };
    let tags                                        = arr.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr                                     = '';
    for (let tag in tags) {
        tagsStr                                     += `
        <li class                                   = "alert alert-danger m-2 p-1">${tags[tag]}</li>`
    };
    mealsRow.innerHTML                              = `
        <div class                                  = "col-md-4">
        <figure class                               = " position-relative overflow-hidden rounded-2 ">
            <img src                                = "${arr.strMealThumb}" class=" w-100" alt="...">
            <figcaption  class                      = "  d-flex align-items-center p-2"><h3>${arr.strMeal}</h3></figcaption>
        </figure>
    </div>
    <div class                                      = "col-md-8">
        <h2>Instructions</h2>
        <p>${arr.strInstructions}</p>
        <h2><span class                             = "fw-bold">Area</span>:${arr.strArea}</h2>
        <h2><span class                             = "fw-bold">Category</span>:${arr.strCategory}</h2>
        <h2>Recipe                                  : </h2>
        <ul class                                   = "list-unstyled d-flex g-3 flex-wrap">
        ${recipe}
        </ul>
        <h2>Tags                                    : </h2>
        <ul class                                   = "list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
        </ul>
        <a target                                   = "_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
        <a target                                   = "_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
</div>
        `
}

function showHiddenItem(item){
    item.classList.replace("d-none","d-block");
}

function hideItem(item){
    item.classList.replace("d-block","d-none");
}

function validateName(){
       var regex                                    = /^[a-zA-Z 0-9]{3,}$/gm;
    if (regex.test(userName.value)==true) {
        hideItem(invalidUserName);
        count++;
        return true;
    } else {
        showHiddenItem(invalidUserName);
        count--;
        return false;
    };
    
}

function validateEmail(){
    var regex                                       = /^.{4,20}@\w{5,}\.com$/gm;
    if (regex.test(email.value)==true) {
        hideItem(invalidEmail);
        count++;
        return true;
    } else {
        showHiddenItem(invalidEmail);
        count--;
        return false;
    };
}

function validatePhone(){
    var regex                                       = /^01[0125]{1}[0-9]{8}$/gm;
    if (regex.test(phone.value)==true) {
        hideItem(invalidPhone);
        count++;
        return true;
    } else {
        showHiddenItem(invalidPhone);
        count--;
        return false;
    };
}

function validateAge(){
    var regex                                       = /^[1-9]{0,1}[0-9]{1}$|100$/gm;
    if (regex.test(age.value)==true) {
        hideItem(invalidAge);
        count++;
        return true;
    } else {
        showHiddenItem(invalidAge);
        count--;
        return false;
    };
}

function validatePassword(){
    var regex                                       = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    if (regex.test(password.value)==true) {
        hideItem(invalidPassword);
        count++;
        return true;
    } else {
        showHiddenItem(invalidPassword);
        count--;
        return false;
    };
}

function validateRepassword(){
    var regex                                       = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    if (regex.test(repassword.value)==true && repassword.value == password.value) {
        hideItem(invalidPassword);
        count++;
        validateInputs();
        return true;
        
    } else {
        showHiddenItem(invalidPassword);
        return false;
    };
}
function  validateInputs(){
    if (count>5) {
        document.querySelector("#submitBtn").removeAttribute("disabled")
    };
}
