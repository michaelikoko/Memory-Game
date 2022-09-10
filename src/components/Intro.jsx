import cupCake from "../cupcake.png"
import Footer from "./Footer"

export default function Intro(props) {
    return (
        <section className="intro">
            <img src={cupCake} alt="" className="cupcake" />
            <h1 className="intro-heading">Memory Game</h1>
            <p className="intro-text mt-3">
                Match each pair of unique tiles to win the game.
            </p>
            <button
                className="intro-button"
                onClick={() => props.setStartGame(oldValue => !oldValue)}
            >
                Play
            </button>
            <div className="fixed-bottom">
                <Footer />
            </div>
        </section>
    )
}