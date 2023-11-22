import React, {useState} from "react";

export default function Startup(props) {

    const {onCreateButton, originalSize, originalDificulty} = props;

    const [size, setSize] = useState(originalSize);
    const [difficulty, setDifficulty] = useState(originalDificulty)

    const sizes = [
        { value: 6, label: 'Small' },
        { value: 9, label: 'Medium' },
        { value: 12, label: 'Large' }
    ]

    const difficulties = [
        { value: 1, label: 'Relax' },
        { value: 2, label: 'Work a bit' },
        { value: 3, label: 'Stressful' },
        { value: 4, label: 'Impossible' }
    ]

    const handleSizeChange = (event) => {
        console.log("size is now" + event.target.value)
        setSize(event.target.value);
    }

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onCreateButton(size,difficulty);
    }

    const handleFormReset = (event) => {
        setSize(originalSize)
        setDifficulty(originalDificulty)
    }

 
    return (
    <>
      <form className="startup" onSubmit={handleFormSubmit} >
        <label type="text">NEW GAME</label>
        <div>&nbsp;</div> 
        <label type="text">Size</label>
        <select value={size} onChange={handleSizeChange}>
          {sizes.map(aSize => <option key={aSize.value} value={aSize.value}>{aSize.label}</option>)}
        </select> 
        <div>&nbsp;</div> 
        <label type="text">Difficulty</label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          {difficulties.map(aDifficulty => <option key={aDifficulty.value} value={aDifficulty.value}>{aDifficulty.label}</option>)}
        </select> 
        <div>&nbsp;</div> 
       
        <div className="inputButtonsBar">
          <button className="inputButton" type="button" onClick={() => handleFormReset()}>reset</button>
          <button className="inputButton" type="submit" value="Submit">start</button>
        </div>
      </form>
       
    </>
    )
}