import * as React from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import gql from 'graphql-tag';

interface QueryData {
  data?: {
    getAllUsers: Array<{ id: number; email: string }>;
    loading: boolean;
  };
}

interface User {
  id: number;
  email: string;
}

class Home extends React.Component<ChildDataProps<QueryData>> {
  public render() {
    const {
      data,
      data: { loading, getAllUsers }
    } = this.props;

    return (
      <>
        {loading
          ? null
          : getAllUsers.map((user: User) => (
              <h1 key={user.id}>{user.email}</h1>
            ))}
      </>
    );
  }
}

const getAllUsersQuery = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

export default graphql(getAllUsersQuery)(Home);
