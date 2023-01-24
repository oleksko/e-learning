import React from 'react';
import photo from "../Carousel/img/java.png";
import photo2 from "../Carousel/img/computer_sienc.png";

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

const Courses = () => {
    return (
        <div className="container text-center mt-5 mb-0">
            <h3>Courses</h3>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-5">

                            <img className="img-fluid" src={items[0].path} style={{
                                width: "540px",
                                height: "320px"
                            }}/>

                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-5">

                            <img className="img-fluid" src={items[1].path} style={{
                                width: "540px",
                                height: "320px"
                            }}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
