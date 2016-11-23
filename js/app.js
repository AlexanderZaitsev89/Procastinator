$(function() {
//------------------------------------------------------Model----------------------------------------------------------
    var data = {
        currentCat:null,
        cats:[
            {
                catName:'Milky',
                catCounter:0,
                catImageSource:'img/cat1.jpg'
            },
            {
                catName:'Silky',
                catCounter:0,
                catImageSource:'img/cat2.jpg'
            },
            {
                catName:'Tilky',
                catCounter:0,
                catImageSource:'img/cat3.jpg'
            },
            {
                catName:'Vilky',
                catCounter:0,
                catImageSource:'img/cat4.jpg'
            },
            {
                catName:'Bilky',
                catCounter:0,
                catImageSource:'img/cat5.jpg'
            }
        ]

    };

//------------------------------------------------------View------------------------------------------------------------
    var catList = {
        init: function() {

        for (var i=0;i<controler.getAllCats().length;i++){
        $('.catsList').append("<li id='"+(i+1)+"'>"+controler.getAllCats()[i].catName+"</li>");
    };

        $('li').on('click',function (event) {
        var chosenCatNumber=event.target.attributes.getNamedItem("id").textContent-1;
        controler.setCurrentCat(chosenCatNumber);
        //console.log(chosenCatNumber);
    });
        this.render();

        },

        render: function() {



        }
    };

    var displayArea = {
        init: function() {
            // store pointers to our DOM elements for easy access later
            this.$catName=$('#nameCat');
            this.$catCount=$('#countCat');
            this.$catImg=$('#imgCat').on("click",function () {
                controler.incrementCounter();
            });
            this.render();
        },
        render: function() {
            var currentCat=controler.getCurrentCat();
            this.$catName.text(controler.getCurrentCat().catName);
            this.$catCount.text(controler.getCurrentCat().catCounter);
            this.$catImg.attr("src",controler.getCurrentCat().catImageSource);

        }
    };

//------------------------------------------------------Controller----------------------------------------------------------
    var controler = {
        init: function() {
            data.currentCat=data.cats[0];
            catList.init();
            displayArea.init();
            //console.log("Test controller: currentCat ="+data.currentCat);
        },
        getCurrentCat:function () {
            return data.currentCat;
        },
        getAllCats:function () {
            return data.cats;
        },
        setCurrentCat:function (n) {
             data.currentCat=data.cats[n];
            displayArea.render();
        },
        incrementCounter: function() {
            data.currentCat.catCounter++;
            displayArea.render();

        }

    };


    controler.init();
}());
/*
first version of catListView
 init: function() {
     for (var i=0;i<controler.getAllCats().length;i++){
     $('.catsList').append("<li id='"+(i+1)+"'>"+controler.getAllCats()[i].catName+"</li>");
     };

     $('li').on('click',function (event) {
     var chosenCatNumber=event.target.attributes.getNamedItem("id").textContent-1;
     controler.setCurrentCat(chosenCatNumber);
     //console.log(chosenCatNumber);
     });
     this.render();
 }
 */