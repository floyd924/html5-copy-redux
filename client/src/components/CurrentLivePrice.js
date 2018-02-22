import React, {Component} from 'react';

class CurrentLivePrice extends Component {
    // requestCurrentLivePrice() {
    //     const xhttp = new XMLHttpRequest();
    //     xhttp.open("POST", "https://api.coindesk.com/v1/bpi/currentprice.json", true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.send();
    //     const response = JSON.parse(xhttp.responseText);
    // }

    render() {
        return (
            <div className="currentLivePrice">
                <span>test </span>
            </div>
        )
    }
}

export default CurrentLivePrice;