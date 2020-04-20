$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();

    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rest-button').click(clickedRestButton);

})

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { 
    name: "My Pet Name", 
    weight: "40", 
    happiness: "1",
    energy: "100" 
};

function clickedTreatButton() {
    // Increase pet happiness
    pet_info.happiness = Number(pet_info.happiness) + 5;
    // Increase pet weight
    pet_info.weight = Number(pet_info.weight) + 10;
    // Decrease pet energy
    pet_info.energy= Number(pet_info.energy) -5;
    checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
    // Increase pet happiness
    pet_info.happiness = Number(pet_info.happiness) + 10;
    // Decrease pet weight
    pet_info.weight = Number(pet_info.weight) - 5;
    // Decrease pet energy
    pet_info.energy= Number(pet_info.energy) - 10;
    checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
    // Decrease pet happiness
    pet_info.happiness = Number(pet_info.happiness) - 10;
    // Decrease pet weight
    pet_info.weight = Number(pet_info.weight) - 10;
    // Decrease pet energy
    pet_info.energy= Number(pet_info.energy) -10;    
    checkAndUpdatePetInfoInHtml();
}

function clickedRestButton() {
    // Increase pet happiness
    pet_info.happiness = Number(pet_info.happiness) + 0;
    // Increase pet weight
    pet_info.weight = Number(pet_info.weight) + 5;
    // Increase pet energy
    pet_info.energy= Number(pet_info.energy) + 25;    
    checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
}

function functionAlert(msg) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
       confirmBox.hide();
    });
    // confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}

function checkWeightAndHappinessBeforeUpdating() {
    // Add conditional so if weight is lower than zero, set it back to zero
    if (pet_info.weight < 1) {
        pet_info.weight = 1;
        functionAlert("Bulbasaur needs to eat!");
    } else if (pet_info.weight > 100){
        functionAlert("Looks like Bulbasaur might need some exercise.");
    }

    if (pet_info.energy > 100){
        pet_info.energy = 100;
        functionAlert("Bulbasaur is raring to go!");
    } else if (pet_info.energy <= 0){
        pet_info.energy = 1;
        functionAlert("Bulbasaur needs some rest.");
    }

    if (pet_info.happiness > 100){
        functionAlert("Bulbasaur really seems to like you!");
    } else if (pet_info.happiness <= 1){
        pet_info.happiness = 1;
        functionAlert("Bulbasaur seems sad, you should really play with it!");
    }
}

// Updates your HTML with the current values in your pet_info dictionary
function updatePetInfoInHtml() {
    $('.name').text(pet_info['name']);
    $('.weight').text(pet_info['weight']);
    $('.happiness').text(pet_info['happiness']);
    $('.energy').text(pet_info['energy']);
}
