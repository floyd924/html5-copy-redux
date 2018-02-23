import { __esModule } from 'react-bootstrap';

export const api = {
    fetchBitCoinApi() {
        console.log("fetch api called")
        return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .catch(error => error)
            .then(data => {
                return data
        })
    },
}


// ...
// wait(10).then(() => imRunningEverySecond()) // prints hello