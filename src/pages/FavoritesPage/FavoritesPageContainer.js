/**
 * External resources
 * */
import { graphql } from 'react-apollo';
import StorageManager from '../../services/StorageManager';

// Query
import {
  allFavorites
} from './queries/FavoritesPageQuery';

// Component
// import BlackListButton from './mutations/BlackListButton';
import FavoritesPage from './mutations/FavoritesPage';

/**
 * BlackListButtonContainer
 * @const {func} BlackListButtonContainer Method for fetching data from server to the component.
 * */
const FavoritePageContainer = graphql(allFavorites, {
  name: 'allFavorites',
  options: params => ({
    variables: {
      id: StorageManager.get('uid')
    },
  })
})(FavoritesPage);

export default FavoritePageContainer;

