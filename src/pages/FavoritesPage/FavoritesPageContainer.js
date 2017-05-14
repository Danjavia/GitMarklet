/**
 * External resources
 * */
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';

// Query
import HomePageQuery from './queries/HomePageQuery';
// Component
import HomePage from './HomePage';

/**
 * PreliminarInfoDataContainer
 * @const {func} PreliminarInfoDataContainer Method for fetching data from server to the component.
 * */
const ActivityRecordContainer = graphql(HomePageQuery, {
  options: (ownProps) => {
    return {
      variables: {
        username: ownProps.username
      }
    }
  }
})(withRouter(HomePage));

export default ActivityRecordContainer;