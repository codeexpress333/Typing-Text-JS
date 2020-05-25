//Now We Set The Values With Funtions
var TxtDisplay = function (e, toRotate, period) {
    this.toRotate = toRotate;
    this.e = e;
    this.loopNum = 0; //How Many Times Text Rotate
    this.period = parseInt(period, 10) || 2000; //set before period
    this.txt = '';
    this.tick(); //after that we create funtion
    this.isDeleting = false; //Text Delete
}


//Create Funtion to Text typing
TxtDisplay.prototype.tick = function () {
    // console.log('test');

    //Text Length
    var i = this.loopNum % this.toRotate.length;

    //Full Text 
    var fullTxt = this.toRotate[i];
    // console.log(fullTxt);

    //Text Delete and Update
    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1); //substring is a method
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Display Text
    this.e.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    //When Text Delete and Update
    var that = this;
    var del = 300 - Math.random() * 100; // for delete

    if(this.isDeleting) {
        del /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
        del = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        del = 500;
    }

    //Time Set To Get Text Delete and Update
    setTimeout(function() {
        that.tick();
    }, del);

}



//First Of All Content Show When Window Load
window.onload = function () {
    // console.log('test');

    var element = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < element.length; i++) {
        var toRotate = element[i].getAttribute('data-text');
        // console.log(toRotate);
        var period = element[i].getAttribute('data-period');
        // console.log(period);
        if (toRotate) {
            new TxtDisplay(element[i], JSON.parse(toRotate), period);
        }
    }

    //Now Set Tick To Delete Text and Update
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08rem solid #666 }";
    document.body.appendChild(css);

};

