import React from "react";
import {useSelector} from "../react-redux-hooks";

const LessonComponent = () => {
        const user = useSelector()
        return (
            <>
                <h1>Lesson Component</h1>
            </>
        );


}


export default LessonComponent;
