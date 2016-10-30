var animalArray = [];
/*--------Functions---------*/

//function makes buttons
function renderButtons(){
	$("#animalButtons").empty();
	for(var i=0; i<animalArray.length; i++){
		var b = $("<button class='btn btn-primary input-sm'>"); //creating button div
		b.addClass("animal"); //assign class 'animal' to button
		b.attr("data-name", animalArray[i]); //assign attr data-name with animal names from array
		b.text(animalArray[i]);//display animal name in each button
		$("#animalButtons").append(b);//display each button to the id div called animalButtons
	}
}
//function displays gifs
function displayAnimalGifs(){
	var animalName = $(this).data("name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&limit=10&api_key=dc6zaTOxFJmzC";
	
	$.ajax({url: queryURL, method: "GET"}).done(function(response){		
		var results = response.data;
		$("#animals").empty();

		for(var a=0; a< results.length; a++){
			//Rating
			var p = $("<p>").text("Rating: "+ results[a].rating);
			//Gif Images
			var img = $("<img>");
			img.attr("src", results[a].images.fixed_height_still.url);
			img.attr("alt", "animal gif");
			img.attr("data-still", results[a].images.fixed_height_still.url);
			img.attr("data-animate", results[a].images.fixed_height.url);
			img.attr("data-state", "still");
			img.addClass("gif");
			//Display to new div, prepend to #animals in html
			var animalInfo = $("<div class='pull-left'>");
			animalInfo.append(p);
			animalInfo.append(img);
			$("#animals").prepend(animalInfo);
		}
	});
}

//function pauses
function pause(){
	var state = $(this).attr("data-state");
	if(state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state","animate");
	}else if(state === "animate"){
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

/*-----------Script----------*/
$("#addAnimal").on("click", function(){
	var animal = $("#animal-input").val().trim();	
	if(animal !== ""){
		animalArray.push(animal);
		renderButtons();
	}
	$("#animal-input").val(""); //clears textbox after clicking submit
	return false;
});
$(document).on("click", ".animal", displayAnimalGifs);
$(document).on("click", ".gif", pause);
