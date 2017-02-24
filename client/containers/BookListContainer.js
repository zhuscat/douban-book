import { connect } from 'react-redux';
import BookList from '../components/BookList';

function mapStateToProps(state, ownProps) {
  const { booklists, entities, tags } = state;
  const { tag } = ownProps.params;
  const { location } = ownProps;
  const { query } = location;
  const sort = query.sort || 'ratingPeople';
  return {
    booklists,
    entities,
    tag,
    tags,
    sort,
    location,
  };
}

export default connect(mapStateToProps)(BookList);
