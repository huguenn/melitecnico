import React, { Component } from "react";
import ResultItem from "../common/ResultItem.jsx";
import Breadcrumb from "../common/Breadcrumb.jsx";
import queryString from "query-string";

class ResultsPage extends Component {
    state = {
        data: {
            items: []
        },
        error: false,
        loading: true
    };

    componentDidMount() {
        const queryParam = queryString.parse(this.props.location.search);
        if (queryParam.search) {
            // Call our fetch function below once the component mounts
            fetch("/api/items?search=" + queryParam.search)
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

    showContent() {
        const { length: count } = this.state.data.items;
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
            return <p>Realice una búsqueda por favor.</p>;
        }
        if (count === 0 && !this.state.loading) {
            return (
                <p>
                    No se encontraron resultados, por favor intente nuevamente.
                </p>
            );
        }
        return this.state.data.items.map(item => (
            <ResultItem key={item.id} item={item} />
        ));
    }

    showBreadcrumb() {
        if (this.state.data.categories && this.state.data.categories.length) {
            return <Breadcrumb items={this.state.data.categories} />;
        }
    }

    render() {
        return (
            <div>
                {this.showBreadcrumb()}
                <div id="resultsPage">
                    <div className="col-lg-10 col-md-10 col-xs-12 col-sm-12 results-container">
                        {this.showContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultsPage;
