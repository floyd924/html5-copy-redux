import { listeners } from "cluster";

const counter = function(state = 0, action) {
    //thsi just increases a counter when asked to do so
    switch(action.type) {
        case "incrememnt":
            return state + 1;
        case "decrement":
            return state -1;
        default:
            return state;
    }
}

//this is the most important bit
//Store holds a current state
//we are creting a store to store the current state
const {createStore} = Redux;

const store = createStore(counter);

const render = () => {
    document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener("click", () => {
    store.dispatch({type: "increment"});
})

