export class CustomBackendResponse {
  success: boolean;
  data: any;
  errors: any[];
  constructor(success: boolean, data: any, errors: any[] = []) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
}
