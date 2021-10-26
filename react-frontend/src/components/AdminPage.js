import React from "react"

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
            </div>
        );
    }
}

export { AdminPage };