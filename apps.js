'use strict'

let imagecontainer = document.getElementById('images')
let leftimage = document.getElementById('left-image');
let middleimage= document.getElementById('middle-image')
let rightimage = document.getElementById('right-image');
let maxAttempts = 25;
let userAttemptsCounter= 0;
let leftImageindex;
let middleImageindex;
let rightImageindex;


// constructor function
function ProductImage (name,source) {
    this.name = name;
    this.source = source;
    this.votes=0;
    this.views = 0;
    ProductImage.allImages.push(this);
}

ProductImage.allImages=[];


new ProductImage("bag", "images/bag.jpg"); 
new ProductImage("banana", "images/banana.jpg"); 
new ProductImage("bathroom", "images/bathroom.jpg"); 
new ProductImage("boots", "images/boots.jpg"); 
new ProductImage("breakfast", "images/breakfast.jpg"); 
new ProductImage("bubble gum", "images/bubblegum.jpg"); 
new ProductImage("cthulhu", "images/cthulhu.jpg"); 
new ProductImage("dog duck", "images/dog-duck.jpg"); 
new ProductImage("dragon", "images/dragon.jpg"); 
new ProductImage("pen", "images/pen.jpg"); 
new ProductImage("pet sweep", "images/pet-sweep.jpg"); 
new ProductImage("scissors", "images/scissors.jpg"); 
new ProductImage("tauntaun", "images/tauntaun.jpg"); 
new ProductImage("unicron", "images/unicorn.jpg"); 
new ProductImage("usb", "images/usb.gif"); 
new ProductImage("water can", "images/water-can.jpg"); 
new ProductImage("chair", "images/chair.jpg"); 
new ProductImage("wine glass", "images/wine-glass.jpg"); 


// console.log(ProductImage.allImages);

// get random 
function generateRandomIndex() {
    return Math.floor(Math.random() * ProductImage.allImages.length);
}


let Previousleft = Math.floor(Math.random() * ProductImage.allImages.length);
let Previousmiddle= Math.floor(Math.random() * ProductImage.allImages.length);
let Previousright= Math.floor(Math.random() * ProductImage.allImages.length);

// render three images
function renderThreeImages() {

    do{
        leftImageindex =generateRandomIndex();
    } while (leftImageindex===Previousleft || leftImageindex===Previousmiddle || leftImageindex===Previousright)
   
    do {
        rightImageindex = generateRandomIndex();
    } while 
        (leftImageindex === rightImageindex || rightImageindex === Previousleft || rightImageindex === Previousmiddle || rightImageindex === Previousright)

    do {
        middleImageindex = generateRandomIndex();
    } while (rightImageindex === middleImageindex || middleImageindex ===leftImageindex ||middleImageindex === Previousleft || middleImageindex ===Previousmiddle || middleImageindex === Previousright)    

        // console.log(leftImageindex,middleImageindex,rightImageindex)
        // console.log(Previousleft, Previousmiddle,Previousright)

        leftimage.src= ProductImage.allImages[leftImageindex].source;
        ProductImage.allImages[leftImageindex].views++
        middleimage.src = ProductImage.allImages[middleImageindex].source;
        ProductImage.allImages[middleImageindex].views++
        rightimage.src = ProductImage.allImages[rightImageindex].source;    
        ProductImage.allImages[rightImageindex].views++
      
}

renderThreeImages();


//handle clicking 
imagecontainer.addEventListener('click',handleUSerClick);

function handleUSerClick (event) {
    userAttemptsCounter++; 
    if (userAttemptsCounter<maxAttempts) {
        Previousleft = leftImageindex;
        Previousmiddle = middleImageindex;
        Previousright = rightImageindex;
        // make sure to add to votes for the correct element and render again
        if(event.target.id === 'left-image') {
            ProductImage.allImages[leftImageindex].votes++
        } else if (event.target.id = 'middle-image') {
            ProductImage.allImages[middleImageindex].votes++
        } else {
            ProductImage.allImages[rightImageindex].votes++
        }

        renderThreeImages();
        // console.log(Previousleft, Previousmiddle,Previousright)


    } else {
        // render the chart
        trigger();
        imagecontainer.removeEventListener('click',handleUSerClick);

    }
}


let ArrNames = [];
let ArrVotes =[];
let ArrViews =[];
// This function will be triggered when it reaches 25 times
function trigger() {
    for (let i = 0;i<ProductImage.allImages.length;i++) {
        ArrNames.push(ProductImage.allImages[i].name)
        ArrVotes.push(ProductImage.allImages[i].votes)
        ArrViews.push(ProductImage.allImages[i].views)
        }
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: ArrNames,
            datasets: [{
                label: 'Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: ArrVotes
            },
            {
                label: "Views",
                backgroundColor: 'rgba(99, 255, 132, 0.2)',
                borderColor: 'rgba(99, 255, 132, 1)',
                borderWidth: 1,
                data: ArrViews,
            }
           
        ]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                   ticks: {
                    min:0,
                    max:10,
                    stepSize: 1,
                   }
                }]
             }
        }
    });    
        
    }

  
    