/**
 * Created by Alex on 28.10.2016.
 */


$(document).ready(function(){//This is to prevent any jQuery code from running before the document is finished loading (is ready).

	var catCounters=[0,0,0,0,0];
	var catImageSourse=['cat1.jpg','cat2.jpg','cat2.jpg','cat4.jpg','cat5.jpg'];
	var catNames=['Milky','Silky','Dilky','Pilky','Kilky'];


	//Programmatticly add new cat <li> elements
	for(var i=0;i<catNames.length;i++){
		$('#catsList').append("<li id='cat"+(i+1)+"'>"+catNames[i]+"</li>");

	};

	//changes the view according to a  user's choice from the list
	$('li').on('click',function (event) {
		console.log(event.target.textContent);
		switch (event.target.textContent){
			case catNames[0]:
				updateDisplayArea(0);
				break;
			case catNames[1]:
				updateDisplayArea(1);
				break;
			case catNames[2]:
				updateDisplayArea(2);
				break;
			case catNames[3]:
				updateDisplayArea(3);
				break;
			case catNames[4]:
				updateDisplayArea(4);
				break;
		};

	});

	//changes the counter of clicks when image is clicked
	$('img').on('click',function (event) {
		var catSourse=event.target.attributes.getNamedItem("src").textContent;
		console.log(catSourse);
		switch (catSourse){
			case catImageSourse[0]:
				catCounters[0]++;
				console.log(catNames[0]);
				updateDisplayArea(0);
				break;
			case catImageSourse[1]:
				catCounters[1]++;
				updateDisplayArea(1);
				break;
			case catImageSourse[2]:
				catCounters[2]++;
				updateDisplayArea(2);
				break;
			case catImageSourse[3]:
				catCounters[3]++;
				updateDisplayArea(3);
				break;
			case catImageSourse[4]:
				catCounters[4]++;
				updateDisplayArea(4);
				break;
		};

	});


	function updateDisplayArea(id){
		$('#imgCat').attr("src",catImageSourse[id]);
		$('#name').text(catNames[id]);
		$('#counter').text("Count:"+catCounters[id]);
	};
});


var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }