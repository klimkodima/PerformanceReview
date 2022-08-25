export type ResponseFCType = (request: any) => Promise<any>;
export type ResponseUpdateFCType = (id: number, request: any) => Promise<any>;
export type ResponseDeleteFCType = (param: string) => Promise<any>;

export type ErrorResponseType = {
  message: { errorMessage: string } | { errorMessage: string }[];
};
