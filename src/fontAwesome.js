// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
import {
  faStar as faStarRegular,
  faCircle as faCircleRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStar,
  faCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faStarRegular, faCircle, faCircleRegular, faCheckCircle);
