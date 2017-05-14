/**
 * External Resources
 **/
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import StorageManager from '../../services/StorageManager';

/**
 * Internal Resources
 **/
import App from '../../components/App/App';
import './FavoritesPage.css';

/**
 * Sample class definition
 **/
class FavoritesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      repos: [],
      loading: false
    }
  }

  searchRepos() {

    if (this.refs.gitUser.refs.input.value === '') {
      return;
    }

    this.setState({loading: true});

    // Assign user for get their repos
    const gitUSer = this.refs.gitUser.refs.input.value;

    // prepare data, use data key!
    let query = JSON.stringify({
      query: `query {
        user(login: "${gitUSer}") {
          bio
          url
          company
          email
          avatarUrl
          name
          followers(last: 100) {
            totalCount
          }
          websiteUrl
          starredRepositories(last: 100) {
            totalCount
          }
          repositories(last: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            edges {
              node {
                id
                name
                description
                url
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }`
    });

    // use the github endpoint
    fetch(process.env.REACT_APP_GRAPHQL_GITHUB_ENDPOINT, {
      method: 'POST',
      body: query,
      headers: {
        "Authorization": process.env.REACT_APP_GITHUB_TOKEN
      }
    }).then(response => {
      return response.json()
    }).then(res => {
      console.log(res);
      this.setState({
        user: res.data ? res.data.user : null,
        repos: res.data && res.data.user && res.data.user.repositories ? res.data.user.repositories : [],
        loading: false
      })
    })
  }

  /**
   * logout:
   * Finish user session
   * */
  logout() {
    StorageManager.clear();
    this.props.history.push('/');
  }

  /**
   * render
   * @return {ReactElement} markup
   * */
  render() {
    const avatar = this.state.user && this.state.user.avatarUrl ? this.state.user.avatarUrl : 'https://s-media-cache-ak0.pinimg.com/originals/1c/7f/f6/1c7ff63a835410d8b31bce5f823cd401.jpg';

    if (this.props.data.loading) {
      return (<div className="flex"><h2>Loading your favorites...</h2></div>);
    }

    if (this.props.data.error) {
      return (<div>Upps, sorry the service is unavailable at this moment. Please check later.</div>);
    }

    return (
      <App>
        <div className="favorites-page">
          <div className="favorites-page__hero">
            <div className="favorites-page__search">
              <nav>
                <Link to="/dashboard">Search Repos</Link>
                <Link to="/" onClick={this.logout.bind(this)}>Logout</Link>
              </nav>
              <h1>My Favorites</h1>
              <Input placeholder="Enter repository name" ref="gitUser" />
              <Button onClick={this.searchRepos.bind(this)}>Search Repositories</Button>
            </div>
          </div>

          <div className="favorites-page__results">
            <section className="favorites-page__repos">
              {this.props.data.User.favorites ? this.props.data.User.favorites.map((repo, key) => {
                return (
                  <Card style={{ width: '22.3%', margin: 10 }} bodyStyle={{ padding: 0 }} key={key}>
                    <div className="custom-card">
                      <div className="favorites-page__tags">
                        {repo.primaryLanguage && <Tag color={repo.primaryLanguage.color}>{repo.primaryLanguage.name}</Tag>}
                        <Icon type="heart" />
                      </div>
                      <h3>
                        <a href={repo.url} target="_blank">{repo.name}</a>
                      </h3>
                      <p>{repo.description || 'This repo have not description.'}</p>
                    </div>
                  </Card>
                );
              }) : null}
            </section>
          </div>
        </div>
      </App>
    );
  }
}

export default withRouter(FavoritesPage);
