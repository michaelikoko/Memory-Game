import avocado from "../images/avocado.png"
import banana from "../images/banana.png"
import bread from "../images/bread.png"
import broccoli from "../images/broccoli.png"
import cheesecake from "../images/cheesecake.png"
import cherry from "../images/cherry.png"
import coffee from "../images/coffee.png"
import croissant from "../images/croissant.png"
import cupcake from "../images/cupcake.png"
import egg from "../images/egg.png"
import fries from "../images/fries.png"
import hamburger from "../images/hamburger.png"
import iceCream from "../images/ice-cream.png"
import nut from "../images/nut.png"
import pizza from "../images/pizza.png"
import pumpkin from "../images/pumpkin.png"
import taco from "../images/taco.png"
import watermelon from "../images/watermelon.png"

export default function Tile(props)
{
    const {tileObj} = props

    const imagePaths = [
        avocado, banana, bread, broccoli, cheesecake, cherry, 
        coffee, croissant, cupcake, egg, fries, hamburger, 
        iceCream, nut, pizza, pumpkin, taco, watermelon
    ]

    return (
        <div className="tile" onClick={()=>props.handleClick(tileObj.pos)}>
            {tileObj.isFlipped && <img src={imagePaths[tileObj.num]} alt="" className="tile-img"/>}
        </div>
    )
}