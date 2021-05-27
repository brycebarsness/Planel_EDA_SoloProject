import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>What is Planel?</h2>

        <p>
          Most concrete foundations are made by assembling large aluminum form
          panels. Calculating how many are needed for a job, and keeping track
          of how many are in the yard, are two challenges any company using this
          build method will face. Planel is an application that provides a means
          of documenting and sharing how many panels will be needed for a job,
          as well as tracking how many are in use.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
