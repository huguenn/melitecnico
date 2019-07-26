import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

class HeaderAppBar extends Component {
    constructor() {
        super();
        const queryParam = queryString.parse(location.search);
        this.state = {
            searchValue: queryParam.search || ""
        };
        this.updateInput = this.updateInput.bind(this);
    }

    _handleKeyPress = e => {
        if (e.key === "Enter") {
            document.getElementById("nav-search-btn").click();
        }
    };

    handleFocus = e => {
        event.target.select();
    };

    renderSearchButton = () => {
        const urlToSearch =
            "/items?search=" + encodeURIComponent(this.state.searchValue);
        return (
            <Link to={urlToSearch} onClick={() => history.push(urlToSearch)}>
                <button
                    id="nav-search-btn"
                    type="submit"
                    className="nav-search-btn"
                    tabIndex={3}
                >
                    <i className="nav-icon-search">
                        <span>Buscar</span>
                    </i>
                </button>
            </Link>
        );
    };

    updateInput(event) {
        this.setState({ searchValue: event.target.value });
    }

    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <div className="nav-bounds col-lg-10 col-md-10 col-xs-12 col-sm-12">
                        <a className="nav-logo col-1" href="/" tabIndex={1} />
                        <div className="nav-search col-11">
                            <input
                                type="text"
                                className="nav-search-input"
                                name="as_word"
                                placeholder="Nunca dejes de buscar"
                                maxLength={120}
                                autoCapitalize="off"
                                autoCorrect="off"
                                onChange={this.updateInput}
                                onKeyPress={this._handleKeyPress}
                                onFocus={this.handleFocus}
                                spellCheck="false"
                                tabIndex={2}
                                autoComplete="off"
                                value={this.state.searchValue}
                            />
                            {this.renderSearchButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderAppBar;
