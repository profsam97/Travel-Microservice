// custom-request.interface.ts

import { Request } from 'express';

// Extend the Request interface to include the user property
declare module 'express' {
  interface Request {
    user: any; // Define the type of the user property
  }
}
