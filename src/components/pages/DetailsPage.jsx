import React, { Component } from "react";

class DetailsPage extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                item: {}
            },
            error: false,
            loading: true,
            bought: false
        };
        this.buyProduct = this.buyProduct.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            // Call our fetch function below once the component mounts
            fetch("/api/items/" + this.props.match.params.id)
                .then(res => res.json())
                .then(response => {
                    this.setState({ data: response });
                    this.setState({ loading: false });
                })
                .catch(function(err) {
                    this.setState({ error: true });
                    console.error(err);
                });
        } else {
            this.setState({ error: true });
            this.setState({ loading: false });
        }
    }

    showBuyButtonContent() {
        return this.state.bought ? "Ya es tuyo!" : "Comprar";
    }

    buyProduct() {
        this.setState({ bought: true });
    }

    showContent() {
        const productCondition =
            this.state.data.item.condition === "new" ? "Nuevo" : "Usado";
        if (this.state.loading) {
            return (
                <div className="loading-container">
                    <img
                        className="loading-icon"
                        src={require("../../assets/meli-loading.svg")}
                    />
                </div>
            );
        }
        if (this.state.error) {
            return (
                <p>
                    Error: Producto no encontrado. Por favor, ingrese un
                    producto válido.
                </p>
            );
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-xs-12 col-sm-12">
                        <img
                            className="product-image"
                            src={this.state.data.item.picture}
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 col-xs-12 col-sm-12">
                        <p className="sold-quantity">
                            {productCondition} -{" "}
                            {this.state.data.item.sold_quantity} vendidos
                        </p>
                        <p className="title">{this.state.data.item.title}</p>
                        <p className="price">
                            {new Intl.NumberFormat("es-AR", {
                                style: "currency",
                                currency: this.state.data.item.price.currency,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(this.state.data.item.price.amount)}
                        </p>
                        <button
                            type="button"
                            onClick={this.buyProduct}
                            className={
                                this.state.bought ? "buy-btn bought" : "buy-btn"
                            }
                        >
                            {this.showBuyButtonContent()}
                        </button>
                    </div>
                </div>
                <div className="row col-12">
                    <p className="description-title">
                        Descripción del producto
                    </p>
                    <div className="description">
                        {this.state.data.item.description}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="detailsPage">
                <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12 details-container">
                    {this.showContent()}
                </div>
            </div>
        );
    }
}

export default DetailsPage;
