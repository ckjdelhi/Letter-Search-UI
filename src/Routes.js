import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import LetterHead from './letter-head/LetterHead'
import LetterSearch from "./letter-search/LetterSearch";
import RuleSetup from './rules-setup/RuleSetup'
import LetterIntake from './letter-intake/LatterIntake'
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={RuleSetup} />
                    <Route path="/rules-setup" exact component={RuleSetup} />
                    <Route path="/letter-intake" exact component={LetterIntake} />
                    <Route path="/letter-search" exact component={LetterSearch} />
                    <Route path="/letter-head" component={LetterHead} />
                </Switch>
            </Router>
        )
    }
}
