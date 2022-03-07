import React from "react";
import {useDispatch, useSelector} from "../react-redux-hooks";
import {fetchUserInfos} from "../actions/user";
import {fetchUserLessons} from "../actions/user";
import Lesson from "./Lesson";

const LessonComponent = () => {
        const user = useSelector((state) => state.user);
        const state = useSelector((state) => state);
        const lessonsIds = useSelector((state) => state.user.user.lessonsIds)
        const dispatch = useDispatch();

        React.useEffect(() => {
                if (lessonsIds) {
                        let str = lessonsIds.join(',')
                        dispatch(fetchUserLessons(str));
                }
        }, [user.name, dispatch]);

        return (
            <>
                    {console.log('-----------------------------')}
                    {console.log(state)}
                    {console.log('-----------------------------')}
                    {/*<p>{user.name}</p>*/}
                <h1>Lesson Component</h1>
                    <Lesson/>
            </>
        );


}


export default LessonComponent;
