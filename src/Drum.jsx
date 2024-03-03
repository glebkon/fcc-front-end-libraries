import React from "react";

function Drum({ audioClip, onClick }) {
  const keyTrigger = audioClip.keyTrigger;
  return (
    <button className="drum-pad" id={`drum-${keyTrigger}`} onClick={onClick}>
      <audio src={audioClip.url} className="clip" id={keyTrigger} />
      {keyTrigger}
    </button>
  );
}

export default Drum;
