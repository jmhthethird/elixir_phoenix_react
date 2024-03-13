import React, { useReducer } from "react";
import { useEffect, useState } from 'react';
import socket from './user_socket'

var channelName = "counter"
var channel = socket.channel(channelName, {})

function countReducer(state, action) {
    switch (action.type) {
        case 'add':
            channel.push("count", state + action.payload)
            return state + action.payload;
        case 'current':
            return state;
        case 'set':
            return action.payload
        default:
            throw new Error();
    }
}

const Counter = () => {
    var [count, setCount] = useState(0)
    var [serverCount, dispatch] = useReducer(countReducer, 0)

    useEffect(() => {
        channel.join()
            .receive("ok", resp => { console.log("Joined successfully", resp) })
            .receive("error", resp => { console.log("Unable to join", resp) })

        channel.push("count", "current")
    }, [channel])

    useEffect(() => {
        channel.on("count", (message) => {
            return dispatch({ type: 'set', payload: message.count })
        })
    }, [channel])

    return (
        <section>
            <h1>Welcome to Phoenix with TypeScript and React!</h1>
            <br></br>
            <p>Peace of mind from prototype to production.</p>
            <div>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            <div className="row">Client Side</div>
                            <button id="client" onClick={() => setCount((count) => count + 1)}>
                                Count {count}
                            </button>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div id="server" className="row">Server Side</div>
                            <button onClick={
                                () => {
                                    dispatch({ type: 'add', payload: 1 })
                                }
                            }>
                                Count {serverCount}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};
export default Counter;
