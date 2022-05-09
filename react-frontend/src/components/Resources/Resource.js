import React from 'react';

const Resource = (props) => {

    return (
        <div className="col">
            <div className="card">
                <div className="card-body text-center">
                    <h6>{props.name}</h6>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img
                        alt="image"
                        width="250" height="250"
                        style={{marginTop: "20px"}}
                        src={props.url}/>
                </div>
            <br/>
                    <a className="btn btn-dark btn-sm"
                       style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                        href={props.url} download>
                        Download file
                    </a>
            </div>
        </div>
    )

}

export default Resource;