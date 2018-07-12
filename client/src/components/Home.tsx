import * as React from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import gql from 'graphql-tag';

interface Data {
  data?: {
    getAllUsers: Array<{ id: number; email: string }>;
    loading: boolean;
  };
}

interface User {
  id: number;
  email: string;
}

class Home extends React.Component<ChildDataProps<Data>> {
  public render() {
    const {
      data,
      data: { loading, getAllUsers }
    } = this.props;

    return (
      <div>
        {loading
          ? null
          : getAllUsers.map((user: User) => (
              <h1 key={user.id}>{user.email}</h1>
            ))}
      </div>
    );
  }
}

const getAllUsers = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

export default graphql(getAllUsers)(Home);
