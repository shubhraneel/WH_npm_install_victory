import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import AchievementsPage from 'containers/AchievementsPage/Loadable';
import SingleAchievementPage from 'containers/SingleAchievementPage/Loadable';
import FeedbackPage from 'containers/FeedbackPage/Loadable';
import QuickInfoPage from 'containers/QuickInfoPage/Loadable';
import QuickLinksPage from 'containers/QuickLinksPage/Loadable';
import HallsPage from 'containers/HallsPage/Loadable';
import TsgContactsPage from 'containers/TsgContactsPage/Loadable';
import SocietyDetailsPage from 'containers/SocietyDetailsPage/Loadable';
import FacultyContactsPage from 'containers/FacultyContactsPage/Loadable';
import StudentsPointPage from 'containers/StudentsPointPage/Loadable';
import EventsCategoryPage from 'containers/EventsCategoryPage/Loadable';
import EventsPage from 'containers/EventsPage/Loadable';
import EventIndividualPage from 'containers/EventIndividualPage/Loadable';
import NewsBulletinPage from 'containers/NewsBulletinPage/Loadable';
import SocietyPointPage from 'containers/SocietyPointPage/Loadable';
import FundaeFinderPage from 'containers/FundaeFinderPage/Loadable';
import NotificationsPage from 'containers/NotificationsPage/Loadable';
import FundaeFinderRequestsPage from 'containers/FundaeFinderRequestsPage/Loadable';
import CalendarPage from 'containers/CalendarPage/Loadable';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/achievements" component={AchievementsPage} />
      <Route exact path="/achievements/:id" component={SingleAchievementPage} />
      <Route exact path="/events-page" component={EventsPage} />
      <Route
        exact
        path="/events-page/:category"
        component={EventsCategoryPage}
      />
      <Route exact path="/events/event/:slug" component={EventIndividualPage} />
      <Route exact path="/feedback" component={FeedbackPage} />
      <Route exact path="/quick-info" component={QuickInfoPage} />
      <Route exact path="/quick-links" component={QuickLinksPage} />
      <Route exact path="/halls" component={HallsPage} />
      <Route exact path="/contacts" component={TsgContactsPage} />
      <Route exact path="/society-details" component={SocietyDetailsPage} />
      <Route exact path="/faculty-contacts" component={FacultyContactsPage} />
      <Route exact path="/news-bulletin" component={NewsBulletinPage} />
      <Route exact path="/society-point" component={SocietyPointPage} />
      <Route exact path="/fundae-finder" component={FundaeFinderPage} />
      <Route
        exact
        path="/fundae-finder/requests"
        component={FundaeFinderRequestsPage}
      />
      <Route exact path="/profile" component={RegisterPage} />
      <Route exact path="/calendar" component={CalendarPage} />
      <Route path="/students-point" component={StudentsPointPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
