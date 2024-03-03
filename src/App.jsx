import "./App.css";
import audioClips from "./audioClips.js";
import Drum from "./Drum.jsx";

function App() {
  function playAudio(clip) {
    if (!clip) return;

    document.getElementById(clip.keyTrigger).play().catch(console.error);
    document.getElementById(`drum-${clip.keyTrigger}`).focus();
    document.getElementById("display").innerText = clip.description;
  }

  return (
    <div
      className="container"
      id="drum-machine"
      onKeyDown={(e) =>
        playAudio(
          audioClips.find((clip) => clip.keyTrigger === e.key.toUpperCase())
        )
      }
    >
      <h1>Drum Machine</h1>
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum
            audioClip={clip}
            key={clip.keyTrigger}
            onClick={() => playAudio(clip)}
          />
        ))}
      </div>
      <div id="display"></div>
    </div>
  );
}

export default App;

