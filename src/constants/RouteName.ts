const NavbarRouteName = {
  HOME: '/',
  ABOUT: '/about'
} as const

const RouteName = {
  ...NavbarRouteName
} as const

export { NavbarRouteName, RouteName }
