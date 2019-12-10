function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestApi();
    $("#choose_recipe").on('change', function () {
        var id_recipe = $("#choose_recipe").val();
        getRecipe(id_recipe);
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
function getRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            eachRecipe(item.name, item.iconUrl);
            eachIngredient(item.ingredients);

        }
    });

}
function eachRecipe(name, img) {
    var result = "";
    result += `
        <div class="col-3"></div>
        <div class="col-3"><h2>${name}</h2></div>
        <div class="col-3"><img src="${img}" width="200px"></div>
        <div class="col-3"></div>
    `;
    $("#display").html(result);
}
function eachIngredient(ingredients) {
    result = "";
    ingredients.forEach(element => {
        const {iconUrl,quantity,unit,name} = element;
        result += `
                <tr>
                    <td><img src="${iconUrl}" width="25"></td>
                    <td>${quantity}</td>
                    <td>${unit[0]}</td>
                    <td>${name}</td>
                </tr>                  
    `;
    });
    $("#ingredient").html(result);
}