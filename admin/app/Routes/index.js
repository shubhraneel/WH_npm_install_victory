/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import StudentsDataPage from 'containers/StudentsDataPage/Loadable';
import SingleStudentPage from 'containers/SingleStudentPage/Loadable';
import SocietyPage from 'containers/SocietyPage/Loadable';
import SocietyDetailsPage from 'containers/SocietyDetailsPage/Loadable';
import HallsPage from 'containers/HallsPage/Loadable';
import HallDetailsPage from 'containers/HallDetailsPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DepartmentsPage from 'containers/DepartmentsPage/Loadable';
import SocietyOfficialPage from 'containers/SocietyOfficialPage/Loadable';
import CreateSocietyEventPage from 'containers/CreateSocietyEventPage/Loadable';
import AddSocietyGallery from 'containers/AddSocietyGallery/Loadable';
import AddSocietyOfficialPage from 'containers/AddSocietyOfficialPage/Loadable';
import AddBillReimbursementPage from 'containers/AddBillReimbursementPage/Loadable';
import BillReimbursementsPage from 'containers/BillReimbursementsPage/Loadable';

function Routes(props) {
  if (!props.AuthData.isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/*" render={() => <Redirect to="/login" />} />
      </Switch>
    );
  }

  if (
    props.AuthData.isLoggedIn &&
    props.AuthData.credentials.role === 'societyOfficial'
  ) {
    return (
      <Switch>
        <Route exact path="/home" component={SocietyOfficialPage} />
        <Route exact path="/create-event" component={CreateSocietyEventPage} />
        <Route exact path="/add-images" component={AddSocietyGallery} />
        <Route exact path="/add-official" component={AddSocietyOfficialPage} />
        <Route
          exact
          path="/add-bill-reimbursement"
          component={AddBillReimbursementPage}
        />
        <Route exact path="/login" render={() => <Redirect to="/home" />} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/students-data" component={StudentsDataPage} />
      <Route exact path="/students-data/:id" component={SingleStudentPage} />
      <Route exact path="/societies" component={SocietyPage} />
      <Route exact path="/halls" component={HallsPage} />
      <Route exact path="/departments" component={DepartmentsPage} />
      <Route exact path="/societies/:id" component={SocietyDetailsPage} />
      <Route exact path="/halls/:id" component={HallDetailsPage} />
      <Route
        exact
        path="/bill-reimbursements"
        component={BillReimbursementsPage}
      />
      <Route exact path="/login" render={() => <Redirect to="/home" />} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
