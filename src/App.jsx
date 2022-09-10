import React from "react"
import Intro from "./components/Intro"
import Game from "./components/Game"

export default function App()
{
    const [startGame, setStartGame] = React.useState(false) //If false renders the Intro page, else renders the main game page

    return (
        <main >
            {
                startGame ?
                <Game /> :
                <Intro setStartGame={setStartGame} />
            }
        </main>
    )
}