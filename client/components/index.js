/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as UserHome} from './UserHome'
// export {Login, Signup} from './AuthForm' --> commented out when refactoring boilerplate files which implicates user/username
export {Start} from './StartForm'
export {default as Whiteboard} from './Whiteboard'
export {default as Home} from './Home'
export {default as Instructions} from './Instructions'
export {default as GameRoom} from './GameRoom'
export {default as Timer} from './Timer'
