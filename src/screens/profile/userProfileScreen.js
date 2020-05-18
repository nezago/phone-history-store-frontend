import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import getUserData from '../../actions/getUserData';
import ProfileTab from './Tabs/profileTab';
import StoreTab from './Tabs/storeTab';

const Tab = createBottomTabNavigator();

/**
 * @class
 * @classdesc
 */
class UserProfileScreen extends Component {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount=() => {
    const { myData } = this.props;
    const { token } = myData.userData;
    this.setState({ sessionUser: jwtDecode(token) });
  }

  /**
     * @method
     * @returns {*} UI
     */
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
        />
        <Tab.Screen
          name="Store"
          component={StoreTab}
        />
      </Tab.Navigator>
    );
  }
}

UserProfileScreen.propTypes = {
  myData: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

/**
 *
 * @param {*} state
 * @returns {*} state
 */
const mapStateToProps = (state) => ({
  myData: state.myReducers,
});

export default connect(mapStateToProps, { getUserData })(UserProfileScreen);