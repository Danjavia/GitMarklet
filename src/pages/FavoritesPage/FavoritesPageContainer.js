/**
 * External resources
 * */
import { withRouter } from 'react-router-dom';
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
const BlackListButtonContainer = graphql(allFavorites, {
  name: 'allFavorites',
  options: (ownProps) => {
    console.log(ownProps, 'porper');
    return {
      variables: {
        id: StorageManager.get('uid')
      }
    }
  },
  props: props => {
    console.log(props, 'props');
    return {
      subscribeToNewFavorites: params => {
        console.log(params, 'params');
        return props.allFavorites.subscribeToMore({
          document: allFavoritesSubscription,
          variables: {
            id: StorageManager.get('uid'),
          },
          updateQuery: (prev, {subscriptionData}) => {
            console.log(prev, subscriptionData, 'susss');
            if (!subscriptionData.data) {
              return prev;
            }
            console.log(subscriptionData);
            const newFeedItem = subscriptionData.data.commentAdded;
            return Object.assign({}, prev, {
              entry: {
                favorites: [newFeedItem, ...prev.entry.comments]
              }
            });
          }
        });
      }
    };
  },
})(withRouter(FavoritesPage));

export default BlackListButtonContainer;

