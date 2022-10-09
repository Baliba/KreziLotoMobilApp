export class AppResponse<T> {
  public crash: boolean | undefined;
  public message: String | undefined;
  public data: T | undefined;
  public AppResponse(crash: boolean, data: T, message: String) {
    this.crash = crash;
    this.message = message;
    this.data = data;
  }
}
