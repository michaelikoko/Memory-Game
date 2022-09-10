import React from "react"
import Tile from "./Tile"
import Confetti from "react-confetti"
import Footer from "./Footer"

export default function Game()
{
    const imagePaths = [
        "./avocado/egg.png", "./images/banana.png", "./images/bread.png", "./images/brocolli.png", "./images/cheesecake.png", "./images/cherry.png",
        "./images/coffee.png", "./images/croissant.png", "./images/cupcake.png", "./images/egg.png", "./images/fries.png", "./images/hamburger.png",
        "./images/ice-cream.png", "./images/nut.png", "./images/pizza.png", "./images/pumpkin.png", "./images/taco.png", "./images/watermelon.png"
    ]

    const [tileObjArray, setTileObjArray] = React.useState(createTileObjArray()) //An array of objects, where each object represents properties of each tile
    const [clickedPairPos, setClickedPairPos] = React.useState([]) //An array that contains the position of the pair of tiles to be compared
    const [winner, setWinner] = React.useState(false) //A boolean state that represents whether the game has been won
    const [time, setTime] = React.useState({seconds: 0, timeString: "00:00:00"}) //The time object used for the timer
    const [isRunning, setIsRunning] = React.useState(false) //A boolean state that represents whether the timer is currently running
    const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("bestTime"))|| {seconds: 0, timeString: "00:00:00"}) //Loads best time from local storage

    function shuffle(array)
    {
        /*Schwartzian transform */
        /*Shuffles an array */
        let unshuffled = array.slice()
        let shuffled = unshuffled
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
        return shuffled
    }

    function createTileObjArray()
    {
        /*Creates the array of object, where each object represents each tile on the grid.
        The num attribute is used to match pairs, it also represents the index of the image of the tile in the imagePath array. 
        The isFlipped attribute the current state of the tile(whether it is flipped).
        The pos attribute shows the index in the array.*/
        const numArray = []
        for (let i = 0; i < imagePaths.length; i++) numArray.push(i)
        const boardNumArray = numArray.concat(numArray)
        const shuffledBoardNumArray = shuffle(boardNumArray)

        let tileObjList = []
        for (let i = 0; i < shuffledBoardNumArray.length; i++)
        {
            tileObjList.push({
                num: shuffledBoardNumArray[i],
                isFlipped: false,
                pos: i
            })
        }
        return tileObjList
    }

    function tileClick(pos)
    {
        /*This function runs when each tile is clicked. First it begins the timer, by setting isRunning to true if it is false.
        Then it checks if the isFlipped attribute of the tile is false. If false, if flips the tile to reveal the image and adds the tile pos (ie pos attribute)
        to the clickedPairPos array. If isFlipped is true it does nothing.*/
        if (!isRunning) setIsRunning(oldValue => !oldValue) 
        if (!tileObjArray[pos].isFlipped)
        {
            setTileObjArray(prevTileObjArray => {
                let newArray = prevTileObjArray.slice()
                let newObj = {...prevTileObjArray[pos], isFlipped: !prevTileObjArray[pos].isFlipped}
                newArray[pos] = newObj
                return newArray
            })
            setClickedPairPos(oldValue => {
                return [...oldValue, pos]
            })
        }
    }

    function checkMatch()
    {
        /*If the clickedPairPos array is two in length, checks the num attributes of the tile objects located in the corresponding positions in the array.
        If both tile objects match, the isFlipped attribute remains true; if they don't match after a 0.8 secs delay, the isFlipped attribute is changed 
        back to false(ie the image in the tile is concealed). In both cases, the clickedPairPos is set back to an empty array.*/
        if (clickedPairPos.length === 2)
        {
            const [pos1, pos2] = clickedPairPos
            if (tileObjArray[pos1].num === tileObjArray[pos2].num)
            {
                setClickedPairPos([])
            }
            else
            {
                setTimeout(()=>{
                    setTileObjArray(prevTileObjArray => {
                        let newArray = prevTileObjArray.slice()
                        let newObjPos1 = {...prevTileObjArray[pos1], isFlipped: !prevTileObjArray[pos1].isFlipped}
                        let newObjPos2 = {...prevTileObjArray[pos2], isFlipped: !prevTileObjArray[pos2].isFlipped}
                        newArray[pos1] = newObjPos1
                        newArray[pos2] = newObjPos2
                        return newArray
                    })
                }, 800)
                setClickedPairPos([])
            }
        }
    }

    function checkWinner()
    {
        /*The function checks if the game has been won. It checks if all the tile objects in the tileObjArray array has the isFlipped attribute set to true.
        It sets the winner state to its appropriate value. If the game has been won, it stops the timer by setting isRunning to false, and it saves the time as bestTime to 
        local storage if the current seconds attribute of the  bestTime object equals zero (ie no bestTime has been saved yet); or if the current seconds attribute of the time 
        object is less than the previously saved secondsattribute of the time object saved as bestTime(this is loaded at the beginning of the game) and the seconds attribute 
        is not equal to zero.*/
        const isWinner = tileObjArray.every(obj => obj.isFlipped)
        setWinner(isWinner)
        if (winner)
        {
            if (bestTime["seconds"] === 0 || (time.seconds < bestTime["seconds"] && time.seconds !== 0)) 
            {
                localStorage.setItem("bestTime", JSON.stringify({"seconds": time.seconds, "timeString": time.timeString}))
                setBestTime({"seconds": time.seconds, "timeString": time.timeString})
            }
            setIsRunning(false)
        }
    }

    function restart()
    {
        /*Resets all the state bindings when the restart button is clicked. It also runs when the play again button is clicked. */
        setTileObjArray(createTileObjArray())
        setTime({seconds: 0, timeString: "00:00:00"})
        setClickedPairPos([])
        setWinner(false)
        setIsRunning(false)
    }

    function convertTimeFormat(seconds)
    {
        /*Takes amount of time in seconds as a parameter and returns a string of the time in the format "00:00:00"(ie hours:mins:secs) */
        let hours = `${Math.floor((seconds/60) / 60)}`
        let mins = `${Math.floor((seconds/60) % 60)}`
        let secs = `${Math.floor(seconds%60)}`

        return `${hours.padStart(2,'0')}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
    }

    React.useEffect(checkMatch, [clickedPairPos, tileObjArray]) //Checks for matching tile when clickedPairPos array changes
    React.useEffect(checkWinner) //Checks for a winner each time state reloads
    React.useEffect(()=>{
        let interval;
        if (isRunning)
        {
            interval = setInterval(() => {
                setTime(prevTime => {
                    return {
                        seconds: prevTime.seconds + 1,
                        timeString: convertTimeFormat(prevTime.seconds)
                }
                })
            }, 1000)
        } 
        else 
        {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning]) //Runs the timer based on the value of isRunning
    

    let tileElements = tileObjArray.map(tileObj => (
        <Tile key = {tileObj.pos} tileObj={tileObj} handleClick={tileClick}/>
    )) //Maps each tile object in the tileObjArray to the Tile component to display on the DOM.

    return (
        <section className="game mt-5">
            {winner && <Confetti />}
            <section className="game-scores">
                <p>Time: <span>{time.timeString}</span></p>
                <p>Best Time: <span>{bestTime.timeString}</span></p>
            </section>

            <section className="game-grid">
                {tileElements}
            </section>

            <button className="game-button" onClick={restart}>
                {winner ? "Play again" : "Restart"}
            </button>

            <div className="fixed-bottom">
                <Footer />
            </div>
        </section>
    )
}