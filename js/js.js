var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready(function () {
    $('#choose_recipe').on('change', function () {
        var recipe = $('#choose_recipe').val();
        chooseRecipe(recipe);
    });
});

// get api using arrow function

var getAPI = (api) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => getRecipe(data),
        error: () => console.log("Can not get data!!!"),
    });
}

//function to select recipe
var allChoose = [];
function selectRecipe(recipe) {
    allChoose = recipe;
    var choose = "";
    recipe.forEach(element => {
        choose += `
        <option value="${element.id}">${element.name}</option>
        <option value="${element.id}">${element.name}</option>
    `;
        $('#choose_recipe').append(choose);
    });
}

//get all recipe use name function
function getRecipe(data_recipe) {
    var display = "";
    data_recipe.recipes.forEach(item_recipe => {
        if (item_recipe.id == $('#choose_recipe').val()) {
            display += `       
            <div class="row">
                    <div class="col-3"></div>
                    <div class="col-3 mt-5"><h4>${item_recipe.name}</h4></div>
                    <div class="col-3">   
                    <img src = "${item_recipe.iconUrl}" class="img-fluid mb-3" "width:30px"></div>
                    <div class="col-3"></div>
                </div>
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-3"></div>
                    <div class="col-3">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-info" id="min" type="button">-</button>
                            </div>
                            <input type="text" class="form-control text-center" id="member" disabled value="0">
                            <div class="input-group-append">
                                <button class="btn btn-success" id="max" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>               
            `;
            getIngrediant(item_recipe);
        }

    });
    $('#display').html(display);

}

// get all infrediant using name function

function getIngrediant(recipe) {
    recipe.ingredients.forEach(item_ing => {

        showIngrediantTable(item_ing);
    });
}

//display ingrediant inn table use arrow function

var showIngrediantTable = (show) => {
    var ingrediant = "";
    ingrediant += `
    <div class="row">
        <div class="col-4">
            <h5 class="text-center">Ingredients</h5>                  
            <table class="table">
                <tr>
                    <td><img src= "${show.iconUrl}" width="25"></td>
                    <td>${show.quantity}</td>
                    <td>${show.unit[0]}</td>
                    <td>${show.name}</td>
                </tr>
            </table>
        </div>
        <div class="col-4"></div>
        <div class="col-4">        
                <h5 class="text-center">Instroduction</h5>                      
        </div>
    </div>                               
        `;
    $('#ingredients').html(ingrediant);
}

//choose recipe from select arrow function

var chooseRecipe = (myRecipe) => {
    var onlyNumber = parseInt(myRecipe);
    switch (onlyNumber) {
        case 0:
            getAPI(url);
            hideAlert();
            break;
        case 1:
            getAPI(url);
            hideAlert();
            break;
    }
}
var hideAlert = () => {
    $('.alert').hide();
}