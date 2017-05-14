/**
 * External resources
 * */
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import StorageManager from '../../services/StorageManager';

// Query
import FavoritesPageQuery from './queries/FavoritesPageQuery';

// Component
// import BlackListButton from './mutations/BlackListButton';
import FavoritesPage from './FavoritesPage';

/**
 * BlackListButtonContainer
 * @const {func} BlackListButtonContainer Method for fetching data from server to the component.
 * */
const BlackListButtonContainer = graphql(FavoritesPageQuery, {
  options: (ownProps) => {
    console.log(ownProps);
    return {
      variables: {
        id: StorageManager.get('uid')
      }
    }
  }
})(withRouter(FavoritesPage));

export default BlackListButtonContainer;

