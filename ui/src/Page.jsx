/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import SignInNavItem from './SignInNavItem.jsx';
import Search from './Search.jsx';
import UserContext from './UserContext.js';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';

function NavBar({ user, onUserChange }) {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>Issue List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>Report</NavItem>
        </LinkContainer>
      </Nav>
      <Col sm={5}>
        <Navbar.Form>
          <Search />
        </Navbar.Form>
      </Col>
      <Nav pullRight>
        <IssueAddNavItem user={user} />
        <SignInNavItem user={user} onUserChange={onUserChange} />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="asterisk" />}
          noCaret
        >
          <LinkContainer to="/about">
            <MenuItem>About</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        <a href="https://github.com/PhanNhatTanPK/WebReact">
          GitHub
        </a>
        {' '}
        <a href="https://www.youtube.com/channel/UC_GMoX1v_9YCIRS05n5bQyw">
          Youtube
        </a>
        {' '}
        <a href="/about">
          About
        </a>
      </p>
      <p className="text-center">
        Designed and developed based on love and a passion for advancing React,
        helping it become popular worldwide by
        {' '}
        <a href="https://www.facebook.com/profile.php?id=100009148125275">@PNT</a>
        {' '}
        and
        {' '}
        <a href="https://www.facebook.com/vuhoangngoc.minh">@VHNM</a>
        .
        <br />
        Maintained and repaired by
        {' '}
        <a href="https://www.facebook.com/profile.php?id=100009148125275">@PNT</a>
        {' '}
        with support from
        {' '}
        <a href="https://www.facebook.com/vuhoangngoc.minh">@VHNM</a>
        .
        Code version v1.0.
      </p>
    </small>
  );
}

export default class Page extends React.Component {
  static async fetchData(cookie) {
    const query = `query { user {
      signedIn givenName
    }}`;
    const data = await graphQLFetch(query, null, null, cookie);
    return data;
  }

  constructor(props) {
    super(props);
    const user = store.userData ? store.userData.user : null;
    delete store.userData;
    this.state = { user };

    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData();
      this.setState({ user: data.user });
    }
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user == null) return null;

    return (
      <div>
        <NavBar user={user} onUserChange={this.onUserChange} />
        <Grid fluid>
          <UserContext.Provider value={user}>
            <Contents />
          </UserContext.Provider>
        </Grid>
        <Footer />