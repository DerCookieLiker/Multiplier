"use strict";
function ViewModel(){

    this.bind = function (btnSelector) {
        document.querySelector(btnSelector).onclick = () => {
            this.add();
        }
    };
    this.bindReset = function (btnSelector) {
        document.querySelector(btnSelector).onclick = () => {
            this.reset();
        }
    };
    this.add = function () {
        let factor = Number(document.getElementById("factorNumber").value);
        document.getElementById("product").innerHTML = (Number(document.getElementById("product").innerHTML) * factor);
    };
    this.reset = function () {
        document.getElementById("product").innerHTML = 1;
    }
}

let viewModel = new ViewModel();

viewModel.bind("#multiply");
viewModel.bindReset("#reset");