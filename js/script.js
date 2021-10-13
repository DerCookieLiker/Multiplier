"use strict";
class ViewModel {
    
    historyArray;
    constructor() {
        this.historyArray = [];
    }

        render = function () {
            document.getElementById("history").innerHTML = "";

            for (let history of this.historyArray) {
                this.addHistory(history);
            }
        };
        bind = function (btnSelector) {
            document.querySelector(btnSelector).onclick = () => {
                this.add();
                this.render();
            };
        };
        bindReset = function (btnSelector) {
            document.querySelector(btnSelector).onclick = () => {
                this.reset();
                this.render();
            };
        };
        add = function () {
            let factor = Number(document.getElementById("factorNumber").value);
            this.addHistoryItem(factor);
            this.simulateRequest(factor, (factor) => { document.getElementById("product").innerHTML = (Number(document.getElementById("product").innerHTML) * factor); });
        };
        reset = function () {
            document.getElementById("product").innerHTML = 1;
            this.historyArray = [];
        };
        addHistoryItem = function (value) {
            if (!this.historyArray.includes(value))
                this.historyArray.push(value);
        };
        addHistory = function (value) {
            let li = document.createElement("li");
            li.innerHTML = value;
            li.classList.add("historyItem");
            document.getElementById("history").prepend(li);
        };
        simulateRequest = function (factor, callback) {
            setTimeout(() => {
                callback(factor);
            }, 5000);
        };
}

let viewModel = new ViewModel();

viewModel.bind("#multiply");
viewModel.bindReset("#reset");

viewModel.render();