
export default function Tile(props)
{
    const {tileObj} = props

    const imagePaths = [
        "./images/avocado.png", "./images/banana.png", "./images/bread.png", "./images/broccoli.png", "./images/cheesecake.png", "./images/cherry.png",
        "./images/coffee.png", "./images/croissant.png", "./images/cupcake.png", "./images/egg.png", "./images/fries.png", "./images/hamburger.png",
        "./images/ice-cream.png", "./images/nut.png", "./images/pizza.png", "./images/pumpkin.png", "./images/taco.png", "./images/watermelon.png"
    ]

    return (
        <div className="tile" onClick={()=>props.handleClick(tileObj.pos)}>
            {tileObj.isFlipped && <img src={imagePaths[tileObj.num]} alt="" className="tile-img"/>}
        </div>
    )
}