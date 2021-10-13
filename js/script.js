"use strict";
function ViewModel(){

    this.historyArray = [];

    this.render = function() {
        document.getElementById("history").innerHTML = "";

        for(let history of this.historyArray){
            this.addHistory(history);
        }
    };
    this.bind = function (btnSelector) {
        document.querySelector(btnSelector).onclick = () => {
            this.add();
            this.render();
        }
    };
    this.bindReset = function (btnSelector) {
        document.querySelector(btnSelector).onclick = () => {
            this.reset();
            this.render();
        }
    };
    this.add = function () {
        let factor = Number(document.getElementById("factorNumber").value);
        this.addHistoryItem(factor);
        this.simulateRequest(factor, (factor) => {document.getElementById("product").innerHTML = (Number(document.getElementById("product").innerHTML) * factor);})
    };
    this.reset = function () {
        document.getElementById("product").innerHTML = 1;
        this.historyArray = [];
    };
    this.addHistoryItem = function (value) {
        if(!this.historyArray.find(x => x == value)) this.historyArray.push(value);
    };
    this.addHistory = function (value) {
        let li = document.createElement("li");
        li.innerHTML = value;
        li.classList.add("historyItem");
        document.getElementById("history").prepend(li);
    };
    this.simulateRequest = function (factor, callback) {
        setTimeout(() => {
            callback(factor);
        }, 5000)
    }
}

let viewModel = new ViewModel();

viewModel.bind("#multiply");
viewModel.bindReset("#reset");

viewModel.render();