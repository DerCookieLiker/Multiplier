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
            
            this.sendRequest(
                "GET", 
                "http://localhost:8080",
                {
                    operand1: factor,
                    operator: encodeURIComponent('*'),
                    operand2: document.getElementById("product").innerHTML
                },
                {},
                (factor) => { document.getElementById("product").innerHTML = (Number(document.getElementById("product").innerHTML) * factor); }
            );
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
        sendRequest =  function (method, urlP, searchParams, body, callback) {
            
            let lookUpTable = ["GET", "PUT", "POST", "DELETE"];

            if(!lookUpTable.includes(method)){
                alert("The method: " + method + " is not valid!");
                return;
            }
            
            let request = new XMLHttpRequest();
            request.responseType = "json";
    
            let url = new URL(urlP);

            for (let key in searchParams) {
                url.searchParams.set(key, searchParams[key]);
            }

            request.open(method, url);

            if(method === "POST" || method === "PUT"){
                request.setRequestHeader("Content-Type", "application/json");
            }

            request.onload = function () {
                if(request.status === 200){
                    callback(request.response); 
                }else{
                    alert(`Error ${request.status}: ${request.statusText}`);
                }
            }
            if(body != String)
                body = JSON.stringify(body);

            if(method === "GET" || method === "DELETE"){
                request.send();
            }else{
                request.send(body);
            }
        }
}

let viewModel = new ViewModel();

viewModel.bind("#multiply");
viewModel.bindReset("#reset");

viewModel.render();