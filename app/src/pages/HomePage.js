import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

// import store from 'data';
// import { addCharacter } from 'data/actions';

import {
  Button,
  // ButtonGroup,
  Input,
  Form,
  // Link,
  Layout,
  Panel,
} from 'components';

import userApi from 'apis/userApi';
import eventClient from 'services/eventClient';

import NewsPanel from 'panels/NewsPanel';

/**
 * empty log in page
 */
class UnloggedHomePage extends PureComponent {
  /** @default */
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      formState: {},
    };
  };
  /** @default */
  render() {
    return (
      <Layout className='tg-home tg-page'>
        <Panel>
          <h2>Home Page</h2>
          <h3>Joining CatQuest? Tell me your name!</h3>
          <Panel inner className='bg-green'>
            <Form
              onSubmit={this.handleFormSubmit}
            >
              <Input
                name='username'
                placeholder='username'
              />
              <Button>Join</Button>
            </Form>
          </Panel>
        </Panel>

        <NewsPanel />
      </Layout>
    );
  };
  /**
   * tell the server we've signed up
   */
  handleFormSubmit(formState) {
    // do nothing if username is empty
    if (!formState.username || formState.username.length <= 0) return;

    // wait for server to tell us we joined, and once it's confirmed we can update our user data
    eventClient.socket.once('joined', (data) => {
      const joinedUsername = data.messages[0].username;
      if (joinedUsername === formState.username) { // matching username
        userApi.createUser(formState);
      };
    });

    // tell server we joined
    eventClient.emit('join', formState);

    // TESTING
    userApi.createUser(formState);
  };
};
/**
 * primary home page
 */
class HomePage extends PureComponent {
  /** @default */
  render() {
    const { user: { userId, username } } = this.props;

    // different page for not being logged in
    const isLoggedIn = Boolean(userId);
    if (!isLoggedIn) {
      return <UnloggedHomePage />
    };

    return (
      <Layout className='tg-home tg-page'>
        <Panel>
          <h2>Home Page</h2>
          <h3>{`Welcome to Together Quest, ${username}!`}</h3>

          <Panel inner className='bg-blue'>
            <span>Take a look at your characters tab</span>
          </Panel>

        </Panel>

        <NewsPanel />
      </Layout>
    );
  };
};
// redux mappings
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({

});

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default ConnectedHomePage;
