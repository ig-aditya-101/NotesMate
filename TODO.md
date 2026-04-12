# Phase 5: Desktop Responsiveness & Browse Page

## Task 1 — Wire Navbar (Routes + Active State)
- [ ] Add `route` property to each navbarItem in `Navbar.jsx`
- [ ] Import `useNavigate` and `useLocation` from `react-router-dom`
- [ ] Add `onClick={() => navigate(item.route)}` to each item div
- [ ] Apply active color when `location.pathname === item.route`
- [ ] Add `key={item.label}` to each mapped item

## Task 2 — Side Navbar on Desktop
- [ ] Add `md:hidden` to existing bottom bar in `Navbar.jsx`
- [ ] Add new vertical sidebar with `hidden md:flex fixed left-0 top-0 h-full w-56`
- [ ] Sidebar shows icon + label vertically for each nav item with same click/active logic

## Task 3 — Responsive Layout Wrapper
- [ ] In `App.jsx`, add `md:ml-56` to main content wrapper so content clears sidebar
- [ ] Allow content to fill full width on desktop

## Task 4 — Browse Page Real API
- [ ] Replace `mockNotes` with `useState([])` + `useEffect` fetching from `/notes`
- [ ] Wire Login button to `navigate('/login')`
- [ ] Wire Sign Up button to `navigate('/register')`
- [ ] Wire SearchBar to filter notes by title

## Task 5 — Double Grid on Desktop
- [ ] In `Dashboard.jsx`: change notes container to `grid grid-cols-1 md:grid-cols-2 gap-3`
- [ ] In `BrowsePage.jsx`: same grid change

## Order: Task 1 → Task 5 → Task 2 → Task 3 → Task 4
