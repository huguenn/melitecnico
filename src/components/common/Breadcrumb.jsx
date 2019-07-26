import React, { Component } from "react";
import "../../styles/components/_breadcrumb.scss";

class Breadcrumb extends Component {
    state = {};

    render() {
        return (
            <div className="breadcrumb col-lg-10 col-md-10 col-xs-12 col-sm-12">
                <ul>
                    {this.props.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Breadcrumb;
