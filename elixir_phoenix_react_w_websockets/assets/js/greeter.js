import React from "react";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useChannel from './useChannel';

const Greeter = () => {
    const [count, setCount] = useState(0)

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
                            <button onClick={() => setCount((count) => count + 1)}>
                                Count {count}
                            </button>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="row">Server Side</div>
                            <button onClick={() => setCount((count) => count + 1)}>
                                Count {count}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Greeter;
