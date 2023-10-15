const NavbarOptions = [
  {
    title: 'Home',
    link: '/',
    isProtected: false,
  },
  {
    title: "Achievements' Page",
    link: '/achievements',
    isProtected: true,
  },
  {
    title: 'Events Page',
    link: '/events-page',
  },
  {
    title: 'Society Point',
    link: '/society-point',
    isProtected: true,
  },
  {
    title: "Students' Point",
    link: '/students-point',
  },
  {
    title: 'News Bulletin',
    link: '/news-bulletin',
    isProtected: true,
  },
  {
    title: 'Quick Info',
    link: '/quick-info',
    isProtected: true,
  },
  {
    title: 'Fundae Finder',
    link: '/fundae-finder',
    isProtected: true,
  },
  {
    title: 'Others',
    isProtected: true,
    isDropdown: true,
  },
];

export default NavbarOptions;
