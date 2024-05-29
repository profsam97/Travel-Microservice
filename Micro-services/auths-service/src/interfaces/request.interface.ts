
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: any; // Define the type of the user property
  }
}
