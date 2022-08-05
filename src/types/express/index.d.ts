import { Request } from "express"

declare module 'express-serve-static-core' {
    export interface Request {
      user?: any;
      refreshToken?: string;
      files?: any;
    }
    export interface Response {
      stack?: any;
      err?: any;
    }
  }
  