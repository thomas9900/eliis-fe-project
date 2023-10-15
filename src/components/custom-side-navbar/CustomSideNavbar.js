import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Icon from '@mdi/react';
import './CustomSideNavbar.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Empty from './Empty';
import CustomCalendar from '../calendar/CustomCalendar';
import InfoCustomSidebar from '../info-sidebar/InfoCustomSidebar';
import {
  mdiViewDashboard,
  mdiNotebook,
  mdiCalendarMonthOutline,
  mdiMessageBulleted,
  mdiBullhornVariant,
  mdiClockOutline,
  mdiCalendar,
  mdiViewGallery,
  mdiCloudPrint,
  mdiSilverware,
  mdiApplication,
  mdiContacts,
  mdiFileDocumentCheck,
  mdiLifebuoy,
} from '@mdi/js';

const iconPaths = [
  mdiViewDashboard,
  mdiNotebook,
  mdiCalendarMonthOutline,
  mdiMessageBulleted,
  mdiBullhornVariant,
  mdiClockOutline,
  mdiCalendar,
  mdiViewGallery,
  mdiCloudPrint,
  mdiSilverware,
  mdiApplication,
  mdiContacts,
  mdiFileDocumentCheck,
  mdiLifebuoy,
];

const titles = [
  'Dashboard',
  'Diary',
  'Plans',
  'Messages',
  'Announcements',
  'Work schedule',
  'Events',
  'Gallery',
  'Documents',
  'Food menu',
  'Applications',
  'Contacts',
  'Surveys',
  'Help',
];

function CustomSideNavbar() {
  return (
    <>
      <Nav className="flex-column column-navbar mt-2">
        {titles.map((title, index) => (
          <Nav.Link as={NavLink} to={`/${title}`} key={index}>
            <Icon path={iconPaths[index]} size={1} /> {title}
          </Nav.Link>
        ))}
      </Nav>
      <Routes>
        <Route path="/" element={<Navigate to="/Events" />} />
        <Route
          path="/Events"
          element={
            <>
              <InfoCustomSidebar />
              <CustomCalendar />
            </>
          }
        />
        <Route path="/*" element={<Empty />} />
      </Routes>
    </>
  );
}

export default CustomSideNavbar;
