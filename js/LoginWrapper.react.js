/*
 *  Copyright (c) 2015, Parse, LLC. All rights reserved.
 *
 *  You are hereby granted a non-exclusive, worldwide, royalty-free license to
 *  use, copy, modify, and distribute this software in source code or binary
 *  form for use in connection with the web services and APIs provided by Parse.
 *
 *  As with any software that integrates with the Parse platform, your use of
 *  this software is subject to the Parse Terms of Service
 *  [https://www.parse.com/about/terms]. This copyright notice shall be
 *  included in all copies or substantial portions of the software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 *
 */

var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AppWrapper = require('./AppWrapper.react.js');
var AppBar = require('material-ui/lib/app-bar');


var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');


var LoginWrapper = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {
    return {
      error: null,
      signup: false
    };
  },

  observe: function() {
    return {
      user: ParseReact.currentUser
    };
  },

  render: function() {
    //If the User is logged in
    if (this.data.user) {
      return (
        <div>
          <AppBar
            title="Home"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <AppWrapper />
        </div>
      );
    }
    //The login Screen
    return (
      <div>
        <h1>AnyBudget</h1>
        <h2>Powered by Parse + React</h2>
        <div className='loginForm' onKeyDown={this.keyDown}>

          <div class="mb1">
            <a href="#!" className="btn btn-primary" onClick={this.submit}>  {'Login With Facebook'}</a>
          </div>

          <div className='row centered'>

          </div>
        </div>
      </div>
    );
  },

  submit: function() {
    Parse.FacebookUtils.init();

    var self = this;


  Parse.FacebookUtils.logIn("user_likes,email", {
    success: function(user) {
      console.log(user);
      FB.api('/me?fields=name,email', function(me) { console.log(me) });

      // FB.api('/me', function(responce) {
      //     console.log('Your name is ' + response);
      // });
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User: logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });


  },

  logOut: function() {
    Parse.User.logOut();
  },

  keyDown: function(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  },

  toggleSignup: function() {
    this.setState({
      signup: !this.state.signup
    });
  }

});

module.exports = LoginWrapper;
