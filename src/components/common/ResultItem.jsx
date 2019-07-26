import React, { Component } from "react";

class ResultItem extends Component {
    state = {
        item: this.props.item,
        link: ""
    };

    componentDidMount() {
        this.setState({ link: "/items/" + this.props.item.id });
    }

    hasFreeShipping() {
        if (this.state.item.free_shipping) {
            return (
                <i className="nav-icon-shipping">
                    <span>Free Shipping</span>
                </i>
            );
        }
    }

    render() {
        return (
            <a href={this.state.link} className="result-item row">
                <div className="image-container">
                    <img className="item-image" src={this.state.item.picture} />
                </div>
                <div className="info-container row">
                    <div className="price">
                        {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: this.state.item.price.currency,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(this.state.item.price.amount)}
                        {this.hasFreeShipping()}
                    </div>
                    <div className="location">{this.state.item.state_name}</div>
                    <div className="title">{this.state.item.title}</div>
                </div>
            </a>
        );
    }
}

export default ResultItem;
