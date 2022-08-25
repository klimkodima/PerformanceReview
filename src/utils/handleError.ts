import { ErrorResponseType } from 'src/api';

export const handleError = (error: unknown): ErrorResponseType =>
  error as ErrorResponseType;
