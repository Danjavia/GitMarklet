/**
 * External resources
 * */
import { graphql } from 'react-apollo';
import StorageManager from '../../services/StorageManager';

// Query
import {
  allFavoritesSubscription,
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
  }),
  props: props => {
    console.log(props, 'props');
    return {
      subscribeToNewFavorites: params => {
        console.log(params, 'paramsss', allFavoritesSubscription, props);
        return props.allFavorites.subscribeToMore({
          document: allFavoritesSubscription,
          variables: {
            id: params.id,
          },
          updateQuery: (prev, {subscriptionData}) => {
            console.log(prev, subscriptionData, 'susss');
            if (!subscriptionData.data) {
              return prev;
            }
            console.log(subscriptionData, 'suscriber');
            const newFeedItem = subscriptionData.data.commentAdded;
            return Object.assign({}, prev, {
              entry: {
                allFavorites: [newFeedItem, ...prev.entry.comments]
              }
            });
          }
        });
      }
    };
  },
})(FavoritesPage);

export default FavoritePageContainer;

