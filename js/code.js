function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestApi();
    $("#choose_recipe").on('change', function () {
        var id_recipe = $("#choose_recipe").val();
        getRecipe(id_recipe);
        $("#int, #inst").show();
    })
})
function requestApi() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Error"),
    })
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $("#choose_recipe").append(option);
}
var allQuantity = []; 
var oldGuest;
function getRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            eachRecipe(item.name, item.iconUrl);
            eachIngredient(item.ingredients);
            eachMember(item.nbGuests)
            eachStep(item.instructions);
            allQuantity = item;
            oldGuest = item.nbGuests;
        }
    });
}
function eachRecipe(name, img) {
    var display = "";
    display += `
        <div class="col-3"></div>
        <div class="col-3"><h2>${name}</h2></div>
        <div class="col-3"><img src="${img}" width="200px"></div>
        <div class="col-3"></div>
    `;
    $("#display").html(display);
}

function eachIngredient(ingredients) {
    display = "";
    ingredients.forEach(element => {
        const { iconUrl, quantity, unit, name } = element;
        display += `
                <tr>
                    <td><img src="${iconUrl}" width="25"></td>
                    <td>${quantity}</td>
                    <td>${unit[0]}</td>
                    <td>${name}</td>
                </tr>                  
    `;
    });
    $("#ingredient").html(display);
}
function eachMember(member) {
    var result = "";
    result += `
    
    <div class="col-3"></div>
    <div class="col-3">Number of person</div>
    <div class="col-3">
        <form action="#">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-light" id="minus" type="button">-</button>
                </div>
                <input type="text" id="members" width="10px" value="${member}" min="1" max="15" disabled
                    class="form-control text-center">
                <div class="input-group-append">
                    <button class="btn btn-light" id="plus" type="button">+</button>
                </div>
            </div>
        </form>
    </div>
    <div class="col-3"></div>
    `;
    $("#member").html(result);
    
    $("#minus").on('click', function () {
        var person = parseInt($("#members").val());
        minus(person);

    })
    
    $("#plus").on("click", function () {
        var person = parseInt($("#members").val());
        add(person);
    });
}
function eachStep(instruction) {
    var display = "";
    var step = instruction.split('<step>');
    for (var i = 1; i < step.length; i++) {
        display += `
        <h6 style="color:blue">Step ${i}</h6>
        <p>${step[i]}</p>
        `;
    }
    $('#step').html(display);
}



function add(member) {
    var add = parseInt(member) + 1;
    if(add <= 15) {
        $("#members").val(add);
        newIngrendient($("#members").val());
    }
}

function minus(member) {
    var minus = parseInt(member) - 1;
    if(minus >= 1) {
        $("#members").val(minus);
        newIngrendient($("#members").val());
    }
}

function newIngrendient(member) {
    var newQuanlity;
    var result = "";
    allQuantity.ingredients.forEach(element => {
        var {quantity, iconUrl, unit, name } = element;
        newQuanlity = quantity / oldGuest * member;
        result += `
                <tr>
                    <td><img src="${iconUrl}" width="25"></td>
                    <td>${newQuanlity}</td>
                    <td>${unit[0]}</td>
                    <td>${name}</td>
                </tr>  
    `;
    });
     $("#ingredient").html(result);
}
