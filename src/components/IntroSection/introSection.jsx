// import React from 'react';
import { ports } from '../../data.js';
import Learning from '../Learning.jsx';

// const e = React.createElement;

export default function IntroSection() {
  return (
    <>
      <h1 className="centered">Hello react</h1>
      <section>
        <h3
          className="centered"
          style={{ color: 'blue', backgroundColor: '#ccc' }}
        >
          Start list
        </h3>
        <ul>
          {ports.map((item) => (
            <Learning key={item.title} {...item} />
          ))}
        </ul>
        {/* </section> */}
        <p className="centered">Intro Section</p>
      </section>
    </>
  );
}
