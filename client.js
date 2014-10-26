if (Meteor.isClient) {
  Template.body.helpers({
    isLoggedIn: function () {
      return Session.get('isLoggedIn');
    },
    isCordova: function () {
      return Meteor.isCordova;
    },
    loginFailed: function () {
      return Session.get('loginFailed');
    }
  });

  Template.userArea.events({
    'click .logout': function () {
      facebookConnectPlugin.logout();
      Session.set('isLoggedIn', false);
    }
  });

  Template.guestArea.events({
    'click .login': function () {
      facebookConnectPlugin.login(["public_profile"], function (response) {
        Session.set('isLoggedIn', true);
      }, function (error) {
        // Login failed, show error message for 4 seconds
        Session.set('loginFailed', error);
        Meteor.setTimeout(function () {
          Session.set('loginFailed', false);
        }, 4000);
      });
    }
  });
}
