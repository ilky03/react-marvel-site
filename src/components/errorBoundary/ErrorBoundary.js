import { Component } from "react";

class ErrorBoundary extends Component {
    
    state = {
        error: false
    }

    componentDidCatch(error) {
        this.setState({error: true});
    }

    render () {
        return (
            <>
                {
                this.state.error 
                    ? <h3>Sorry, something went wrong...</h3> 
                    : this.props.children
                }
            </>
        )
    }
}

export default ErrorBoundary;