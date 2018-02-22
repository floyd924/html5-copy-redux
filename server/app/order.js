function Order(accountId, price, quantity, action) {
    this.accountId = accountId;
    this.price = price;
    this.quantity = quantity;
    this.action = action;
    
    this.createId = function() {
        var d = new Date();
        return d.getTime() + "0" + accountId;
    }
    this.id = this.createId();

    this.replicate = function(order) {
        var result = new Order(order.accountId, order.price, order.quantity, order.action);
        result.id = order.id;
        result.priority = order.priority;
        return result;
    }

    this.setWithSize = function(order, newQuantity) {
        var result = this.replicate(order);
        result.quantity = newQuantity;
        return result;
    }
}

module.exports = Order;