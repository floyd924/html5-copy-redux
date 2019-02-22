import React, {Component} from 'react';

class MyOrders extends Component{
    render(){
        return(
            <div className="my-orders-container">
                <h1>all my orders go here</h1>
                <div class="table-wrapper-scroll-y">
                    <table class="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pending</td>
                                <td>Iain</td>
                                <td>BUY</td>
                                <td>50</td>
                                <td>1.25</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>Iain</td>
                                <td>BUY</td>
                                <td>50</td>
                                <td>1.5</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>Iain</td>
                                <td>BUY</td>
                                <td>1</td>
                                <td>1.2</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>Iain</td>
                                <td>SELL</td>
                                <td>500</td>
                                <td>1.9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default MyOrders;