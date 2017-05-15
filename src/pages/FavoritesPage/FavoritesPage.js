/**
 * External Resources
 **/
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import StorageManager from '../../services/StorageManager';
import {allFavorites} from './queries/FavoritesPageQuery';

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

  /**
   * componentWillMount
   * Self descriptive
   * */
  componentWillMount() {
    if (!StorageManager.get('access_token')) {
      this.props.history.push('/login');
    }

    this.props.subscribeToNewFavorites({
      id: StorageManager.get('uid'),
    });
  }

  /**
   * searchRepos
   * Search github repos via graphql api
   * */
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
      this.setState({
        user: res.data ? res.data.user : null,
        repos: res.data && res.data.user && res.data.user.repositories ? res.data.user.repositories : [],
        loading: false
      })
    })
  }

  /**
   * removeFromFavorites
   * Self descriptive
   * */
  removeFromFavorites(id) {
    const {mutate} = this.props;
    const variables = {
      id
    };

    mutate({
      variables,
      refetchQueries: [{
        query: allFavorites,
        variables: {id: StorageManager.get('uid')}
      }]
    }).then(({data}) => {
      console.log(data);
      notification['success']({
        message: 'Repo removed.',
        description: 'The repo has been removed from your favorites.',
      });
    }).catch((err) => {
      console.log(err);
      notification['error']({
        message: 'Upps, something happen.',
        description: 'The repo cannot be removed from your favorites.',
      });
    });
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

    console.log(this);

    if (this.props.allFavorites.loading) {
      return (<div className="flex"><h2>Loading your favorites...</h2></div>);
    }

    if (this.props.allFavorites.error) {
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
              <h1 style={{textAlign: 'center'}}>My Favorite Repositories</h1>
            </div>
          </div>

          <div className="favorites-page__results">
            <section className="favorites-page__repos">
              {this.props.allFavorites.User.favorites.length > 0 ? this.props.allFavorites.User.favorites.map((repo, key) => {
                return (
                  <Card style={{ width: '22.3%', margin: 10 }} bodyStyle={{ padding: 0 }} key={key}>
                    <div className="custom-card">
                      <div className="favorites-page__tags">
                        {repo.primaryLanguage && <Tag color={repo.primaryLanguage.color}>{repo.primaryLanguage.name}</Tag>}
                        <Icon
                          type="heart"
                          onClick={this.removeFromFavorites.bind(this, repo.id)}
                        />
                      </div>
                      <h3>
                        <a href={repo.url} target="_blank">{repo.name}</a>
                      </h3>
                      <p>{repo.description || 'This repo have not description.'}</p>
                    </div>
                  </Card>
                );
              }) : <div className="flex">
                <h2>No repositories yet, search and select one clicking on search repos button.</h2>
              </div>}
            </section>
          </div>
        </div>
      </App>
    );
  }
}

export default withRouter(FavoritesPage);
