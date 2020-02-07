import React, { Component } from 'react';
import MainTabs from "./mainTabs"

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="h1 navbar bg-primary text-white">Noted.</div>
                <MainTabs></MainTabs>
            </React.Fragment>
        );
    }
}

export default Header;