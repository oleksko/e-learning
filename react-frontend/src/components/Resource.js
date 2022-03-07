import React from 'react';

const Resource = (props) => {

    return (
        <>
            <div>
                {props.name}<br/>
                <img src={props.url} alt="image"/>
            </div>
        </>
    )

}

export default Resource;