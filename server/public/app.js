import React from 'react';
import { render } from 'react-dom';

class ReactRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    
    // componentDidMount() {
    //     fetch('http://localhost/issue-tracker/issues')
    //         .then(response => response.json())
    //         .then(responseData => {
    //             this.setState({ data: responseData });
    //         })
    // }

    render() {
        console.log();
        return(
            <div>
                <h1>Hello React</h1>
            </div>
        );
    }
}

render(
    <ReactRender />,
    document.getElementById('app')
);