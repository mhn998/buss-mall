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
let prodResult; 
let list;


function ProductImage (name,source) {
    this.name = name;
    this.source = source;
    this.votes=0
    this.views = 0
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


function generateRandomIndex() {
    return Math.floor(Math.random() * ProductImage.allImages.length);
}

function renderThreeImages() {

    leftImageindex =generateRandomIndex();

    do {
        rightImageindex = generateRandomIndex();
    } while 
        (leftImageindex === rightImageindex)

    do {
        middleImageindex = generateRandomIndex();
    } while (rightImageindex === middleImageindex || middleImageindex ===leftImageindex)    

    leftimage.src= ProductImage.allImages[leftImageindex].source;
    ProductImage.allImages[leftImageindex].views++
    middleimage.src = ProductImage.allImages[middleImageindex].source;
    ProductImage.allImages[middleImageindex].views++
    rightimage.src = ProductImage.allImages[rightImageindex].source;    
    ProductImage.allImages[rightImageindex].views++
}

renderThreeImages();

//handle clicking 

// leftimage.addEventListener('click',handleUSerClick);
// middleimage.addEventListener('click',handleUSerClick);
// rightimage.addEventListener('click',handleUSerClick);
imagecontainer.addEventListener('click',handleUSerClick);

function handleUSerClick (event) {
    userAttemptsCounter++; 
    if (userAttemptsCounter<maxAttempts) {
        // make sure to add to votes for the correct element and render again
        if(event.target.id === 'left-image') {
            ProductImage.allImages[leftImageindex].votes++
        } else if (event.target.id = 'middle-image') {
            ProductImage.allImages[middleImageindex].votes++
        } else {
            ProductImage.allImages[rightImageindex].votes++
        }

        renderThreeImages();


    } else {
        // render the list of resutls
        list=document.getElementById("list-result");
        let btn = document.createElement('button')
        list.appendChild(btn);
        btn.textContent = "View Results";
        btn.addEventListener('click',trigger)
        // rightimage.removeEventListener('click',handleUSerClick);
        // leftimage.removeEventListener('click',handleUSerClick);
        // middleimage.removeEventListener('click',handleUSerClick)
        imagecontainer.removeEventListener('click',handleUSerClick);

    }
}


function trigger() {
    for (let i = 0;i<ProductImage.allImages.length;i++) {
        prodResult = document.createElement('li')
        list.appendChild(prodResult);
        prodResult.textContent = ProductImage.allImages[i].name + ' had ' + ProductImage.allImages[i].votes + ' votes, and was seen ' + ProductImage.allImages[i].views + ' times ' ;
        }
    }
