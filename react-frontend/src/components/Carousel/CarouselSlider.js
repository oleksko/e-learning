import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import photo from "./img/jaredd-craig-HH4WBGNyltc-unsplash.jpg"
import photo2 from "./img/mikolaj-DCzpr09cTXY-unsplash.jpg"


const items = [
    {
        id: 1,
        name: 'name 1',
        path: photo
    },
    {
        id: 2,
        name: 'name 2',
        path: photo2
    }
]


const CarouselSlider = () => {

    const settings = {
        indicators: false,
        fade: true,
        infinite: true,
        interval: 3000
    }

    return (
        <div>
            <Carousel {...settings}>
                {items.map(item => {
                    return (
                        <Carousel.Item key={item.id}>
                            <img className="d-block w-100" src={item.path} alt={item.name} style={{
                                width: "1920px", aspectRatio: "auto 1920 / 900",
                                height: "900px"
                            }}/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default CarouselSlider;